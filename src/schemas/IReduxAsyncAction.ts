import { IReduxAction } from './IReduxAction'
export interface IReduxAsyncAction extends IReduxAction {
  resolve: (value?: any | PromiseLike<any> | undefined) => void
  reject: (reason?: any) => void
}
