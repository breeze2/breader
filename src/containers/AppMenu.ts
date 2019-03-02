import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import AppMenu from '../components/AppMenu'
import { asyncFetchArticlesAction, asyncFetchFeedsAction, asyncParseFeedAction, asyncSelectMenuKeyAction, asyncUpdateFeedsAction, setFeedFaviconAction } from '../redux/actions'

const mapStateToProps = (store: any, props: any) => {
    return {
        feedFavicons: store.feeds.get('favicons'),
        feeds: store.feeds.get('list'),
        feedsChanges: store.feeds.get('changes'),
        feedsUpdatedAt: store.feeds.get('updatedAt'),
        invalidFeedsCount: store.feeds.get('invalidCount'),
        isUpdatingFeeds: store.feeds.get('isUpdating'),
        selectedMenuKey: store.menu.get('selectedKey'),
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>, props: any) => ({
    asyncFetchArticles: () => dispatch(asyncFetchArticlesAction()),
    asyncFetchFeeds: () => dispatch(asyncFetchFeedsAction()),
    asyncParseFeed: (feedUrl: string) => dispatch(asyncParseFeedAction(feedUrl)),
    asyncSelectMenuKey: (key: string) => dispatch(asyncSelectMenuKeyAction(key)),
    asyncUpdateFeeds: () => dispatch(asyncUpdateFeedsAction()),
    setFeedFavicon: (id: number, favicon: string) => dispatch(setFeedFaviconAction(id, favicon)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AppMenu)
