import Immutable, { List, Map } from 'immutable'
import InterfaceFeed from '../../schemas/InterfaceFeed'
import { FeedsActionTypes, InterfaceAction } from '../actions'

const initialFeedsState = Immutable.fromJS({
    changes: -1,
    favicons: {},
    invalidCount: 0,
    isUpdating: false,
    list: [],
    updatedAt: 0,
})

Object.defineProperty(window, 'Immutable', { value: Immutable})

const feeds = (state = initialFeedsState, action: InterfaceAction) => {
    switch (action.type) {
        case FeedsActionTypes.SET_FEEDS_UPDATED_AT:
            return state.set('updatedAt', action.payload.updatedAt)
        case FeedsActionTypes.SET_FEEDS_CHANGES:
            return state.set('changes', action.payload.changes)
        case FeedsActionTypes.SET_IS_UPDATING_FEEDS:
            return state.set('isUpdating', action.payload.isUpdating)
        case FeedsActionTypes.TIPS_PARSE_INVALID_FEED:
            return state.set('invalidCount', state.get('invalidCount') + 1)
        case FeedsActionTypes.ADD_FEED:
            const newFeed = action.payload.feed
            return state.update('favicons', (favicons: Map<number, string>) => {
                return favicons.set(newFeed.id, newFeed)
            }).update('list', (list: List<InterfaceFeed>) => {
                return list.push(newFeed)
            })
        case FeedsActionTypes.SET_FEEDS:
            const newFavicons: any = {}
            const newFeeds = action.payload.feeds
            newFeeds.forEach((feed: InterfaceFeed) => {
                if (feed.id && feed.favicon) {
                    newFavicons[feed.id] = feed.favicon
                }
            })
            return state.set('favicons', Map<string, string>(newFavicons))
                .set('list', List<InterfaceFeed>(newFeeds))
        default:
            return state
    }
}

export default feeds
