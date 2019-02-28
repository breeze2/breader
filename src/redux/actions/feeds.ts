import InterfaceFeed from '../../schemas/InterfaceFeed'

export const FeedsActionTypes = {
    ADD_FEED: 'ADD_FEED',
    SET_FEEDS: 'SET_FEEDS',

    ASYNC_FETCH_FEEDS: 'ASYNC_FETCH_FEEDS',
    ASYNC_PARSE_FEED: 'ASYNC_PARSE_FEED',
}

export const addFeedAction = (feed: InterfaceFeed) => ({
    payload: { feed },
    type: FeedsActionTypes.ADD_FEED,
})

export const setFeedsAction = (feeds: InterfaceFeed[]) => ({
    payload: { feeds },
    type: FeedsActionTypes.SET_FEEDS,
})

export const asyncFetchFeedsAction = () => {
    return ({
    payload: null,
    type: FeedsActionTypes.ASYNC_FETCH_FEEDS,
})}

export const asyncParseFeedAction = (feedUrl: string) => {
    return ({
        payload: { feedUrl },
        type: FeedsActionTypes.ASYNC_PARSE_FEED,
    })
}
