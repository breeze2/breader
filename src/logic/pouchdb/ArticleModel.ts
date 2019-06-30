import FeedParser from 'feedparser'
import { IArticle } from '../../schemas/'
import BaseModel from './BaseModel'

export default class ArticleModel extends BaseModel<IArticle> {
    public constructor() {
        super('articles', [
            {index: {
                fields: ['feedId'], name: 'feedId',
            }},
            {index: {
                fields: ['createTime'], name: 'createTime',
            }},
        ])
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
            link: item.link,
            originLink: item.origlink,
            publishTime: item.pubdate ? item.pubdate.getTime() : Date.now(),
            summary: item.summary,
            time: item.date ? item.date.getTime() : Date.now(),
            title: item.title,
        }
        return article
    }
    public async batchInsertArticles(articles: IArticle[], feedId?: string) {
        const num = 6
        const len = articles.length
        let tasks: Array<Promise<PouchDB.Core.Response>> = []
        for (let i = 0; i < len; i++) {
            tasks.push(this.insertArticle(articles[i], feedId))
            if (tasks.length === num) {
                await Promise.all(tasks)
                tasks = []
            }
        }
        if (tasks.length) {
            await Promise.all(tasks)
            tasks = []
        }
    }
    public async insertArticle(article: IArticle, feedId?: string) {
        article.feedId = feedId || article.feedId
        try {
            const oldArticle = await this.get(article._id)
            article._id = oldArticle._id
            article._rev = oldArticle._rev
            return this.put(article)
        } catch (error) {
            return this.post(article)
        }
    }
    public async getAllArticles() {
        const articles = await this.find({
            fields: ['_id', '_rev', 'author', 'feedId', 'summary', 'time', 'title'],
            selector: {},
            sort: ['createTime'],
        }, ['createTime'])
        return articles.docs
    }

    public async getArticleContent(id: string) {
        const article = await this.find({
            fields: ['content'],
            selector: {_id: {$eq: id}},
        }, [])
        if (article.docs[0]) {
            return article.docs[0].description
        }
        return ''
    }
}
