import { combineReducers } from 'redux'
import articles from './articles'
import feeds from './feeds'
import menuKey from './menuKey'

export default combineReducers({
    articles,
    feeds,
    menuKey,
})
