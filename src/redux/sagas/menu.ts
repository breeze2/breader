import { put, race, takeLatest } from 'redux-saga/effects'
import { IReduxAction } from '../../schemas'
import {
    ArticlesActionTypes,
    IAsyncSelectMenuKeyPayload,
    MenuActionTypes,
} from '../actions'
import { makeSagaWorkersDispatcher } from './helpers'

export function* selectMenuKeySaga(action: IReduxAction<IAsyncSelectMenuKeyPayload>) {
    yield race([
        put({ type: MenuActionTypes.SET_MENU_KEY, payload: action.payload }),
        put({ type: ArticlesActionTypes.ASYNC_FETCH_ARTICLES, payload: null }),
    ])
}

const dispatcher = makeSagaWorkersDispatcher({
    [MenuActionTypes.ASYNC_SELECT_MENU_KEY]: selectMenuKeySaga,
})

export function* watchSelectMenuKey() {
    yield takeLatest(MenuActionTypes.ASYNC_SELECT_MENU_KEY, dispatcher)
}
