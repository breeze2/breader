import { all, fork } from 'redux-saga/effects'
import { watchFetchArticles, watchFilterArticles, watchSelectAndReadArticles, watchSetAllArticlesRead, watchStarArticle } from './articles'
import { watchDeleteFeeds, watchFetchFeeds, watchParseFeed, watchUpdateFeeds } from './feeds'
import { watchSelectMenuKey } from './menu'

export default function* () {
    yield all([
        fork(watchSetAllArticlesRead),
        fork(watchStarArticle),
        fork(watchSelectAndReadArticles),
        fork(watchFilterArticles),
        fork(watchFetchArticles),
        fork(watchDeleteFeeds),
        fork(watchFetchFeeds),
        fork(watchParseFeed),
        fork(watchUpdateFeeds),
        fork(watchSelectMenuKey),
    ])
}
