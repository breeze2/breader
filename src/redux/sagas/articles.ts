import { all, call, put, select, takeEvery, takeLatest } from 'redux-saga/effects'
import Logic from '../../logic'
import { IReduxAction } from '../../schemas'
import { ArticlesActionTypes } from '../actions'
import { getArticles, getMenu } from './selectors'

export function* fetchArticlesSaga(action: IReduxAction) {
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
        if (query.feed_id) {
            const articlesStore = yield select(getArticles)
            const filter = articlesStore.get('filter')
            if (filter === 'STARRED') {
                query.is_starred = 1
            } else if (filter === 'UNREAD') {
                query.is_unread = 1
            }
        }
        const articles = yield call(Logic.getArticles, query)
        yield put({ type: ArticlesActionTypes.SET_ARTICLES, payload: { articles: articles || [] } })
    } catch (e) {
        console.error(e)
    }
}

function* getArticleContentSaga(action: IReduxAction) {
    try {
        const articleContent = yield call(Logic.getArticleContent, action.payload.articleId)
        yield put({ type: ArticlesActionTypes.SET_SELECTED_ARTICLE_CONTENT, payload: { articleContent } })
    } catch (e) {
        console.error(e)
    }
}

export function* selectAndReadArticlesSaga(action: IReduxAction) {
    try {
        yield all([
            put({type: ArticlesActionTypes.SET_SELECTED_ARTICLE, payload: action.payload}),
            call(Logic.setArticleIsRead, action.payload.articleId),
            call(getArticleContentSaga, action),
        ])
    } catch (e) {
        console.error(e)
    }
}

export function* starArticleSaga(action: IReduxAction) {
    try {
        yield call(Logic.setArticleIsStarred, action.payload.articleId, action.payload.isStarred)
    } catch (e) {
        console.error(e)
    }
}

export function* setAllArticlesReadSaga (action: IReduxAction) {
    try {
        const changes = yield call(Logic.setAllAriclesIsRead)
        if (changes) {
            yield put({ type: ArticlesActionTypes.ASYNC_FETCH_ARTICLES, payload: null })
        }
        yield put({ type: ArticlesActionTypes.SET_ALL_ARTICLES_READ_AT, payload: { allReadAt: Date.now() }})
    } catch (e) {
        console.error(e)
    }
}

export function* filterArticlesSaga(action: IReduxAction) {
    try {
        yield put({ type: ArticlesActionTypes.SET_ARTICLES_FILTER, payload: action.payload })
        yield put({ type: ArticlesActionTypes.ASYNC_FETCH_ARTICLES, payload: null })
    } catch (e) {
        console.error(e)
    }
}

export function* watchFetchArticles() {
    yield takeLatest(ArticlesActionTypes.ASYNC_FETCH_ARTICLES, fetchArticlesSaga)
}

export function* watchSelectAndReadArticles() {
    yield takeEvery(ArticlesActionTypes.ASYNC_SELECT_AND_READ_ARTICLE, selectAndReadArticlesSaga)
}

export function* watchFilterArticles() {
    yield takeLatest(ArticlesActionTypes.ASYNC_FILTER_ARTICLES, filterArticlesSaga)
}

export function* watchStarArticle() {
    yield takeLatest(ArticlesActionTypes.ASYNC_STAR_ARTICLE, starArticleSaga)
}

export function* watchSetAllArticlesRead() {
    yield takeLatest(ArticlesActionTypes.ASYNC_SET_ALL_ARTICLES_READ, setAllArticlesReadSaga)
}
