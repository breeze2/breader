import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects'
import Logic from '../../logic'
import InterfaceFeed from '../../schemas/InterfaceFeed'
import { ArticlesActionTypes, FeedsActionTypes, InterfaceAction } from '../actions'
import { getFeeds, getMenu } from './selectors'

export function* fetchFeedsSaga(action: InterfaceAction) {
    try {
        const feeds = yield call(Logic.getAllFeeds)
        yield put({ type: FeedsActionTypes.SET_FEEDS, payload: { feeds } })
    } catch (e) {
        console.error(e)
    }
}

export function* parseFeedSaga(action: InterfaceAction) {
    try {
        const feed = yield call(Logic.createFeed, action.payload.feedUrl)
        if (feed) {
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

export function* updateFeedsSaga(action: InterfaceAction) {
    try {
        yield put({type: FeedsActionTypes.SET_IS_UPDATING_FEEDS, payload: { isUpdating: true}})
        const feedsStore = yield select(getFeeds)
        const list = feedsStore.get('list').toArray()
        for (const feed of list) {
            try {
                console.log(feed)
                const changes = yield call(Logic.updateFeedArticles, feed)
                console.log(changes)
            } catch (err) {
                console.error(err)
            }
        }

    } catch (e) {
        console.error(e)
    } finally {
        yield put({ type: FeedsActionTypes.SET_IS_UPDATING_FEEDS, payload: { isUpdating: false } })
    }
}

export function* watchParseFeed() {
    yield takeEvery(FeedsActionTypes.ASYNC_PARSE_FEED, parseFeedSaga)
}

export function* watchFetchFeeds() {
    yield takeEvery(FeedsActionTypes.ASYNC_FETCH_FEEDS, fetchFeedsSaga)
}

export function* watchUpdateFeeds() {
    yield takeEvery(FeedsActionTypes.ASYNC_UPDATE_FEEDS, updateFeedsSaga)
}
