import { put, race, takeLatest } from 'redux-saga/effects'
import { IReduxAction } from '../../schemas'
import {
  asyncFetchArticlesAction,
  IAsyncSelectMenuKeyPayload,
  MenuActionTypes,
  setMenuKeyAction,
} from '../actions'
import { makeSagaWorkersDispatcher } from './helpers'

export function* selectMenuKeySaga(
  action: IReduxAction<IAsyncSelectMenuKeyPayload>
) {
  const payload = action.payload
  yield race([
    put(setMenuKeyAction(payload.key)),
    put(asyncFetchArticlesAction()),
  ])
}

const dispatcher = makeSagaWorkersDispatcher({
  [MenuActionTypes.ASYNC_SELECT_MENU_KEY]: selectMenuKeySaga,
})

export function* watchMenuSagas() {
  yield takeLatest(MenuActionTypes.ASYNC_SELECT_MENU_KEY, dispatcher)
}
