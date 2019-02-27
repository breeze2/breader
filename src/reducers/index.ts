import { combineReducers } from 'redux'
import articleId from './articleId'
import articles from './articles'
import feedFavicons from './feedFavicons'
import feeds from './feeds'
import menuKey from './menuKey'

export default combineReducers({
    articleId,
    articles,
    feedFavicons,
    feeds,
    menuKey,
})
