import { all, fork } from 'redux-saga/effects'
import { watchArticlesSagas } from './articles'
import { watchFeedsSagas } from './feeds'
import { watchMenuSagas } from './menu'

export default function*() {
  yield all([
    fork(watchArticlesSagas),
    fork(watchFeedsSagas),
    fork(watchMenuSagas),
  ])
}
