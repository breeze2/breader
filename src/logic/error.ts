enum LogicErrorTypes {
    FEEDPARSER_FETCH_ERROR,
    FEEDPARSER_NOT_FOUND,
    FEEDPARSER_WRONG_URL,
    POUCHDB_EXISTS,
    UNKNOWN,
}

const LogicErrorMessages = {
    [LogicErrorTypes.FEEDPARSER_FETCH_ERROR]: 'Feedparser fetch error.',
    [LogicErrorTypes.FEEDPARSER_NOT_FOUND]: 'Feedparser feed not error.',
    [LogicErrorTypes.FEEDPARSER_WRONG_URL]: 'Feedparser wrong url.',
    [LogicErrorTypes.POUCHDB_EXISTS]: 'PouchDB doc exists.',
    [LogicErrorTypes.UNKNOWN]: 'Unknown error.',
}

export default class LogicError extends Error {
    public static types = LogicErrorTypes
    public code: number
    public constructor(code: LogicErrorTypes) {
        super(LogicErrorMessages[code])
        this.code = code
    }
}

// const LogicErrorTypes = {
//     FeedParser: {
//         FETCH_ERROR: 'FEEDPARSER_FETCH_ERROR',
//         NOT_FOUND: 'FEEDPARSER_NOT_FOUND',
//         WRONG_URL: 'FEEDPARSER_WRONG_URL',
//     },
//     PouchDB: {
//         EXISTS: 'POUCHDB_EXISTS',
//     },
//     UNKNOWN: 'UNKNOWN',
// }

// export default LogicError
// export { LogicErrorTypes, LogicErrorMessages }
