import { Dispatch } from 'redux'
import { IReduxAction, IReduxAsyncAction } from '../../schemas'

export function actionCreator<Payload>(type: string) {
  return (payload: Payload): IReduxAction<Payload> => ({
    payload,
    type,
  })
}

export function asyncActionDispatcher<Type = any>(
  dispatch: Dispatch<IReduxAction>,
  action: IReduxAction
) {
  return new Promise<Type>((resolve, reject) => {
    const asyncAction: IReduxAsyncAction = {
      ...action,
      reject,
      resolve,
    }
    dispatch(asyncAction)
  })
}
