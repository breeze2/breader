import Immutable from 'immutable'
import { IArticle } from './IArticle'
import { IFeed } from './IFeed'

export interface IArticlesState {
  current: IArticle | null
  filter: string
  isFetching: boolean
  isUpdatingCurrent: boolean
  list: Immutable.List<IArticle>
}

export interface IFeedsState {
  isUpdating: boolean
  isCreating: boolean
  list: Immutable.List<IFeed>
  map: Immutable.Map<string, IFeed>
}

export interface IMenuState {
  language: string
  onlineStatus: boolean
  selectedKey: string
}

export type IIArticlesState = Immutable.Record<IArticlesState> &
  Readonly<IArticlesState>
export type IIFeedsState = Immutable.Record<IFeedsState> & Readonly<IFeedsState>
export type IIMenuState = Immutable.Record<IMenuState> & Readonly<IMenuState>

export interface IReduxState {
  articles: IIArticlesState
  feeds: IIFeedsState
  menu: IIMenuState
}
