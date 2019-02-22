import InterfaceFeed from '../schemas/InterfaceFeed'

export interface InterfaceFeedsAction {
    feeds: InterfaceFeed[]
    type: string
}

export const FeedsActionTypes = {
    ADD_FEEDS: 'ADD_FEEDS',
    SET_FEEDS: 'SET_FEEDS',
}

export const addFeedsAction = (feeds: InterfaceFeed[]): InterfaceFeedsAction => ({
    feeds,
    type: 'ADD_FEEDS',
})

export const setFeedsAction = (feeds: InterfaceFeed[]): InterfaceFeedsAction => ({
    feeds,
    type: 'SET_FEEDS',
})
