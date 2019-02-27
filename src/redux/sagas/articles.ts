import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import Logic from '../../logic'
import { ArticlesActionTypes, InterfaceAction } from '../actions'

export function* fetchArticlesSaga(action: InterfaceAction) {
    try {
        const articles = yield call(Logic.getArticles, {})
        yield put({ type: ArticlesActionTypes.SET_ARTICLES, payload: { articles } })
    } catch (e) {
        console.error(e)
        // yield put({ type: "USER_FETCH_FAILED", message: e.message })
    }
}

export function* watchFetchArticles() {
    yield takeEvery(ArticlesActionTypes.ASYNC_FETCH_ARTICLES, fetchArticlesSaga)
}
