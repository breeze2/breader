import { IReduxState } from '../../schemas'
export const getMenu = (state: IReduxState) => state.menu
export const getFeeds = (state: IReduxState) => state.feeds
export const getArticles = (state: IReduxState) => state.articles
