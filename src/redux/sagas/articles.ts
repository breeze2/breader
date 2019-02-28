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

export function* selectAndReadArticlesSaga(action: InterfaceAction) {
    try {
        console.log(1111)
        yield put({type: ArticlesActionTypes.SET_SELECTED_ARTICLE, payload: action.payload})
        yield call(Logic.setArticleIsRead, action.payload.articleId)
        console.log(action)
        const articleContent = yield call(Logic.getArticleContent, action.payload.articleId)
        console.log(articleContent)
        yield put({ type: ArticlesActionTypes.SET_SELECTED_ARTICLE_CONTENT, payload: { articleContent } })
    } catch (e) {
        console.error(e)
        // yield put({ type: "USER_FETCH_FAILED", message: e.message })
    }
}


export function* watchFetchArticles() {
    yield takeEvery(ArticlesActionTypes.ASYNC_FETCH_ARTICLES, fetchArticlesSaga)
}

export function* watchSelectAndReadArticles() {
    yield takeEvery(ArticlesActionTypes.ASYNC_SELECT_AND_READ_ARTICLE, selectAndReadArticlesSaga)
}
