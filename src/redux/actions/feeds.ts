import InterfaceFeed from '../../schemas/InterfaceFeed'

export const FeedsActionTypes = {
    ADD_FEED: 'ADD_FEED',
    SET_FEEDS: 'SET_FEEDS',
    SET_FEEDS_CHANGES: 'SET_FEEDS_CHANGES',
    SET_FEEDS_UPDATED_AT: 'SET_FEEDS_UPDATED_AT',
    SET_FEED_FAVICON: 'SET_FEED_FAVICON',
    SET_IS_UPDATING_FEEDS: 'SET_IS_UPDATING_FEEDS',
    TIPS_PARSE_INVALID_FEED: 'TIPS_PARSE_INVALID_FEED',

    ASYNC_DELETE_FEEDS: 'ASYNC_DELETE_FEEDS',
    ASYNC_FETCH_FEEDS: 'ASYNC_FETCH_FEEDS',
    ASYNC_PARSE_FEED: 'ASYNC_PARSE_FEED',
    ASYNC_UPDATE_FEEDS: 'ASYNC_UPDATE_FEEDS',
}

export const addFeedAction = (feed: InterfaceFeed) => ({
    payload: { feed },
    type: FeedsActionTypes.ADD_FEED,
})

export const setFeedsChangesAction = (changes: number) => ({
    payload: { changes },
    type: FeedsActionTypes.SET_FEEDS_CHANGES,
})

export const setFeedsUpdatedAtAction = (updatedAt: number) => ({
    payload: { updatedAt },
    type: FeedsActionTypes.SET_FEEDS_UPDATED_AT,
})

export const setFeedsAction = (feeds: InterfaceFeed[]) => ({
    payload: { feeds },
    type: FeedsActionTypes.SET_FEEDS,
})

export const setFeedFaviconAction = (feedId: number, favicon: string) => ({
    payload: { feedId, favicon },
    type: FeedsActionTypes.SET_FEED_FAVICON,
})

export const setIsUpdatingFeedsAction = (isUpdating: boolean) => ({
    payload: { isUpdating },
    type: FeedsActionTypes.SET_IS_UPDATING_FEEDS,
})

export const tipsParseInvalidFeedAction = () => ({
    payload: null,
    type: FeedsActionTypes.TIPS_PARSE_INVALID_FEED,
})

export const asyncFetchFeedsAction = () => {
    return ({
    payload: null,
    type: FeedsActionTypes.ASYNC_FETCH_FEEDS,
})}

export const asyncUpdateFeedsAction = () => {
    return ({
        payload: null,
        type: FeedsActionTypes.ASYNC_UPDATE_FEEDS,
    })
}

export const asyncParseFeedAction = (feedUrl: string) => {
    return ({
        payload: { feedUrl },
        type: FeedsActionTypes.ASYNC_PARSE_FEED,
    })
}

export const asyncDeleteFeedsAction = (feedIds: number[]) => {
    return ({
        payload: { feedIds },
        type: FeedsActionTypes.ASYNC_DELETE_FEEDS,
    })
}
