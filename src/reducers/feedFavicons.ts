import { FeedsActionTypes, InterfaceFeedsAction } from '../actions/feeds'
import InterfaceFeed from '../schemas/InterfaceFeed'

interface InterfaceFeedFavicons {
    [key: number]: string
}

const feedFavicons = (state: InterfaceFeedFavicons = {}, action: InterfaceFeedsAction) => {
    let favicons: InterfaceFeedFavicons = {}
    switch (action.type) {
        case FeedsActionTypes.ADD_FEEDS:
            favicons = {}
            action.feeds.forEach((feed: InterfaceFeed) => {
                if (feed.id && feed.favicon) {
                    favicons[feed.id] = feed.favicon
                }
            })
            return {
                ...state,
                ...favicons,
            }
        case FeedsActionTypes.SET_FEEDS:
            favicons = {}
            action.feeds.forEach((feed: InterfaceFeed) => {
                if (feed.id && feed.favicon) {
                    favicons[feed.id] = feed.favicon
                }
            })
            return {
                ...favicons,
            }
        default:
            return state
    }
}

export default feedFavicons
