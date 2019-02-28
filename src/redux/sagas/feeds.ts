import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import Logic from '../../logic'
import { FeedsActionTypes, InterfaceAction } from '../actions'

export function* fetchFeedsSaga(action: InterfaceAction) {
    try {
        const feeds = yield call(Logic.getAllFeeds)
        yield put({ type: FeedsActionTypes.SET_FEEDS, payload: { feeds } })
    } catch (e) {
        console.error(e)
        // yield put({ type: "USER_FETCH_FAILED", message: e.message })
    }
}

export function* parseFeedSaga(action: InterfaceAction) {
    try {
        const feed = yield call(Logic.createFeed, action.payload.feedUrl)
        if (feed) {
            yield put({ type: FeedsActionTypes.ADD_FEED, payload: { feed } })
        } else {
            yield put({ type: FeedsActionTypes.TIPS_PARSE_INVALID_FEED, payload: null })
        }
    } catch (e) {
        console.error(e)
        // yield put({ type: "USER_FETCH_FAILED", message: e.message })
    }
}

export function* watchParseFeed() {
    yield takeEvery(FeedsActionTypes.ASYNC_PARSE_FEED, parseFeedSaga)
}

export function* watchFetchFeeds() {
    yield takeEvery(FeedsActionTypes.ASYNC_FETCH_FEEDS, fetchFeedsSaga)
}
