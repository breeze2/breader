const BaseFeedParser = (window as any).require('feedparser')
const http = (window as any).require('http')
const https = (window as any).require('https')
const url = (window as any).require('url')
const iconv = (window as any).require('iconv-lite')
const detectCharacterEncoding = (window as any).require('detect-character-encoding')
const { Transform } = (window as any).require('stream')
const Buffer = (window as any).Buffer
import InterfaceFeed from '../schemas/InterfaceFeed'

class IconvTransform extends Transform {
    private temp: string = ''
    private _transform(chunk: any, encoding: string, callback: ((err: any) => any)) {
        this.temp += chunk
        // TODO temp is too big
        callback(null)
    }
    private _flush(callback: ((err: any) => any)) {
        const buffer = Buffer.from(this.temp)
        const charset = detectCharacterEncoding(buffer)
        const output = iconv.decode(buffer, charset.encoding)
        this.push(output)
        callback(null)
    }
}

function xmlHttpRequest(feedUrl: string, options: any) {
    return new Promise((resolve, reject) => {
        const u = url.parse(feedUrl)
        if (!u) {
            return reject(new Error('WRONG URL'))
        }
        const client = u.protocol === 'http:' ? http : https
        const headers = options.headers ? options.headers : {}
        headers['user-agent'] = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36'
        headers.host = u.host
        headers.origin = headers.referer = u.protocol + '//' + u.host + '/'
        const o = {
            headers,
            host: u.host,
            hostname: u.hostname,
            method: 'GET',
            path: u.path,
            port: u.port,
            protocol: u.protocol,
            timeout: 10000,
        }
        client.get(o, (res: any) => {
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
            favicon: meta.favicon,
            link: meta.link,
            summary: meta.summary,
            title: meta.title,
            url: feedUrl,
        }
    },
    fetchFavicon (favicon: string) {
        return new Promise((resolve, reject) => {
            xmlHttpRequest(favicon, {}).then((res: any) => {
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
                }
            })
        })
    },
    parseFeed (feedUrl: string, etag: string) {
        return new Promise((resolve, reject) => {
            xmlHttpRequest(feedUrl, { headers: {
                'accept': 'text/html,application/xhtml+xml',
                'if-none-match': etag,
            } }).then((res: any) => {
                if (res.statusCode === 200) {
                    const cv = new IconvTransform()
                    const fp = new BaseFeedParser()
                    const articles: any[] = []
                    let feed: InterfaceFeed
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
                }
            })
        })
    },
}

export default FeedParser
