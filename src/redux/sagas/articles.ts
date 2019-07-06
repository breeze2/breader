import { all, call, put, select, takeEvery, takeLatest } from 'redux-saga/effects'
import Logic from '../../logic'
import { IReduxAction } from '../../schemas'
import { ArticlesActionTypes } from '../actions'
import { makeSagaWorkersDispatcher } from './helpers'
import { getArticles, getMenu } from './selectors'

export function* fetchArticlesSaga(action: IReduxAction) {
    try {
        const menu = yield select(getMenu)
        const menuKey = menu.get('selectedKey')
        const selector: PouchDB.Find.Selector = {}
        switch (menuKey) {
            case 'ALL_ITEMS':
                break
            case 'STARRED_ITEMS':
                selector.isStarred = { $eq: true }
                break
            case 'UNREAD_ITEMS':
                selector.isUnread = { $eq: true }
                break
            default:
                selector.feedId = { $eq: menuKey }
                break
        }
        if (selector.feedId) {
            const articlesStore = yield select(getArticles)
            const filter = articlesStore.get('filter')
            if (filter === 'STARRED') {
                selector.isStarred = { $eq: true }
            } else if (filter === 'UNREAD') {
                selector.isUnread = { $eq: true }
            }
        }
        const articles = yield call(Logic.getArticles, selector)
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
        const articleIds: string[] = action.payload.articleIds
        const changes = yield call(Logic.setAriclesIsRead, articleIds)
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

const dispatcher = makeSagaWorkersDispatcher({
    [ArticlesActionTypes.ASYNC_FETCH_ARTICLES]: fetchArticlesSaga,
    [ArticlesActionTypes.ASYNC_SELECT_AND_READ_ARTICLE]: selectAndReadArticlesSaga,
    [ArticlesActionTypes.ASYNC_FILTER_ARTICLES]: filterArticlesSaga,
    [ArticlesActionTypes.ASYNC_STAR_ARTICLE]: starArticleSaga,
    [ArticlesActionTypes.ASYNC_SET_ALL_ARTICLES_READ]: setAllArticlesReadSaga,
})

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
