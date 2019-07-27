import { IFeed, ELogicError } from '../schemas'
import LogicError from './error'
import { parseFeed } from './feedparser'
import { articleDB, feedDB } from './pouchdb'

(window as any).articleDB = articleDB
const Logic = {
    createFeed: async (feedUrl: string) => {
        const isExists = await feedDB.isFeedExists(feedUrl)
        if (isExists && !isExists.deleteTime) {
            // throw new LogicError(ELogicError.POUCHDB_EXISTS)
            return null
        }
        const newFeed = await parseFeed(feedUrl, '')
        if (!newFeed) {
            throw new LogicError(ELogicError.FEEDPARSER_NOT_FOUND)
        }
        const response = await feedDB.insertFeed(newFeed)
        if (response && response.ok) {
            newFeed._id = response.id
            newFeed._rev = response.rev
            const articles = newFeed.articles
            if (articles) {
                articles.forEach(article => (article.feedId = newFeed._id))
                await articleDB.batchInsertArticles(articles)
            }
        }
        return newFeed
    },
    deleteFeeds: async (feedIds: string[]) => {
        let changes = 0
        for (const feedId of feedIds) {
            const response = await feedDB.deleteFeed(feedId)
            changes += response.ok ? 1 : 0
        }
        return changes
    },
    getAllFeeds: async () => {
        const feeds = await feedDB.getAllFeeds()
        return feeds
    },
    getArticle: async (articleId: string) => {
        const article = await articleDB.get(articleId)
        return article
    },
    getArticleContent: async (articleId: string) => {
        const articleContent = await articleDB.getArticleContent(articleId)
        return articleContent
    },
    getArticles: async (selector: PouchDB.Find.Selector = {}, limit: number = 9999, skip: number = 0) => {
        const articles = await articleDB.queryArticles(selector, limit, skip)
        return articles
    },
    setAriclesIsRead: async (articleIds: string[]) => {
        const changes = await articleDB.batchReadArticles(articleIds)
        return changes
    },
    setArticleIsRead: async (articleId: string) => {
        await articleDB.readArticle(articleId)
    },
    setArticleIsStarred: async (articleId: string, isStarred: boolean) => {
        await articleDB.starArticle(articleId, isStarred)
    },
    updateFeedArticles: async (feed: IFeed) => {
        const newFeed = await parseFeed(feed.url, feed.etag || '')
        if (!newFeed) {
            return 0
        }
        newFeed.createTime = feed.createTime
        const response = await feedDB.insertFeed(newFeed)
        if (response && response.ok) {
            newFeed._id = response.id
            newFeed._rev = response.rev
            const articles = newFeed.articles
            if (articles) {
                articles.forEach(article => (article.feedId = feed._id))
                await articleDB.batchInsertArticles(articles)
            }
        }
        return 1
    },
}

export default Logic
