import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects'
import Logic from '../../logic'
import { IArticle, IIFeedsState, IIMenuState, IReduxAction, MenuKeyEnum } from '../../schemas'
import {
    ArticlesActionTypes,
    asyncFetchArticlesAction,
    IAsyncFilterArticlesPayload,
    IAsyncSelectAndReadArticlePayload,
    IAsyncSetAllArticlesReadPayload,
    IAsyncStarArticlePayload,
    setArticlesAction,
    setArticlesFilterAction,
    setCurrentArticleAction,
    setIsFetchingArticlesAction,
    setIsUpdatingCurrentArticleAction,
} from '../actions'
import { makeSagaWorkersDispatcher } from './helpers'
import { getArticles, getFeeds, getMenu } from './selectors'

export function* fetchArticlesSaga(action: IReduxAction<null>) {
    yield put(setIsFetchingArticlesAction(true))
    const menuState: IIMenuState = yield select(getMenu)
    const menuKey = menuState.selectedKey
    const feedsState: IIFeedsState = yield select(getFeeds)
    const feedIds = feedsState.list.map(feed => feed._id).toArray()
    const selector: PouchDB.Find.Selector = { feedId: { $in: feedIds } }
    switch (menuKey) {
        case MenuKeyEnum.ALL_ITEMS:
            break
        case MenuKeyEnum.STARRED_ITEMS:
            selector.isStarred = { $eq: true }
            break
        case MenuKeyEnum.UNREAD_ITEMS:
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
    yield put(setIsFetchingArticlesAction(false))
    yield put(setArticlesAction(articles || []))
    return articles
}

export function* filterArticlesSaga(action: IReduxAction<IAsyncFilterArticlesPayload>) {
    const payload = action.payload
    yield put(setArticlesFilterAction(payload.filter))
    yield put(asyncFetchArticlesAction())
}

export function* selectAndReadArticleSaga(action: IReduxAction<IAsyncSelectAndReadArticlePayload>) {
    yield put(setIsUpdatingCurrentArticleAction(true))
    const article: IArticle | null = yield call(Logic.getArticle, action.payload.articleId)
    if (article) {
        article.index = action.payload.articleIndex
        yield call(Logic.setArticleIsRead, article._id)
    }
    yield put(setIsUpdatingCurrentArticleAction(false))
    yield put(setCurrentArticleAction(article))
    return article
}

export function* starArticleSaga(action: IReduxAction<IAsyncStarArticlePayload>) {
    yield call(Logic.setArticleIsStarred, action.payload.articleId, action.payload.isStarred)
}

export function* setAllArticlesReadSaga(action: IReduxAction<IAsyncSetAllArticlesReadPayload>) {
    const articleIds: string[] = action.payload.articleIds
    const changes = yield call(Logic.setAriclesIsRead, articleIds)
    if (changes) {
        yield put(asyncFetchArticlesAction())
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
