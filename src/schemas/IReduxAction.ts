export interface IReduxAction<P = any> {
    payload: P,
    type: string,
}
