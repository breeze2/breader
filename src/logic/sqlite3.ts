import InterfaceArticle from '../schemas/InterfaceArticle'
import InterfaceFeed from '../schemas/InterfaceFeed'
const Sqlite3 = (window as any).require('sqlite3').verbose()
const SQLITE_DB_PATH = (window as any).SQLITE_DB_PATH
const db = new Sqlite3.Database(SQLITE_DB_PATH)

function makeGetArticlesSql (query: any) {
    const list = []
    let sql = `select articles.author, articles.created_at, articles.date, articles.deleted_at,
        articles.description, articles.feed_id, articles.guid, articles.id,
        articles.is_starred, articles.is_unread, articles.link, articles.meta, substr(articles.summary, 0, 30) as summary,
        articles.time, articles.title, articles.updated_at, feeds.title as feed_title
        from articles join feeds on articles.feed_id = feeds.id `
    if (query.feed_id) {
        list.push('articles.feed_id = $feed_id')
    }
    if (query.is_starred) {
        list.push('articles.is_starred = 1')
    }
    if (query.is_unread) {
        list.push('articles.is_unread = 1')
    }
    if (list.length) {
        sql += ' where '
        sql += list.join(' and ')
    }
    sql += ' order by articles.updated_at desc limit $limit offset $offset;'
    return sql
}

function makeGetArticlesParams (query: any, offset: number, limit: number) {
    const params: any = {}
    if (query.feed_id) {
        params.$feed_id = query.feed_id
    }
    params.$offset = offset
    params.$limit = limit
    return params
}

function makeInsertArticlesSql (length: number) {
    const last = length - 1
    let sql = `insert into articles(guid, feed_id, author, link, title, description, summary, date, time, created_at, updated_at) values `
    for (let i = 0; i < last; i++) {
        sql += `($guid${i}, $feed_id${i}, $author${i}, $link${i}, $title${i}, $description${i}, $summary${i}, $date${i}, $time${i}, $created_at${i}, $updated_at${i}), `
    }
    sql += `($guid${last}, $feed_id${last}, $author${last}, $link${last}, $title${last}, $description${last}, $summary${last}, $date${last}, $time${last}, $created_at${last}, $updated_at${last});`
    return sql
}

function makeInsertArticlesParams(articles: InterfaceArticle[], feedId: number) {
    const params: any = {}
    articles.forEach((a, i) => {
        params[`$guid${i}`] = a.guid
        params[`$feed_id${i}`] = feedId
        params[`$author${i}`] = a.author
        params[`$link${i}`] = a.link
        params[`$title${i}`] = a.title
        params[`$description${i}`] = a.description
        params[`$summary${i}`] = a.summary
        params[`$date${i}`] = a.date
        params[`$time${i}`] = a.time
        params[`$created_at${i}`] = a.created_at
        params[`$updated_at${i}`] = a.updated_at
    })
    return params
}

const DB = {
    getAllFeeds() {
        const sql = 'select * from feeds where deleted_at is null order by created_at asc'
        return new Promise((resolve, reject) => {
            db.all(sql, (err: any, rows: any[]) => {
                if (err) {
                    return reject(err)
                } else {
                    return resolve(rows)
                }
            })
        })
    },
    getArticleContent (articleId: number) {
        const sql = 'select description from articles where id = $id limit 1'
        const params = { $id: articleId }
        return new Promise((resolve, reject) => {
            db.get(sql, params, (err: any, row: any) => {
                if (err) {
                    return reject(err)
                } else {
                    return resolve(row.description)
                }
            })
        })
    },
    setArticleIsRead (articleId: number) {
        const sql = 'update articles set is_unread = 0 where id = $id'
        const params = { $id: articleId }
        return new Promise((resolve, reject) => {
            db.run(sql, params, function (this: void, err: any) {
                if (err) {
                    return reject(err)
                } else {
                    return resolve((this as any).changes)
                }
            })
        })
    },
    getNeedUpdatedFeeds() {
        let time = ~~(Date.now() / 1000)
        time -= 60 * 60 * 6
        const sql = 'select * from feeds where deleted_at is null and updated_at < $time order by created_at asc'
        const params = {
            $time: time,
        }
        return new Promise((resolve, reject) => {
            db.all(sql, params, (err: any, rows: any[]) => {
                if (err) {
                    return reject(err)
                } else {
                    return resolve(rows)
                }
            })
        })
    },
    setFeedFavicon(feedId: number, favicon: string) {
        const sql = 'update feeds set favicon = $favicon where id = $id'
        const params = {
            $favicon: favicon,
            $id: feedId,
        }
        return new Promise((resolve, reject) => {
            db.run(sql, params, (err: any) => {
                if (err) {
                    return reject(err)
                } else {
                    return resolve(db.changes)
                }
            })
        })
    },
    isFeedExists(feedUrl: string, really = false) {
        const sql = really ? `select * from feeds where link = ? limit 1;` :
            `select * from feeds where link = ? and deleted_at is null limit 1;`
        const params = [feedUrl]
        return new Promise((resolve, reject) => {
            db.get(sql, params, (err: any, row: any) => {
                if (err) {
                    return reject(err)
                } else {
                    return resolve(row)
                }
            })
        })
    },
    createFeed(feed: InterfaceFeed) {
        const time = ~~(Date.now() / 1000)
        const sql = `insert into feeds(title, link, date_time, etag, favicon, created_at) values
                    ($title, $link, $date_time, $etag, $favicon, $created_at)`
        const params = {
            $created_at: time,
            $date_time: feed.date_time,
            $etag: feed.etag,
            $favicon: feed.favicon,
            $link: feed.link,
            $title: feed.title,
        }
        return new Promise((resolve, reject) => {
            db.run(sql, params, function (this: void, err: any) {
                if (err) {
                    return reject(err)
                } else {
                    return resolve((this as any).lastID)
                }
            })
        })
    },
    deleteFeed(feedId: number) {
        const time = ~~(Date.now() / 1000)
        const sql = `update feeds set deleted_at = $deleted_at where feed.id = $feed_id`
        const params = {
            $deleted_at: time,
            $feed_id: feedId,
        }
        return new Promise((resolve, reject) => {
            db.run(sql, params, function (this: void, err: any) {
                if (err) {
                    return reject(err)
                } else {
                    return resolve((this as any).changes)
                }
            })
        })
    },
    updateFeed(feedId: number, feed: InterfaceFeed) {
        const time = ~~(Date.now() / 1000)
        const sql = `update feeds set title = $title, date_time = $date_time, etag = $etag,
                    description = $description, summary = $summary,
                    updated_at = $updated_at, deleted_at = $deleted_at
                    where feed.id = $feed_id`
        const params = {
            $date_time: feed.date_time,
            $deleted_at: feed.deleted_at,
            $description: feed.description,
            $etag: feed.etag,
            $feed_id: feedId,
            $summary: feed.summary,
            $title: feed.title,
            $updated_at: time,
        }
        return new Promise((resolve, reject) => {
            db.run(sql, params, function (this: void, err: any) {
                if (err) {
                    return reject(err)
                } else {
                    return resolve((this as any).changes)
                }
            })
        })
    },
    createArticles(articles: InterfaceArticle[], feedId: number) {
        const time = ~~(Date.now() / 1000)
        const leng = articles.length
        const sql = makeInsertArticlesSql(leng)
        const params = makeInsertArticlesParams(articles, feedId)
        return new Promise((resolve, reject) => {
            if (leng === 0) {
                return resolve(0)
            }
            db.run(sql, params, function (this: void, err: any) {
                if (err) {
                    return reject(err)
                } else {
                    return resolve((this as any).changes)
                }
            })
        })
    },
    updateArticle(article: InterfaceArticle) {
        const sql = `update articles set title = $title, date = $date, time = $time,
                description = $description, summary = $summary, link = $link,
                created_at = $create_at
                updated_at = $updated_at
                where guid = $guid`
        const params = {
            $author: article.author,
            $created_at: article.created_at,
            $date: article.date,
            $description: article.description,
            $guid: article.guid,
            $link: article.link,
            $summary: article.summary,
            $title: article.title,
            $updated_at: article.updated_at,
        }
        return new Promise((resolve, reject) => {
            db.run(sql, params, function (this: void, err: any) {
                if (err) {
                    return reject(err)
                } else {
                    return resolve((this as any).changes)
                }
            })
        })
    },
    saveArticles(articles: InterfaceArticle[], feedId: number, time: number) {
        const needCreated: InterfaceArticle[] = []
        articles.forEach((a) => {
            if (a.created_at && a.created_at > time) {
                needCreated.push(a)
            } else if (a.updated_at && a.updated_at > time) {
                DB.updateArticle(a).catch((err) => { console.error(err) })
            }
        })
        return DB.createArticles(needCreated, feedId)
    },
    getArticles (query: any, offset: number, limit: number) {
        const sql = makeGetArticlesSql(query)
        const params = makeGetArticlesParams(query, offset, limit)
        return new Promise((resolve, reject) => {
            db.all(sql, params, (err: any, rows: any[]) => {
                if (err) {
                    return reject(err)
                } else {
                    return resolve(rows)
                }
            })
        })
    },
}

export default DB
