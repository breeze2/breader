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

export default LogicError
export { LogicErrorMessages }
