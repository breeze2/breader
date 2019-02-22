import InterfaceFeed from '../schemas/InterfaceFeed'
import FeedParser from './feedparser'
import DB from './sqlite3'

const Logic = {
    createFeed: async (feedUrl: string) => {
        try {
            const isExists = await DB.isFeedExists(feedUrl)
            if (isExists) {
                return
            }
            const feedNarticles = await FeedParser.parseFeed(feedUrl, '')
            if (!feedNarticles) {
                return
            }
            const feed = (feedNarticles as any).feed
            const feedId = await DB.createFeed(feed)
            const faviconUrl = feed.favicon || FeedParser.makeFaviconUrl(feed.link)
            const faviconData = await FeedParser.fetchFavicon(faviconUrl)
            // await DB.setFeedFavicon(feedId as number, 'data:image/x-icon;base64,' + faviconData)
            await DB.setFeedFavicon(feedId as number, 'data:image/gif;base64,' + faviconData)

        } catch (err) {
            console.error(err)
        }
    },
    getAllFeeds: async () => {
        try {
            const feeds = await DB.getAllFeeds()
            return feeds
            // console.log(feeds)
        } catch (err) {
            console.error(err)
        }
    },
}

export default Logic
