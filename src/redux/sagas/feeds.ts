import Immutable from 'immutable'
import { all, call, put, select, takeEvery, takeLatest } from 'redux-saga/effects'
import Logic from '../../logic'
import { IFeed, IIFeedsState, IIMenuState, IReduxAction } from '../../schemas'
import {
    ArticlesActionTypes,
    FeedsActionTypes,
    IAddFeedPayload,
    IAsyncDeleteFeedsPayload,
    IAsyncParseFeedPayload,
} from '../actions'
import { makeSagaWorkersDispatcher } from './helpers'
import { getFeeds, getMenu } from './selectors'

export function* fetchFeedsSaga(action: IReduxAction<null>) {
    const feeds = yield call(Logic.getAllFeeds)
    yield put({ type: FeedsActionTypes.SET_FEEDS, payload: { feeds } })
    return feeds
}

export function* parseFeedSaga(action: IReduxAction<IAsyncParseFeedPayload>) {
    const feed: IFeed | null = yield call(Logic.createFeed, action.payload.feedUrl)
    if (feed) {
        yield put<IReduxAction<IAddFeedPayload>>({ type: FeedsActionTypes.ADD_FEED, payload: { feed } })
        const menuState: IIMenuState = yield select(getMenu)
        const menuKey = menuState.selectedKey
        if (menuKey === 'ALL_ITEMS' || menuKey === 'UNREAD_ITEMS') {
            yield put({ type: ArticlesActionTypes.ASYNC_FETCH_ARTICLES, payload: null })
        }
    }
    return feed
}

export function* deleteFeedsSaga(action: IReduxAction<IAsyncDeleteFeedsPayload>) {
    if (action.payload.feedIds.length > 0) {
        const changes: number = yield call(Logic.deleteFeeds, action.payload.feedIds)
        if (changes) {
            yield put<IReduxAction<null>>({ type: FeedsActionTypes.ASYNC_FETCH_FEEDS, payload: null })
            yield put<IReduxAction<null>>({ type: ArticlesActionTypes.ASYNC_FETCH_ARTICLES, payload: null })
            return changes
        }
    }
    return 0
}

export function* updateFeedsSaga(action: IReduxAction<null>) {
    const feedsState: IIFeedsState = yield select(getFeeds)
    const list: IFeed[] = feedsState.list.toArray()
    let changes = 0
    for (const feed of list) {
        try {
            changes += yield call(Logic.updateFeedArticles, feed)
        } catch (err) {
            console.error(err)
        }
    }
    yield put<IReduxAction<null>>({ type: FeedsActionTypes.ASYNC_FETCH_FEEDS, payload: null })
    if (changes > 0) {
        yield put({ type: ArticlesActionTypes.ASYNC_FETCH_ARTICLES, payload: null })
    }
    return changes
}

const dispatcher = makeSagaWorkersDispatcher({
    [FeedsActionTypes.ASYNC_PARSE_FEED]: parseFeedSaga,
    [FeedsActionTypes.ASYNC_FETCH_FEEDS]: fetchFeedsSaga,
    [FeedsActionTypes.ASYNC_UPDATE_FEEDS]: updateFeedsSaga,
    [FeedsActionTypes.ASYNC_DELETE_FEEDS]: deleteFeedsSaga,
})

export function* watchParseFeed() {
    yield takeEvery(FeedsActionTypes.ASYNC_PARSE_FEED, dispatcher)
}

export function* watchFetchFeeds() {
    yield takeEvery(FeedsActionTypes.ASYNC_FETCH_FEEDS, dispatcher)
}

export function* watchUpdateFeeds() {
    yield takeEvery(FeedsActionTypes.ASYNC_UPDATE_FEEDS, dispatcher)
}

export function* watchDeleteFeeds() {
    yield takeEvery(FeedsActionTypes.ASYNC_DELETE_FEEDS, dispatcher)
}
