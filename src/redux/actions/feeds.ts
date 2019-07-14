import { IFeed } from '../../schemas'
import { actionCreator } from './helpers'

export const FeedsActionTypes = {
    ADD_FEED: 'ADD_FEED',
    SET_FEEDS: 'SET_FEEDS',
    SET_FEED_FAVICON: 'SET_FEED_FAVICON',
    SET_IS_CREATING_FEED: 'SET_IS_CREATING_FEED',
    SET_IS_UPDATING_FEEDS: 'SET_IS_UPDATING_FEEDS',

    ASYNC_DELETE_FEEDS: 'ASYNC_DELETE_FEEDS',
    ASYNC_FETCH_FEEDS: 'ASYNC_FETCH_FEEDS',
    ASYNC_PARSE_FEED: 'ASYNC_PARSE_FEED',
    ASYNC_UPDATE_FEEDS: 'ASYNC_UPDATE_FEEDS',
}

export interface IAddFeedPayload { feed: IFeed }
export const addFeedAction = (feed: IFeed) =>
    actionCreator<IAddFeedPayload>(FeedsActionTypes.ADD_FEED)({ feed })

export interface ISetFeedsPayload { feeds: IFeed[] }
export const setFeedsAction = (feeds: IFeed[]) =>
    actionCreator<ISetFeedsPayload>(FeedsActionTypes.SET_FEEDS)({ feeds })

export interface ISetFeedFaviconPayload { feedId: string, favicon: string }
export const setFeedFaviconAction = (feedId: string, favicon: string) =>
    actionCreator<ISetFeedFaviconPayload>(FeedsActionTypes.SET_FEED_FAVICON)({ feedId, favicon })

export interface ISetIsUpdatingFeedsPayload { isUpdating: boolean }
export const setIsUpdatingFeedsAction = (isUpdating: boolean) =>
    actionCreator<ISetIsUpdatingFeedsPayload>(FeedsActionTypes.SET_IS_UPDATING_FEEDS)({ isUpdating })

export interface ISetIsCreatingFeedPayload { isCreating: boolean }
export const setIsCreatingFeedAction = (isCreating: boolean) =>
    actionCreator<ISetIsCreatingFeedPayload>(FeedsActionTypes.SET_IS_CREATING_FEED)({ isCreating })

export const asyncFetchFeedsAction = () =>
    actionCreator<void>(FeedsActionTypes.ASYNC_FETCH_FEEDS)()

export const asyncUpdateFeedsAction = () =>
    actionCreator<void>(FeedsActionTypes.ASYNC_UPDATE_FEEDS)()

export interface IAsyncParseFeedPayload { feedUrl: string }
export const asyncParseFeedAction = (feedUrl: string) =>
    actionCreator<IAsyncParseFeedPayload>(FeedsActionTypes.ASYNC_PARSE_FEED)({ feedUrl })

export interface IAsyncDeleteFeedsPayload { feedIds: string[] }
export const asyncDeleteFeedsAction = (feedIds: string[]) =>
    actionCreator<IAsyncDeleteFeedsPayload>(FeedsActionTypes.ASYNC_DELETE_FEEDS)({ feedIds })
