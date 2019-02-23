import InterfaceFeed from '../schemas/InterfaceFeed'
import FeedParser from './feedparser'
import DB from './sqlite3'

const Logic = {
    createFeed: async (feedUrl: string) => {
        try {
            const isExists: any = await DB.isFeedExists(feedUrl, true)
            if (isExists && !isExists.deleted_at) {
                return
            }
            const feedNarticles = await FeedParser.parseFeed(feedUrl, '')
            if (!feedNarticles) {
                return
            }
            const feed = (feedNarticles as any).feed
            const articles = (feedNarticles as any).articles
            let feedId: any = 0
            let lastDateTime = 0
            if (isExists) {
                const date = new Date(isExists.date_time)
                lastDateTime = ~~(date.getTime() / 1000)
                feedId = isExists.id
                feed.deleted_at = null
                await DB.updateFeed(feedId, feed)
            } else {
                feedId = await DB.createFeed(feed)
            }

            const faviconUrl = feed.favicon || FeedParser.makeFaviconUrl(feed.link)
            Logic.saveFeedFavicon(feedId as number, faviconUrl)

            DB.saveArticles(articles, feedId, lastDateTime)

            feed.id = feedId
            return feed
        } catch (err) {
            console.error(err)
        }
    },
    getAllFeeds: async () => {
        try {
            const feeds = await DB.getAllFeeds()
            return feeds
        } catch (err) {
            console.error(err)
        }
    },
    saveFeedFavicon: async (feedId: number, faviconUrl: string) => {
        try {
            const faviconData = await FeedParser.fetchFavicon(faviconUrl)
            // await DB.setFeedFavicon(feedId as number, 'data:image/x-icon;base64,' + faviconData)
            await DB.setFeedFavicon(feedId, 'data:image/gif;base64,' + faviconData)
        } catch (err) {
            console.error(err)
        }
    },
}

export default Logic
