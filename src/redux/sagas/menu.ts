import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { ArticlesActionTypes, InterfaceAction, MenuActionTypes } from '../actions'

export function* selectMenuKeySaga(action: InterfaceAction) {
    try {
        yield put({ type: MenuActionTypes.SET_SELECTED_MENU_KEY, payload: action.payload })
        yield put({ type: ArticlesActionTypes.ASYNC_FETCH_ARTICLES, payload: null })
    } catch (e) {
        console.error(e)
    }
}

export function* watchSelectMenuKey() {
    yield takeLatest(MenuActionTypes.ASYNC_SELECT_MENU_KEY, selectMenuKeySaga)
}
