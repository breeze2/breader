import { all, call, put, select, takeEvery, takeLatest } from 'redux-saga/effects'
import Logic from '../../logic'
import { ArticlesActionTypes, InterfaceAction } from '../actions'
import { getMenu } from "./selectors"

export function* fetchArticlesSaga(action: InterfaceAction) {
    try {
        const menu = yield select(getMenu)
        const menuKey = menu.get('selectedKey')
        const query: any = {}
        switch (menuKey) {
            case 'ALL_ITEMS':
                break
            case 'STARRED_ITEMS':
                query.is_starred = 1
                break
            case 'UNREAD_ITEMS':
                query.is_unread = 1
                break
            default:
                query.feed_id = parseInt(menuKey, 10)
                break
        }
        const articles = yield call(Logic.getArticles, query)
        yield put({ type: ArticlesActionTypes.SET_ARTICLES, payload: { articles: articles || [] } })
    } catch (e) {
        console.error(e)
    }
}

function* getArticleContentSaga(action: InterfaceAction) {
    try {
        const articleContent = yield call(Logic.getArticleContent, action.payload.articleId)
        yield put({ type: ArticlesActionTypes.SET_SELECTED_ARTICLE_CONTENT, payload: { articleContent } })
    } catch (e) {
        console.error(e)
    }
}

export function* selectAndReadArticlesSaga(action: InterfaceAction) {
    try {
        yield all([
            put({type: ArticlesActionTypes.SET_SELECTED_ARTICLE, payload: action.payload}),
            call(Logic.setArticleIsRead, action.payload.articleId),
            call(getArticleContentSaga, action),
        ])
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
