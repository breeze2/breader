import Immutable from 'immutable'
import { combineReducers } from 'redux'
import { IAction } from '../actions'
import articles, { IArticlesState } from './articles'
import feeds, { IFeedsState } from './feeds'
import menu, { IMenuState } from './menu'

export interface IState {
    articles: Immutable.Record<IArticlesState> & Readonly<IArticlesState>
    feeds: Immutable.Record<IFeedsState> & Readonly<IFeedsState>
    menu: Immutable.Record<IMenuState> & Readonly<IMenuState>
}

export default combineReducers<IState, IAction>({
    articles,
    feeds,
    menu,
})
