import InterfaceFeed from '../../schemas/InterfaceFeed'
import { FeedsActionTypes } from '../actions/feeds'

interface InterfaceFeedFavicons {
    [key: number]: string
}

const feedFavicons = (state: InterfaceFeedFavicons = {}, action: any) => {
    let favicons: InterfaceFeedFavicons = {}
    switch (action.type) {
        case FeedsActionTypes.ADD_FEED:
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
