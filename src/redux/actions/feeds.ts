import InterfaceFeed from '../../schemas/InterfaceFeed'

export const FeedsActionTypes = {
    ADD_FEED: 'ADD_FEED',
    SET_FEEDS: 'SET_FEEDS',
    SET_IS_UPDATING_FEEDS: 'SET_IS_UPDATING_FEEDS',
    TIPS_PARSE_INVALID_FEED: 'TIPS_PARSE_INVALID_FEED',

    ASYNC_FETCH_FEEDS: 'ASYNC_FETCH_FEEDS',
    ASYNC_PARSE_FEED: 'ASYNC_PARSE_FEED',
    ASYNC_UPDATE_FEEDS: 'ASYNC_UPDATE_FEEDS',
}

export const addFeedAction = (feed: InterfaceFeed) => ({
    payload: { feed },
    type: FeedsActionTypes.ADD_FEED,
})

export const setFeedsAction = (feeds: InterfaceFeed[]) => ({
    payload: { feeds },
    type: FeedsActionTypes.SET_FEEDS,
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
