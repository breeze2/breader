import Immutable from 'immutable'
import { IIArticlesState } from '../redux/reducers/articles'
import { IFeedsState } from '../redux/reducers/feeds'
import { IIMenuState } from '../redux/reducers/menu'

export type IIArticlesState = IIArticlesState
export type IIMenuState = IIMenuState

export interface IReduxState {
    articles: IIArticlesState
    feeds: Immutable.Record<IFeedsState> & Readonly<IFeedsState>
    menu: IIMenuState
}