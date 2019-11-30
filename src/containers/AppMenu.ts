import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux'
import { Dispatch } from 'redux'
import AppMenu, {
  IAppMenuDispatchProps,
  IAppMenuOwnProps,
  IAppMenuStateProps,
} from '../components/AppMenu'
import {
  asyncActionDispatcher,
  asyncFetchArticlesAction,
  asyncFetchFeedsAction,
  asyncParseFeedAction,
  asyncSelectMenuKeyAction,
  asyncUpdateFeedsAction,
  setFeedFaviconAction,
  setIsCreatingFeedAction,
  setIsFetchingArticlesAction,
  setIsUpdatingFeedsAction,
  updateOnlineStatusAction,
} from '../redux/actions'
import { IReduxAction, IReduxState } from '../schemas'

const mapStateToProps: MapStateToProps<
  IAppMenuStateProps,
  IAppMenuOwnProps,
  IReduxState
> = state => ({
  feeds: state.feeds.list,
  feedsMap: state.feeds.map,
  isCreatingFeed: state.feeds.isCreating,
  isUpdatingFeeds: state.feeds.isUpdating,
  onlineStatus: state.menu.onlineStatus,
  selectedMenuKey: state.menu.selectedKey,
})

const mapDispatchToProps: MapDispatchToProps<
  IAppMenuDispatchProps,
  IAppMenuOwnProps
> = (dispatch: Dispatch<IReduxAction>) => ({
  asyncFetchArticles: () =>
    asyncActionDispatcher(dispatch, asyncFetchArticlesAction()),
  asyncFetchFeeds: () =>
    asyncActionDispatcher(dispatch, asyncFetchFeedsAction()),
  asyncParseFeed: (feedUrl: string) =>
    asyncActionDispatcher(dispatch, asyncParseFeedAction(feedUrl)),
  asyncSelectMenuKey: (key: string) =>
    asyncActionDispatcher(dispatch, asyncSelectMenuKeyAction(key)),
  asyncUpdateFeeds: () =>
    asyncActionDispatcher(dispatch, asyncUpdateFeedsAction()),
  setFeedFavicon: (id: string, favicon: string) =>
    dispatch(setFeedFaviconAction(id, favicon)),
  setIsCreatingFeed: (isCreating: boolean) =>
    dispatch(setIsCreatingFeedAction(isCreating)),
  setIsFetchingArticles: (isFetching: boolean) =>
    dispatch(setIsFetchingArticlesAction(isFetching)),
  setIsUpdatingFeeds: (isUpdating: boolean) =>
    dispatch(setIsUpdatingFeedsAction(isUpdating)),
  updateOnlineStatus: () => dispatch(updateOnlineStatusAction()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppMenu)
