import { combineReducers } from 'redux'
import articles from './articles'
import feedFavicons from './feedFavicons'
import feeds from './feeds'
import menuKey from './menuKey'

export default combineReducers({
    articles,
    feedFavicons,
    feeds,
    menuKey,
})
