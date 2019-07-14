import { LogicErrorEnum } from '../schemas'

const LogicErrorMessages = {
    [LogicErrorEnum.FEEDPARSER_FETCH_ERROR]: 'Feedparser fetch error.',
    [LogicErrorEnum.FEEDPARSER_NOT_FOUND]: 'Feedparser feed not error.',
    [LogicErrorEnum.FEEDPARSER_WRONG_URL]: 'Feedparser wrong url.',
    [LogicErrorEnum.POUCHDB_EXISTS]: 'PouchDB doc exists.',
    [LogicErrorEnum.UNKNOWN]: 'Unknown error.',
}

export default class LogicError extends Error {
    public type: string
    public constructor(type: LogicErrorEnum) {
        super(LogicErrorMessages[type])
        this.type = type
    }
}
