import Immutable, { List, Map } from 'immutable'
import { IFeed, IReduxAction } from '../../schemas'
import { FeedsActionTypes } from '../actions'

export interface IFeedsState {
    changes: number
    favicons: Immutable.Map<string, string>
    invalidCount: number
    isUpdating: boolean
    list: Immutable.List<IFeed>
    updatedAt: number
}

const initialFeedsState = Immutable.Record<IFeedsState>({
    changes: -1,
    favicons: Immutable.Map<string>({}),
    invalidCount: 0,
    isUpdating: false,
    list: Immutable.List<IFeed>([]),
    updatedAt: 0,
})()

Object.defineProperty(window, 'Immutable', { value: Immutable})

const feeds = (state = initialFeedsState, action: IReduxAction) => {
    switch (action.type) {
        case FeedsActionTypes.SET_FEEDS_UPDATED_AT:
            return state.set('updatedAt', action.payload.updatedAt)

        case FeedsActionTypes.SET_FEEDS_CHANGES:
            return state.set('changes', action.payload.changes)

        case FeedsActionTypes.SET_IS_UPDATING_FEEDS:
            return state.set('isUpdating', action.payload.isUpdating)

        case FeedsActionTypes.TIPS_PARSE_INVALID_FEED:
            return state.set('invalidCount', state.get('invalidCount') + 1)

        case FeedsActionTypes.SET_FEED_FAVICON:
            return state.update('favicons', (favicons: Map<string, string>) => {
                return favicons.set(action.payload.feedId + '', action.payload.favicon)
            })

        case FeedsActionTypes.ADD_FEED:
            const newFeed = action.payload.feed
            return state.update('favicons', (favicons: Map<string, string>) => {
                return favicons.set(newFeed.id + '', newFeed.favicon)
            }).update('list', (list: List<IFeed>) => {
                return list.push(newFeed)
            })
        case FeedsActionTypes.SET_FEEDS:
            const newFavicons: any = {}
            const newFeeds = action.payload.feeds
            newFeeds.forEach((feed: IFeed) => {
                if (feed._id && feed.favicon) {
                    newFavicons[feed._id] = feed.favicon
                }
            })
            return state.set('favicons', Map<string, string>(newFavicons))
                .set('list', List<IFeed>(newFeeds))
        default:
            return state
    }
}

export default feeds
