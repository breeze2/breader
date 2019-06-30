interface InterfaceLogicErrorMessage {
    code: number
    value: string
}

const LogicErrorMessages: { [key: string]: InterfaceLogicErrorMessage } = {
    DB_: { code: 2000, value: 'DB Error.' },
    FEED_PARSER_: { code: 3000, value: 'FeedParser Error.' },
}

class LogicError extends Error {
    public code: number
    public constructor(message: InterfaceLogicErrorMessage) {
        super(message.value)
        this.code = message.code
    }
}

const LogicErrorTypes = {
    FeedParser: {
        FETCH_ERROR: 'FEEDPARSER_FETCH_ERROR',
        NOT_FOUND: 'FEEDPARSER_NOT_FOUND',
        WRONG_URL: 'FEEDPARSER_WRONG_URL',
    },
    PouchDB: {
        EXISTS: 'POUCHDB_EXISTS',
    },
    UNKNOWN: 'UNKNOWN',
}

export default LogicError
export { LogicErrorTypes, LogicErrorMessages }
