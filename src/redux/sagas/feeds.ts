import { call, put, select, takeEvery } from 'redux-saga/effects'
import Logic from '../../logic'
import { IFeed, IIArticlesState, IIFeedsState, IIMenuState, IReduxAction, MenuKeyEnum } from '../../schemas'
import {
    addFeedAction,
    asyncFetchArticlesAction,
    asyncFetchFeedsAction,
    asyncSelectMenuKeyAction,
    FeedsActionTypes,
    IAsyncDeleteFeedsPayload,
    IAsyncParseFeedPayload,
    setCurrentArticleAction,
    setFeedsAction,
} from '../actions'
import { makeSagaWorkersDispatcher } from './helpers'
import { getArticles, getFeeds, getMenu } from './selectors'

let LAST_UPDATE_FEEDS_AT = 0

export function* fetchFeedsSaga(action: IReduxAction<null>) {
    const feeds: IFeed[] = yield call(Logic.getAllFeeds)
    yield put(setFeedsAction(feeds))
    const menuState: IIMenuState = yield select(getMenu)
    const menuKey = menuState.selectedKey
    const articlesState: IIArticlesState = yield select(getArticles)
    const currentArticle = articlesState.current
    if (menuKey in MenuKeyEnum) {
        yield put(asyncFetchArticlesAction())
    } else if (!feeds.some(feed => feed._id === menuKey)) {
        yield put(asyncSelectMenuKeyAction(MenuKeyEnum.ALL_ITEMS))
    }
    if (currentArticle && !feeds.some(feed => feed._id === currentArticle.feedId)) {
        yield put(setCurrentArticleAction(null))
    }
    return feeds
}

export function* parseFeedSaga(action: IReduxAction<IAsyncParseFeedPayload>) {
    const feed: IFeed | null = yield call(Logic.createFeed, action.payload.feedUrl)
    if (feed) {
        yield put(addFeedAction(feed))
        const menuState: IIMenuState = yield select(getMenu)
        const menuKey = menuState.selectedKey
        if (menuKey === MenuKeyEnum.ALL_ITEMS || menuKey === MenuKeyEnum.UNREAD_ITEMS) {
            yield put(asyncFetchArticlesAction())
        }
    }
    return feed
}

export function* deleteFeedsSaga(action: IReduxAction<IAsyncDeleteFeedsPayload>) {
    if (action.payload.feedIds.length > 0) {
        const feedIds = action.payload.feedIds
        const changes: number = yield call(Logic.deleteFeeds, feedIds)
        if (changes) {
            yield put(asyncFetchFeedsAction())
            return changes
        }
    }
    return 0
}

export function* updateFeedsSaga(action: IReduxAction<null>) {
    const now = Date.now()
    if (now < LAST_UPDATE_FEEDS_AT + 60 * 60 * 1000) {
        return 0
    }

    LAST_UPDATE_FEEDS_AT = now
    const feedsState: IIFeedsState = yield select(getFeeds)
    const list = feedsState.list.toArray()
    let changes = 0

    for (const feed of list) {
        try {
            changes += yield call(Logic.updateFeedArticles, feed)
        } catch (err) {
            console.error(err)
        }
    }
    if (changes > 0) {
        yield put(asyncFetchFeedsAction())
        yield put(asyncFetchArticlesAction())
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
