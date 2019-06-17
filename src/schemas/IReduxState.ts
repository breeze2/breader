import Immutable from 'immutable'
import { IArticlesState } from '../redux/reducers/articles'
import { IFeedsState } from '../redux/reducers/feeds'
import { IMenuState } from '../redux/reducers/menu'

export interface IReduxState {
    articles: Immutable.Record<IArticlesState> & Readonly<IArticlesState>
    feeds: Immutable.Record<IFeedsState> & Readonly<IFeedsState>
    menu: Immutable.Record<IMenuState> & Readonly<IMenuState>
}