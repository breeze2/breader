import { IReduxAction, IReduxAsyncAction } from '../../schemas'

export function* nerverThrowWrapper(
  worker: (a: IReduxAction) => Generator<any>,
  action: IReduxAction
) {
  try {
    yield worker(action)
  } catch (e) {
    console.error(e)
  }
}

export function* noWrapper(
  worker: (a: IReduxAction) => Generator<any>,
  action: IReduxAction
) {
  yield worker(action)
}

export function* handlePromiseWrapper(
  worker: (a: IReduxAction) => Generator<any>,
  action: IReduxAsyncAction
) {
  try {
    const result = yield worker(action)
    return action.resolve(result)
  } catch (e) {
    return action.reject(e)
  }
}

export function makeSagaWorkersDispatcher(workersMap: {
  [key: string]: (action: IReduxAction) => Generator<any>
}) {
  return function*(action: IReduxAction) {
    const worker = workersMap[action.type]
    if (worker) {
      if ('reject' in action && 'resolve' in action) {
        yield handlePromiseWrapper(worker, action as IReduxAsyncAction)
      } else {
        yield nerverThrowWrapper(worker, action)
        // yield noWrapper(worker, action)
      }
    }
  }
}
