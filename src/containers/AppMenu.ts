import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux'
import { Dispatch } from 'redux'
import AppMenu, { IAppMenuOwnProps, IAppMenuReduxDispatch, IAppMenuReduxState } from '../components/AppMenu'
import { asyncFetchArticlesAction, asyncFetchFeedsAction, asyncParseFeedAction, asyncSelectMenuKeyAction,
    asyncUpdateFeedsAction, IAction, setFeedFaviconAction, setOnlineStatusAction } from '../redux/actions'
import { IState } from '../redux/reducers'

const mapStateToProps: MapStateToProps<IAppMenuReduxState, IAppMenuOwnProps, IState> = (state) => ({
    feedFavicons: state.feeds.favicons,
    feeds: state.feeds.list,
    feedsChanges: state.feeds.changes,
    feedsUpdatedAt: state.feeds.updatedAt,
    invalidFeedsCount: state.feeds.invalidCount,
    isUpdatingFeeds: state.feeds.isUpdating,
    onlineStatus: state.menu.onlineStatus,
    selectedMenuKey: state.menu.selectedKey,
})

const mapDispatchToProps: MapDispatchToProps<IAppMenuReduxDispatch, IAppMenuOwnProps> = (dispatch: Dispatch<IAction>) => ({
    asyncFetchArticles: () => dispatch(asyncFetchArticlesAction()),
    asyncFetchFeeds: () => dispatch(asyncFetchFeedsAction()),
    asyncParseFeed: (feedUrl: string) => dispatch(asyncParseFeedAction(feedUrl)),
    asyncSelectMenuKey: (key: string) => dispatch(asyncSelectMenuKeyAction(key)),
    asyncUpdateFeeds: () => dispatch(asyncUpdateFeedsAction()),
    setFeedFavicon: (id: number, favicon: string) => dispatch(setFeedFaviconAction(id, favicon)),
    setOnlineStatus: () => dispatch(setOnlineStatusAction()),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AppMenu)
