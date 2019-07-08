import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux'
import { Dispatch } from 'redux'
import AppMenu, { IAppMenuOwnProps, IAppMenuReduxDispatch, IAppMenuReduxState } from '../components/AppMenu'
import { asyncActionDispatcher, asyncFetchArticlesAction, asyncFetchFeedsAction, asyncParseFeedAction, asyncSelectMenuKeyAction,
    asyncUpdateFeedsAction, setFeedFaviconAction, updateOnlineStatusAction } from '../redux/actions'
import { IReduxAction, IReduxState } from '../schemas'

const mapStateToProps: MapStateToProps<IAppMenuReduxState, IAppMenuOwnProps, IReduxState> = (state) => ({
    feedFavicons: state.feeds.favicons,
    feeds: state.feeds.list,
    feedsChanges: state.feeds.changes,
    feedsUpdatedAt: state.feeds.updatedAt,
    invalidFeedsCount: state.feeds.invalidCount,
    isCreatingFeed: state.feeds.isCreating,
    isUpdatingFeeds: state.feeds.isUpdating,
    onlineStatus: state.menu.onlineStatus,
    selectedMenuKey: state.menu.selectedKey,
})

const mapDispatchToProps: MapDispatchToProps<IAppMenuReduxDispatch, IAppMenuOwnProps> = (dispatch: Dispatch<IReduxAction>) => ({
    asyncFetchArticles: () => asyncActionDispatcher(dispatch, asyncFetchArticlesAction()),
    asyncFetchFeeds: () => asyncActionDispatcher(dispatch, asyncFetchFeedsAction()),
    asyncParseFeed: (feedUrl: string) => asyncActionDispatcher(dispatch, asyncParseFeedAction(feedUrl)),
    asyncSelectMenuKey: (key: string) => asyncActionDispatcher(dispatch, asyncSelectMenuKeyAction(key)),
    asyncUpdateFeeds: () => asyncActionDispatcher(dispatch, asyncUpdateFeedsAction()),
    setFeedFavicon: (id: string, favicon: string) => dispatch(setFeedFaviconAction(id, favicon)),
    updateOnlineStatus: () => dispatch(updateOnlineStatusAction()),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AppMenu)
