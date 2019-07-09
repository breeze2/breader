import { all, call, put, race, select, takeEvery, takeLatest } from 'redux-saga/effects'
import Logic from '../../logic'
import { IArticle, IIMenuState, IReduxAction } from '../../schemas'
import {
    ArticlesActionTypes,
    IAsyncFilterArticlesPayload,
    IAsyncSelectAndReadArticlePayload,
    IAsyncSetAllArticlesReadPayload,
    IAsyncStarArticlePayload,
    ISetArticlesFilterPayload,
    ISetCurrentArticlePayload,
} from '../actions'
import { makeSagaWorkersDispatcher } from './helpers'
import { getArticles, getMenu } from './selectors'

export function* fetchArticlesSaga(action: IReduxAction<null>) {
    const menu: IIMenuState = yield select(getMenu)
    const menuKey = menu.selectedKey
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
    const articles: IArticle[] = yield call(Logic.getArticles, selector)
    yield put({ type: ArticlesActionTypes.SET_ARTICLES, payload: { articles: articles || [] } })
    return articles
}

export function* filterArticlesSaga(action: IReduxAction<IAsyncFilterArticlesPayload>) {
    yield put<IReduxAction<ISetArticlesFilterPayload>>({ type: ArticlesActionTypes.SET_ARTICLES_FILTER, payload: action.payload })
    yield put<IReduxAction<null>>({ type: ArticlesActionTypes.ASYNC_FETCH_ARTICLES, payload: null })
}

export function* selectAndReadArticleSaga(action: IReduxAction<IAsyncSelectAndReadArticlePayload>) {
    const article: IArticle | null = yield call(Logic.getArticle, action.payload.articleId)
    if (article) {
        article.index = action.payload.articleIndex
        yield race([
            call(Logic.setArticleIsRead, article._id),
            put<IReduxAction<ISetCurrentArticlePayload>>({ type: ArticlesActionTypes.SET_CURRENT_ARTICLE, payload: { article } }),
        ])
    } else {
        yield put<IReduxAction<ISetCurrentArticlePayload>>({ type: ArticlesActionTypes.SET_CURRENT_ARTICLE, payload: { article } })
    }
    return article
}

export function* starArticleSaga(action: IReduxAction<IAsyncStarArticlePayload>) {
    yield call(Logic.setArticleIsStarred, action.payload.articleId, action.payload.isStarred)
}

export function* setAllArticlesReadSaga(action: IReduxAction<IAsyncSetAllArticlesReadPayload>) {
    const articleIds: string[] = action.payload.articleIds
    const changes = yield call(Logic.setAriclesIsRead, articleIds)
    if (changes) {
        yield put({ type: ArticlesActionTypes.ASYNC_FETCH_ARTICLES, payload: null })
    }
    return changes
}

const dispatcher = makeSagaWorkersDispatcher({
    [ArticlesActionTypes.ASYNC_FETCH_ARTICLES]: fetchArticlesSaga,
    [ArticlesActionTypes.ASYNC_FILTER_ARTICLES]: filterArticlesSaga,
    [ArticlesActionTypes.ASYNC_SELECT_AND_READ_ARTICLE]: selectAndReadArticleSaga,
    [ArticlesActionTypes.ASYNC_STAR_ARTICLE]: starArticleSaga,
    [ArticlesActionTypes.ASYNC_SET_ALL_ARTICLES_READ]: setAllArticlesReadSaga,
})

export function* watchFetchArticles() {
    yield takeLatest(ArticlesActionTypes.ASYNC_FETCH_ARTICLES, dispatcher)
}

export function* watchFilterArticles() {
    yield takeLatest(ArticlesActionTypes.ASYNC_FILTER_ARTICLES, dispatcher)
}

export function* watchSelectAndReadArticles() {
    yield takeEvery(ArticlesActionTypes.ASYNC_SELECT_AND_READ_ARTICLE, dispatcher)
}

export function* watchStarArticle() {
    yield takeLatest(ArticlesActionTypes.ASYNC_STAR_ARTICLE, dispatcher)
}

export function* watchSetAllArticlesRead() {
    yield takeLatest(ArticlesActionTypes.ASYNC_SET_ALL_ARTICLES_READ, dispatcher)
}
