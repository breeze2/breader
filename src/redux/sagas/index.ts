import { all, fork } from 'redux-saga/effects'
import { watchFetchArticles } from './articles'
import { watchFetchFeeds, watchParseFeed } from './feeds'

export default function* () {
    yield all([
        fork(watchFetchArticles),
        fork(watchFetchFeeds),
        fork(watchParseFeed),
    ])
}
