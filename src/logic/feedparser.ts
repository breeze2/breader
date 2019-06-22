import chardet from 'chardet'
import BaseFeedParser from 'feedparser'
import http from 'http'
import https from 'https'
import iconv from 'iconv-lite'
import { Transform, TransformCallback } from 'stream'
import url from 'url'
import { IFeed, IArticle } from '../schemas'

class IconvTransform extends Transform {
    private temp: string = ''
    public _transform(chunk: any, encoding: string, callback: TransformCallback) {
        this.temp += chunk
        // TODO temp is too big
        callback()
    }
    public _flush(callback: TransformCallback) {
        const buffer = Buffer.from(this.temp)
        const charset = chardet.detect(buffer)
        let output = buffer.toString()
        if (charset) {
            output = (typeof charset === 'string') ?
                iconv.decode(buffer, charset as string) :
                iconv.decode(buffer, (charset as chardet.Confidence[])[0].name)
        }
        this.push(output)
        callback()
    }
}

function xmlHttpRequest(feedUrl: string, options: http.RequestOptions) {
    return new Promise<http.IncomingMessage>((resolve, reject) => {
        const u = url.parse(feedUrl)
        if (!u) {
            return reject(new Error('WRONG URL'))
        }
        const client = u.protocol === 'http:' ? http : https
        const headers = options.headers ? options.headers : {}
        headers['user-agent'] = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36'
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
        }).on('error', (err: any) => {
            return reject(err)
        })
    })
}

const FeedParser = {
    makeArticle (post: any) {
        return {
            author: post.author,
            created_at: ~~(post.pubdate.getTime() / 1000),
            date: post.date.toDateString(),
            description: post.description,
            guid: post.guid,
            link: post.link,
            summary: post.summary,
            time: post.date.toTimeString(),
            title: post.title,
            updated_at: ~~(post.date.getTime() / 1000),
        }
    },
    makeFaviconUrl(feedUrl: string) {
        const u = url.parse(feedUrl)
        return u.protocol + '//' + u.host + '/' + 'favicon.ico'
    },
    makeFeed(feedUrl: string, meta: any) {
        return {
            date_time: meta.date.toString(),
            description: meta.description,
            etag: meta.etag,
            favicon: meta.favicon ? meta.favicon : FeedParser.makeFaviconUrl(meta.link),
            link: meta.link,
            summary: meta.summary,
            title: meta.title,
            url: feedUrl,
        }
    },
    fetchFavicon (favicon: string) {
        return new Promise<string>((resolve, reject) => {
            xmlHttpRequest(favicon, {}).then((res: http.IncomingMessage) => {
                if (res.statusCode === 200) {
                    let base64data = ''
                    res.on('data', (chunk: Buffer) => {
                        base64data += chunk.toString('base64')
                    })
                    res.on('end', (err: any) => {
                        if (err) {
                            return reject(err)
                        } else {
                            return resolve(base64data)
                        }
                    })
                } else {
                    return resolve('')
                }
            })
        })
    },
    parseFeed (feedUrl: string, etag: string) {
        return new Promise((resolve, reject) => {
            xmlHttpRequest(feedUrl, { headers: {
                'accept': 'text/html,application/xhtml+xml',
                'if-none-match': etag,
            } }).then((res: http.IncomingMessage) => {
                if (res.statusCode === 200) {
                    const cv = new IconvTransform()
                    const fp = new BaseFeedParser({})
                    const articles: IArticle[] = []
                    let feed: IFeed
                    res.pipe(cv)
                    res.pipe(fp)
                    fp.on('meta', (meta: any) => {
                        meta.etag = res.headers.etag ? res.headers.etag : ''
                        meta.etag = meta.etag.toString()
                        meta.etag = meta.etag.slice(0, 2) === "W/" ? meta.etag.slice(2) : meta.etag
                        feed = FeedParser.makeFeed(feedUrl, meta)
                    })
                    fp.on('readable', () => {
                        let post: any = fp.read()
                        while (post) {
                            articles.push(FeedParser.makeArticle(post))
                            post = fp.read()
                        }
                    })
                    fp.on('end', (err: any) => {
                        if (err) {
                            return reject(err)
                        } else {
                            return resolve({ feed, articles })
                        }
                    })
                    fp.on('error', (err: any) => {
                        // TODO
                        return reject(err)
                    })
                } else if (res.statusCode === 304) {
                    resolve()
                } else {
                    reject(new Error('FETCH ERROR'))
                }
            })
        })
    },
}

export default FeedParser
