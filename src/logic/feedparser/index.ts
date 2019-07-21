import FeedParser from 'feedparser'
import http from 'http'
import https from 'https'
import url from 'url'
import { IArticle, IFeed, ELogicError } from '../../schemas'
import LogicError from '../error'
import { articleDB, feedDB } from '../pouchdb'
import IconvTransform from './IconvTransform'

function feedXmlRequest(feedUrl: string, options: http.RequestOptions) {
    return new Promise<http.IncomingMessage>((resolve, reject) => {
        const u = url.parse(feedUrl)
        if (!u) {
            return reject(new LogicError(ELogicError.FEEDPARSER_WRONG_URL))
        }
        const client = u.protocol === 'http:' ? http : https
        const headers = options.headers ? options.headers : {}
        headers['user-agent'] =
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36'
        headers.host = u.host
        headers.origin = headers.referer = u.protocol + '//' + u.host + '/'
        const o: http.RequestOptions = {
            headers,
            host: u.host,
            hostname: u.hostname,
            method: 'GET',
            path: u.path,
            port: u.port,
            protocol: u.protocol,
            timeout: 10000,
        }
        client.get(o, (res: http.IncomingMessage) => {
            return resolve(res)
        }).on('error', (err: Error) => {
            return reject(err)
        })
    })
}

function makeFaviconUrl(feedUrl: string) {
    const u = url.parse(feedUrl)
    return u.protocol + '//' + u.host + '/' + 'favicon.ico'
}

function parseEtag(res: http.IncomingMessage) {
    let etag = res.headers.etag ? res.headers.etag : ''
    etag = etag.toString()
    etag = etag.slice(0, 2) === "W/" ? etag.slice(2) : etag
    return etag
}

export function parseFeed(feedUrl: string, etag: string) {
    return new Promise<IFeed | null>((resolve, reject) => {
        feedXmlRequest(feedUrl, { headers: {
            'accept': 'text/html,application/xhtml+xml',
            'if-none-match': etag,
        } }).then((res: http.IncomingMessage) => {
            if (res.statusCode === 200) {
                const cv = new IconvTransform()
                const fp = new FeedParser({})
                const articles: IArticle[] = []
                let feed: IFeed
                let item: FeedParser.Item
                res.pipe(cv)
                res.pipe(fp)
                fp.on('meta', (meta: FeedParser.Meta) => {
                    meta.favicon = meta.favicon ? meta.favicon : makeFaviconUrl(meta.link)
                    feed = feedDB.makeFeedBaseOnMate(meta, parseEtag(res))
                })
                fp.on('readable', () => {
                    item = fp.read()
                    while (item) {
                        articles.push(articleDB.makeArticleBaseOnItem(item))
                        item = fp.read()
                    }
                })
                fp.on('end', (err: any) => {
                    if (err) {
                        return reject(err)
                    } else {
                        feed.articles = articles
                        return resolve(feed)
                    }
                })
                fp.on('error', (err: any) => {
                    // TODO
                    return reject(err)
                })
            } else if (res.statusCode === 301) {
                const newUrl = res.headers.location
                if (newUrl) {
                    feedDB.updateFeedUrl(feedUrl, newUrl)
                }
                return resolve(null)
            } else if (res.statusCode === 304) {
                return resolve(null)
            } else {
                console.error(res)
                return reject(new LogicError(ELogicError.FEEDPARSER_FETCH_ERROR))
            }
        })
    })
}
