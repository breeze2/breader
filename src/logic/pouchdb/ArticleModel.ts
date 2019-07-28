import AsyncTaskThrottle from 'async-task-throttle'
import FeedParser from 'feedparser'
import { IArticle } from '../../schemas/'
import BaseModel from './BaseModel'

export default class ArticleModel extends BaseModel<IArticle> {
    public throttleReadArticle: (id: string) => Promise<boolean>
    public constructor() {
        super('articles', [
            {index: {
                fields: ['feedId'], name: 'feedId',
            }},
            {index: {
                fields: ['time'], name: 'time',
            }},
        ])
        this.throttleReadArticle = AsyncTaskThrottle.create(this.singleReadArticle)
    }
    public makeArticleBaseOnItem(item: FeedParser.Item, feedId: string = '') {
        const article: IArticle = {
            _id: item.guid,
            _rev: '',
            author: item.author,
            categories: item.categories,
            comments: item.comments,
            createTime: Date.now(),
            deleteTime: 0,
            description: item.description,
            enclosures: item.enclosures,
            feedId,
            image: item.image.url,
            isStarred: false,
            isUnread: true,
            link: item.link,
            originLink: item.origlink,
            publishTime: item.pubdate ? item.pubdate.getTime() : Date.now(),
            summary: item.summary.substr(0, 96),
            time: item.date ? item.date.getTime() : Date.now(),
            title: item.title,
        }
        return article
    }
    public async batchInsertArticles(articles: IArticle[]) {
        const keys = articles.map(article => article._id)
        const { rows } = await this.all({keys})
        let changes = 0
        rows.forEach((row, i) => {
            if (!('error' in row)) {
                articles[i]._rev = row.value.rev
            } else {
                changes ++
            }
        })
        await this.batchPost(articles)
        return changes
    }
    public async batchReadArticles(ids: string[]) {
        const list: Array<Promise<boolean>> = []
        ids.forEach(id => {
            list.push(this.throttleReadArticle(id))
        })
        const results = await Promise.all(list)
        let sum = 0
        results.forEach(el => sum += el ? 1 : 0)
        return sum
    }
    public singleReadArticle = async (id: string) => {
        try {
            const result = await this.readArticle(id)
            return result && result.ok ? true : false
        } catch {
            return false
        }
    }
    public readArticle = async (id: string) => {
        const article = await this.get(id)
        if (article.isUnread !== false) {
            article.isUnread = false
            return this.put(article)
        }
    }
    public starArticle = async (id: string, isStarred: boolean = true) => {
        const article = await this.get(id)
        if (article.isStarred !== isStarred) {
            article.isStarred = isStarred
            return this.put(article)
        }
        return null
    }
    public async queryArticles(selector: PouchDB.Find.Selector = {}, limit: number = 9999, skip: number = 0) {
        if (!selector.time) {
            selector.time = { $exists: true }
        }
        const result = await this.find({
            fields: ['_id', '_rev', 'author', 'feedId', 'isUnread', 'link', 'summary', 'time', 'title'],
            limit,
            selector,
            skip,
            sort: [{ time: 'desc'}],
        })
        return result.docs
    }

    public async getArticleContent(id: string) {
        const article = await this.get(id)
        if (article) {
            return article.description
        }
        return ''
    }
}
