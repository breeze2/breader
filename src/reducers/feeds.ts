import { FeedsActionTypes, InterfaceFeedsAction } from '../actions/feeds'
import InterfaceFeed from '../schemas/InterfaceFeed'

const feeds = (state: InterfaceFeed[] = [], action: InterfaceFeedsAction) => {
    switch (action.type) {
        case FeedsActionTypes.ADD_FEEDS:
            console.log(action.feeds)
            return state.concat(action.feeds)
        case FeedsActionTypes.SET_FEEDS:
            return action.feeds
        default:
            return state
    }
}

export default feeds
