import FeedParser from 'feedparser'
import { IArticle, IFeed } from '../../schemas'
import BaseModel from './BaseModel'

export default class FeedModel extends BaseModel<IFeed> {
    public constructor() {
        super('feeds', [
            {index: {
                fields: ['url'], name: 'url',
            }},
            {index: {
                fields: ['createTime'], name: 'createTime',
            }},
        ])
    }
    public makeFeedBaseOnMate(meta: FeedParser.Meta, etag: string = '', articles: IArticle[] = []) {
        const feed: IFeed = {
            _id: '',
            _rev: '',
            articles,
            author: meta.author,
            categories: meta.categories,
            createTime: Date.now(),
            deleteTime: 0,
            description: meta.description,
            etag,
            favicon: meta.favicon,
            generator: meta.generator,
            language: meta.language,
            link: meta.link,
            publishTime: meta.pubdate ? meta.pubdate.getTime() : Date.now(),
            time: meta.date ? meta.date.getTime() : Date.now(),
            title: meta.title,
            url: meta.xmlurl,
        }
        return feed
    }
    public async isFeedExists(url: string) {
        const response = await this.find({
            selector: { url },
        }, ['url'])
        if (response.docs[0]) {
            return response.docs[0]
        }
        return false
    }
    public async insertFeed (feed: IFeed) {
        const oldFeed = await this.isFeedExists(feed.url)
        const newFeed = { ...feed }
        delete newFeed.articles
        if (oldFeed) {
            newFeed._id = oldFeed._id
            newFeed._rev = oldFeed._rev
            return this.put(newFeed)
        } else {
            return this.post(newFeed)
        }
    }
    public async deleteFeed (id: string) {
        const feed = await this.get(id)
        feed.deleteTime = Date.now()
        return this.put(feed)
    }
    public async getAllFeeds() {
        const feeds = await this.find({
            selector: {},
            sort: ['createTime'],
        }, ['createTime'])
        return feeds.docs
    }
}
