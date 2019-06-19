import { Dispatch } from 'redux'
import { IReduxAction, IReduxAsyncAction } from '../../schemas'

export function asyncActionDispatcher<Type = {}>(dispatch: Dispatch<IReduxAction>, action: IReduxAction) {
    return new Promise<Type>((resolve, reject) => {
        const asyncAction: IReduxAsyncAction = {
            ...action,
            reject,
            resolve,
        }
        dispatch(asyncAction)
    })
}

export * from './articles'
export * from './feeds'
export * from './menu'
