import InterfaceFeed from '../../schemas/InterfaceFeed'

export const FeedsActionTypes = {
    ADD_FEED: 'ADD_FEED',
    SET_FEEDS: 'SET_FEEDS',

    ASYNC_FETCH_FEEDS: 'ASYNC_FETCH_FEEDS',
    ASYNC_PARSE_FEED: 'ASYNC_PARSE_FEED',
}

export const addFeedAction = (feed: InterfaceFeed) => ({
    payload: { feed },
    type: 'ADD_FEED',
})

export const setFeedsAction = (feeds: InterfaceFeed[]) => ({
    payload: { feeds },
    type: 'SET_FEEDS',
})

export const asyncFetchFeedsAction = () => {
    return ({
    payload: null,
    type: 'ASYNC_FETCH_FEEDS',
})}

export const asyncParseFeedAction = (feedUrl: string) => {
    return ({
        payload: { feedUrl },
        type: 'ASYNC_PARSE_FEED',
    })
}
