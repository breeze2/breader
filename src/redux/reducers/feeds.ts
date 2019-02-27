import Immutable, { List, Map } from 'immutable'
import InterfaceFeed from '../../schemas/InterfaceFeed'
import { FeedsActionTypes, InterfaceAction } from '../actions'

const initialFeedsState = Immutable.fromJS({
    favicons: {},
    list: [],
})

Object.defineProperty(window, 'Immutable', { value: Immutable})

const feeds = (state = initialFeedsState, action: InterfaceAction) => {
    switch (action.type) {
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
