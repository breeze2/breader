import { combineReducers } from 'redux'
import { IReduxAction, IReduxState } from '../../schemas'
import articles from './articles'
import feeds from './feeds'
import menu from './menu'

export default combineReducers<IReduxState, IReduxAction>({
  articles,
  feeds,
  menu,
})
