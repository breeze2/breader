import InterfaceFeed from '../schemas/InterfaceFeed'
const Sqlite3 = (window as any).require('sqlite3').verbose()
const SQLITE_DB_PATH = (window as any).SQLITE_DB_PATH
const db = new Sqlite3.Database(SQLITE_DB_PATH)

const DB = {
    getAllFeeds() {
        return new Promise((resolve, reject) => {
            db.all('select * from feeds where deleted_at is null order by created_at asc', (err: any, rows: any) => {
                if (err) {
                    return reject(err)
                } else {
                    return resolve(rows)
                }
            })
        })
    },
    setFeedFavicon(feedId: number, favicon: string) {
        return new Promise((resolve, reject) => {
            db.run('update feeds set favicon = $favicon where id = $id', {
                $favicon: favicon,
                $id: feedId,
            }, (err: any) => {
                if (err) {
                    return reject(err)
                } else {
                    return resolve(db.changes)
                }
            })
        })
    },
    isFeedExists(feedUrl: string) {
        return new Promise((resolve, reject) => {
            db.get('select * from feeds where link = ? limit 1;', [feedUrl], (err: any, row: any) => {
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
        return new Promise((resolve, reject) => {
            db.run(`insert into feeds(title, link, date, etag, favicon, created_at) values(
                $title, $link, $date, $etag, $favicon, $created_at
            )`, {
                $created_at: time,
                $date: feed.date.toString(),
                $etag: feed.etag,
                $favicon: feed.favicon,
                $link: feed.link,
                $title: feed.title,
            }, function (this: void, err: any) {
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
        return new Promise((resolve, reject) => {
            db.run(`update feeds set deleted_at = $deleted_at where feed.id = $feed_id`, {
                $deleted_at: time,
                $feed_id: feedId,
            }, function (this: void, err: any) {
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
        return new Promise((resolve, reject) => {
            db.run(`update feeds set title = $title, date = $date, etag = $etag, description = $description, favicon = $favicon, summary = summary, updated_at = $updated_at where feed.id = $feed_id`, {
                $date: feed.date,
                $description: feed.description,
                $etag: feed.etag,
                $favicon: feed.favicon,
                $feed_id: feedId,
                $summary: feed.summary,
                $title: feed.title,
                $updated_at: time,
            }, function (this: void, err: any) {
                if (err) {
                    return reject(err)
                } else {
                    return resolve((this as any).changes)
                }
            })
        })
    },
}

export default DB
