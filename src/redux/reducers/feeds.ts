import Immutable from 'immutable'
import { IFeed, IFeedsState, IIFeedsState, IReduxAction } from '../../schemas'
import {
    FeedsActionTypes,
    IAddFeedPayload,
    ISetFeedFaviconPayload,
    ISetFeedsPayload,
} from '../actions'

const initialFeedsState = Immutable.Record<IFeedsState>({
    isCreating: false,
    isUpdating: false,
    list: Immutable.List<IFeed>([]),
    map: Immutable.Map<IFeed>({}),
})()

Object.defineProperty(window, 'Immutable', { value: Immutable})

const feedsReducer = (state = initialFeedsState, action: IReduxAction) => {
    const payload = action.payload
    switch (action.type) {
        case FeedsActionTypes.SET_IS_UPDATING_FEEDS:
            return state.set('isUpdating', action.payload.isUpdating)

        case FeedsActionTypes.SET_IS_CREATING_FEED:
            return state.set('isCreating', action.payload.isCreating)

        case FeedsActionTypes.SET_FEED_FAVICON:
            return handleSetFeedFavicon(state, payload)

        case FeedsActionTypes.ADD_FEED:
            return handleAddFeed(state, payload)

        case FeedsActionTypes.SET_FEEDS:
            return handleSetFeeds(state, payload);

        default:
            return state
    }
}

function handleSetFeedFavicon(state: IIFeedsState, payload: ISetFeedFaviconPayload) {
    return state.update('map', (map: Immutable.Map<string, IFeed>) => {
        const feed = map.get(payload.feedId)
        if (feed) {
            feed.favicon = payload.favicon
            return map.set(payload.feedId, feed)
        } else {
            return map
        }
    })
}

function handleAddFeed(state: IIFeedsState, payload: IAddFeedPayload) {
    const feed: IFeed = payload.feed
    return state.update('map', (map: Immutable.Map<string, IFeed>) => {
        return map.set(feed._id, feed)
    }).update('list', (list: Immutable.List<IFeed>) => {
        return list.push(feed)
    })
}

function handleSetFeeds(state: IIFeedsState, payload: ISetFeedsPayload) {
    const feeds: IFeed[] = payload.feeds
    const map: {[_id: string]: IFeed} = {}
    feeds.forEach((feed: IFeed) => {
        map[feed._id] = feed
    })
    return state.set('list', Immutable.List(feeds)).set('map', Immutable.Map(map))
}

export default feedsReducer
