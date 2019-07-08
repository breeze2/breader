import { IFeed, IReduxAction } from '../../schemas'

export const FeedsActionTypes = {
    ADD_FEED: 'ADD_FEED',
    SET_FEEDS: 'SET_FEEDS',
    SET_FEEDS_CHANGES: 'SET_FEEDS_CHANGES',
    SET_FEEDS_UPDATED_AT: 'SET_FEEDS_UPDATED_AT',
    SET_FEED_FAVICON: 'SET_FEED_FAVICON',
    SET_IS_CREATING_FEED: 'SET_IS_CREATING_FEED',
    SET_IS_UPDATING_FEEDS: 'SET_IS_UPDATING_FEEDS',
    TIPS_PARSE_INVALID_FEED: 'TIPS_PARSE_INVALID_FEED',

    ASYNC_DELETE_FEEDS: 'ASYNC_DELETE_FEEDS',
    ASYNC_FETCH_FEEDS: 'ASYNC_FETCH_FEEDS',
    ASYNC_PARSE_FEED: 'ASYNC_PARSE_FEED',
    ASYNC_UPDATE_FEEDS: 'ASYNC_UPDATE_FEEDS',
}

export interface IAddFeedPayload { feed: IFeed }
export const addFeedAction = (feed: IFeed): IReduxAction<IAddFeedPayload> => ({
    payload: { feed },
    type: FeedsActionTypes.ADD_FEED,
})

export interface ISetFeedsChangesPayload { changes: number }
export const setFeedsChangesAction = (changes: number): IReduxAction<ISetFeedsChangesPayload> => ({
    payload: { changes },
    type: FeedsActionTypes.SET_FEEDS_CHANGES,
})

export interface ISetFeedsUpdatedPayload { updatedAt: number }
export const setFeedsUpdatedAtAction = (updatedAt: number): IReduxAction<ISetFeedsUpdatedPayload> => ({
    payload: { updatedAt },
    type: FeedsActionTypes.SET_FEEDS_UPDATED_AT,
})

export interface ISetFeedsPayload { feeds: IFeed[] }
export const setFeedsAction = (feeds: IFeed[]): IReduxAction<ISetFeedsPayload> => ({
    payload: { feeds },
    type: FeedsActionTypes.SET_FEEDS,
})

export interface ISetFeedFaviconPayload { feedId: string, favicon: string }
export const setFeedFaviconAction = (feedId: string, favicon: string): IReduxAction<ISetFeedFaviconPayload> => ({
    payload: { feedId, favicon },
    type: FeedsActionTypes.SET_FEED_FAVICON,
})

export interface ISetIsUpdatingFeedsPayload { isUpdating: boolean }
export const setIsUpdatingFeedsAction = (isUpdating: boolean): IReduxAction<ISetIsUpdatingFeedsPayload> => ({
    payload: { isUpdating },
    type: FeedsActionTypes.SET_IS_UPDATING_FEEDS,
})

export interface ISetIsCreatingFeedPayload { isCreating: boolean }
export const setIsCreatingFeedAction = (isCreating: boolean): IReduxAction<ISetIsCreatingFeedPayload> => ({
    payload: { isCreating },
    type: FeedsActionTypes.SET_IS_CREATING_FEED,
})

export const tipsParseInvalidFeedAction = (): IReduxAction<null> => ({
    payload: null,
    type: FeedsActionTypes.TIPS_PARSE_INVALID_FEED,
})

export const asyncFetchFeedsAction = (): IReduxAction<null> => ({
    payload: null,
    type: FeedsActionTypes.ASYNC_FETCH_FEEDS,
})

export const asyncUpdateFeedsAction = (): IReduxAction<null> => ({
    payload: null,
    type: FeedsActionTypes.ASYNC_UPDATE_FEEDS,
})

export interface IAsyncParseFeedPayload { feedUrl: string }
export const asyncParseFeedAction = (feedUrl: string): IReduxAction<IAsyncParseFeedPayload> => ({
    payload: { feedUrl },
    type: FeedsActionTypes.ASYNC_PARSE_FEED,
})

export interface IAsyncDeleteFeedsPayload { feedIds: string[] }
export const asyncDeleteFeedsAction = (feedIds: string[]): IReduxAction<IAsyncDeleteFeedsPayload> => ({
    payload: { feedIds },
    type: FeedsActionTypes.ASYNC_DELETE_FEEDS,
})
