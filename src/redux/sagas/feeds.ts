import Immutable from 'immutable'
import { all, call, put, select, takeEvery, takeLatest } from 'redux-saga/effects'
import Logic from '../../logic'
import { LogicErrorTypes } from '../../logic/error'
import { IFeed, IReduxAction } from '../../schemas'
import { ArticlesActionTypes, FeedsActionTypes } from '../actions'
import { IMenuState } from '../reducers/menu'
import { makeSagaWorkersDispatcher } from './helpers'
import { getFeeds, getMenu } from './selectors'

export function* fetchFeedsSaga(action: IReduxAction) {
    const feeds = yield call(Logic.getAllFeeds)
    yield put({ type: FeedsActionTypes.SET_FEEDS, payload: { feeds } })
}

export function* parseFeedSaga(action: IReduxAction) {
    yield put<IReduxAction>({ type: FeedsActionTypes.SET_IS_CREATING_FEED, payload: { isCreating: true } })
    const feed: IFeed | string = yield call(Logic.createFeed, action.payload.feedUrl)
    yield put<IReduxAction>({ type: FeedsActionTypes.SET_IS_CREATING_FEED, payload: { isCreating: false } })
    if (typeof feed === 'string') {
        switch (feed) {
            case LogicErrorTypes.PouchDB.EXISTS:
                break
            case LogicErrorTypes.FeedParser.NOT_FOUND:
                break
            default:
                yield put({ type: FeedsActionTypes.TIPS_PARSE_INVALID_FEED, payload: null })
                break
        }
        return null
    }
    yield put<IReduxAction>({ type: FeedsActionTypes.ADD_FEED, payload: { feed } })
    const menuState: Immutable.Record<IMenuState> = yield select(getMenu)
    const menuKey = menuState.get('selectedKey')
    if (menuKey === 'ALL_ITEMS' || menuKey === 'UNREAD_ITEMS') {
        yield put({ type: ArticlesActionTypes.ASYNC_FETCH_ARTICLES, payload: null })
    }
    return feed
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
