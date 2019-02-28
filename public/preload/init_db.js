const fs = require('fs')
const path = require('path')
const { remote } = require('electron')
const sqlite3 = require('sqlite3').verbose()
const app = remote.app

const dataPath = app.getPath('userData')
const sqlite3Path = path.join(dataPath, './sqlite3')

const SQLITE_DB_PATH = path.join(sqlite3Path, './breader')

function initSqlite3 () {
    let db = new sqlite3.Database(SQLITE_DB_PATH)
    db.serialize(function () {
        db.parallelize(function () {
            db.run(`
                CREATE TABLE IF NOT EXISTS feeds (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    title VARCHAR(255) NOT NULL,
                    link VARCHAR(255) NOT NULL,
                    url VARCHAR(255) NOT NULL,
                    date_time VARCHAR(255) DEFAULT NULL,
                    etag VARCHAR(255) DEFAULT NULL,
                    favicon TEXT DEFAULT NULL,
                    meta TEXT DEFAULT NULL,
                    created_at INTEGER DEFAULT NULL,
                    deleted_at INTEGER DEFAULT NULL,
                    updated_at INTEGER DEFAULT NULL
                );
                CREATE UNIQUE INDEX IF NOT EXISTS link ON feeds(link);
            `)

            db.run(`
                CREATE TABLE IF NOT EXISTS articles (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    feed_id INTEGER NOT NULL,
                    author VARCHAR(255) NOT NULL, 
                    guid VARCHAR(255) NOT NULL,
                    title VARCHAR(255) NOT NULL,
                    link VARCHAR(255) NOT NULL,
                    summary VARCHAR(255) DEFAULT NULL,
                    date VARCHAR(255) DEFAULT NULL,
                    time VARCHAR(255) DEFAULT NULL,
                    description TEXT NOT NULL,
                    meta TEXT DEFAULT NULL,
                    is_unread TINYINT DEFAULT 1,
                    is_starred TINYINT DEFAULT 0,
                    created_at INTEGER DEFAULT NULL,
                    deleted_at INTEGER DEFAULT NULL,
                    updated_at INTEGER DEFAULT NULL
                );
                CREATE UNIQUE INDEX IF NOT EXISTS link ON articles(link);
                CREATE UNIQUE INDEX IF NOT EXISTS guid ON articles(guid);
                CREATE INDEX IF NOT EXISTS feed_id ON articles(feed_id);
                CREATE INDEX IF NOT EXISTS created_at ON articles(created_at);
            `)

            db.run(`CREATE VIRTUAL TABLE IF NOT EXISTS article_fts USING fts5(guid, feed_id, title, summary, description);`)
        })
    })
    window.SQLITE_DB_PATH = SQLITE_DB_PATH
    db.close()
}

function promiseStat (dir) {
    return new Promise ((resolve, reject) => {
        fs.stat(dir, (err, stats) => {
            if (err) {
                reject(err)
            } else {
                resolve(stats)
            }
        })    
    })
}

function promiseMkdir(dir) {
    return new Promise((resolve, reject) => {
        fs.mkdir(dir, (err) => {
            if (err) {
                reject(err)
            } else {
                resolve()
            }
        })
    })
}

function mkdirIfNotExists (dir) {
    return promiseStat(dir).then(stats => {
        return Promise.resolve(stats.isDirectory())
    }).catch(err => {
        if (err.code === 'ENOENT') {
            return Promise.resolve(false)
        } else {
            return Promise.reject(err)
        }
    }).then(isExists => {
        if (!isExists) {
            return promiseMkdir(dir)
        } else {
            return Promise.resolve()
        }
    })
}

mkdirIfNotExists(dataPath).then(() => {
    return mkdirIfNotExists(sqlite3Path)
}).then(() => {
    initSqlite3()
})