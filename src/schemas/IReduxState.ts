import Immutable from 'immutable'
import { IIArticlesState } from '../redux/reducers/articles'
import { IIFeedsState } from '../redux/reducers/feeds'
import { IIMenuState } from '../redux/reducers/menu'

export type IIArticlesState = IIArticlesState
export type IIMenuState = IIMenuState
export type IIFeedsState = IIFeedsState

export interface IReduxState {
    articles: IIArticlesState
    feeds: IIFeedsState
    menu: IIMenuState
}