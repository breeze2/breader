import { all, call, put, select, takeEvery, takeLatest } from 'redux-saga/effects'
import Logic from '../../logic'
import { IReduxAction } from '../../schemas'
import { ArticlesActionTypes, FeedsActionTypes } from '../actions'
import { makeSagaWorkersDispatcher } from './helpers'
import { getFeeds, getMenu } from './selectors'

export function* fetchFeedsSaga(action: IReduxAction) {
    try {
        const feeds = yield call(Logic.getAllFeeds)
        yield put({ type: FeedsActionTypes.SET_FEEDS, payload: { feeds } })
    } catch (e) {
        console.error(e)
    }
}

export function* parseFeedSaga(action: IReduxAction) {
    try {
        const feed = yield call(Logic.createFeed, action.payload.feedUrl)
        if (feed) {
            if (feed === 'EXISTS') {
                return
            }
            yield put({ type: FeedsActionTypes.ADD_FEED, payload: { feed } })
            const menuStore = yield select(getMenu)
            const menuKey = menuStore.get('selectedKey')
            if (menuKey === 'ALL_ITEMS' || menuKey === 'UNREAD_ITEMS') {
                yield put({ type: ArticlesActionTypes.ASYNC_FETCH_ARTICLES, payload: null})
            }
        } else {
            yield put({ type: FeedsActionTypes.TIPS_PARSE_INVALID_FEED, payload: null })
        }
    } catch (e) {
        console.error(e)
    }
}

export function* deleteFeedsSaga(action: IReduxAction) {
    try {
        if (action.payload.feedIds.length > 0) {
            const changes = yield call(Logic.deleteFeeds, action.payload.feedIds)
            if (changes) {
                yield put({ type: FeedsActionTypes.ASYNC_FETCH_FEEDS, payload: null })
                yield put({ type: ArticlesActionTypes.ASYNC_FETCH_ARTICLES, payload: null })
            }
        }
    } catch (e) {
        console.error(e)
    }
}

export function* updateFeedsSaga(action: IReduxAction) {
    try {
        yield put({type: FeedsActionTypes.SET_IS_UPDATING_FEEDS, payload: { isUpdating: true}})
        const feedsStore = yield select(getFeeds)
        const list = feedsStore.get('list').toArray()
        let changes = 0
        for (const feed of list) {
            try {
                changes += yield call(Logic.updateFeedArticles, feed)
            } catch (err) {
                console.error(err)
            }
        }
        yield all([
            put({ type: FeedsActionTypes.ASYNC_FETCH_FEEDS, payload: null}),
            put({ type: FeedsActionTypes.SET_FEEDS_CHANGES, payload: { changes } }),
            put({ type: FeedsActionTypes.SET_FEEDS_UPDATED_AT, payload: { updatedAt: Date.now() }}),
        ])
        if (changes > 0) {
            yield put({ type: ArticlesActionTypes.ASYNC_FETCH_ARTICLES, payload: null })
        }
    } catch (e) {
        console.error(e)
    } finally {
        yield put({ type: FeedsActionTypes.SET_IS_UPDATING_FEEDS, payload: { isUpdating: false } })
    }
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
