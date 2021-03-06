import { Avatar, Icon, Menu, message as Message } from 'antd'
import { SelectParam } from 'antd/lib/menu'
import Immutable from 'immutable'
import React, { Component } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import { FormattedMessage, injectIntl, WrappedComponentProps } from 'react-intl'
import defaultFavicon from '../images/rss.png'
import { EMenuKey, IArticle, IFeed } from '../schemas'
import AddFeedModal from './AddFeedModal'

import '../styles/AppMenu.less'

const MenuItem = Menu.Item
const SubMenu = Menu.SubMenu

export interface IAppMenuOwnProps {}

export interface IAppMenuDispatchProps {
  setFeedFavicon: (id: string, favicon: string) => any
  setIsCreatingFeed: (isCreating: boolean) => any
  setIsFetchingArticles: (isFetching: boolean) => any
  setIsUpdatingFeeds: (isUpdating: boolean) => any
  updateOnlineStatus: () => any
  asyncFetchArticles: () => Promise<IArticle[]>
  asyncFetchFeeds: () => Promise<IFeed[]>
  asyncParseFeed: (feedUrl: string) => Promise<IFeed | null>
  asyncSelectMenuKey: (key: string) => Promise<void>
  asyncUpdateFeeds: () => Promise<number>
}

export interface IAppMenuStateProps {
  feedsMap: Immutable.Map<string, IFeed>
  feeds: Immutable.List<IFeed>
  isCreatingFeed: boolean
  isUpdatingFeeds: boolean
  selectedMenuKey: string
  onlineStatus: boolean
}

export interface IAppMenuProps
  extends IAppMenuOwnProps,
    IAppMenuDispatchProps,
    IAppMenuStateProps {}

export interface IAppMenuState {
  isAddFeedModalVisible: boolean
  openedSubmenuKeys: string[]
}

export class AppMenuComponent extends Component<
  IAppMenuProps & WrappedComponentProps,
  IAppMenuState
> {
  public constructor(props: IAppMenuProps & WrappedComponentProps) {
    super(props)
    this.state = {
      isAddFeedModalVisible: false,
      openedSubmenuKeys: ['subscriptions'],
    }
  }
  public handleAddFeedClick = () => {
    this.setIsAddFeedModalVisible(true)
  }
  public handleAddFeedModalCancel = () => {
    this.setIsAddFeedModalVisible(false)
  }
  public handleAddFeedModalOk = (feedUrl: string) => {
    this.setIsAddFeedModalVisible(false)
    const { asyncParseFeed, intl, setIsCreatingFeed } = this.props
    if (feedUrl) {
      setIsCreatingFeed(true)
      asyncParseFeed(feedUrl)
        .then(() => {
          setIsCreatingFeed(false)
        })
        .catch(error => {
          setIsCreatingFeed(false)
          Message.info(intl.formatMessage({ id: 'unfoundFeed' }))
        })
    } else {
      // TODO alert wrong feed url
    }
  }
  public handleUpdateFeedsClick = () => {
    const {
      feeds,
      intl,
      isUpdatingFeeds,
      setIsUpdatingFeeds,
      asyncUpdateFeeds,
    } = this.props
    if (isUpdatingFeeds || feeds.size === 0) {
      return
    }
    setIsUpdatingFeeds(true)
    asyncUpdateFeeds()
      .then(() => {
        setIsUpdatingFeeds(false)
        Message.success(intl.formatMessage({ id: 'feedsAreUpdated' }))
      })
      .catch(() => {
        setIsUpdatingFeeds(false)
        Message.error(intl.formatMessage({ id: 'somethingWrong' }))
      })
  }
  public handleSelect = (param: SelectParam) => {
    this.props.asyncSelectMenuKey(param.key)
  }
  public setFeedFaviconDefault = (id: string) => {
    const { feedsMap, setFeedFavicon } = this.props
    if (id) {
      const ifeed = feedsMap.get(id)
      if (ifeed && ifeed.favicon !== defaultFavicon) {
        setFeedFavicon(id, defaultFavicon)
      }
    }
    return true
  }
  public setIsAddFeedModalVisible(isVisible: boolean = true) {
    this.setState({
      isAddFeedModalVisible: isVisible,
    })
  }
  public handleOnlineStatus = () => {
    this.props.updateOnlineStatus()
  }
  public handleSubscriptionsClick = () => {
    const { openedSubmenuKeys } = this.state
    const index = openedSubmenuKeys.indexOf('subscriptions')
    if (index > -1) {
      openedSubmenuKeys.splice(index, 1)
    }
    if (this.props.feeds.size === 0) {
      this.handleAddFeedClick()
      openedSubmenuKeys.push('subscriptions')
    } else if (index === -1) {
      openedSubmenuKeys.push('subscriptions')
    }
    this.setState({ openedSubmenuKeys })
  }
  public componentDidMount() {
    this.props.setIsFetchingArticles(true)
    this.props
      .asyncFetchFeeds()
      .then(this.props.asyncFetchArticles)
      .then(this.handleUpdateFeedsClick)
    window.addEventListener('online', this.handleOnlineStatus)
    window.addEventListener('offline', this.handleOnlineStatus)
  }
  public componentWillUnmount() {
    window.removeEventListener('online', this.handleOnlineStatus)
    window.removeEventListener('offline', this.handleOnlineStatus)
  }

  public render() {
    const {
      feeds,
      feedsMap,
      isCreatingFeed,
      isUpdatingFeeds,
      onlineStatus,
      selectedMenuKey,
    } = this.props
    const { openedSubmenuKeys } = this.state
    const feedsCount = feeds.size
    return (
      <div className="app-menu">
        <div className="menu-content">
          <Scrollbars autoHide>
            <div className="menu-header">
              <div className="app-logo" />
              <p className="date-text">{new Date().toDateString()}</p>
            </div>
            <Menu
              defaultSelectedKeys={[selectedMenuKey]}
              defaultOpenKeys={['subscriptions']}
              openKeys={openedSubmenuKeys}
              mode="inline"
              onSelect={this.handleSelect}>
              <MenuItem key={EMenuKey.ALL_ITEMS}>
                <Icon type="profile" />
                <FormattedMessage id="menuAllItems" />
              </MenuItem>
              <MenuItem key={EMenuKey.STARRED_ITEMS}>
                <Icon type="star" />
                <FormattedMessage id="menuStarred" />
              </MenuItem>
              <MenuItem key={EMenuKey.UNREAD_ITEMS}>
                <Icon type="file-text" />
                <FormattedMessage id="menuUnread" />
              </MenuItem>
              <SubMenu
                key="subscriptions"
                onTitleClick={this.handleSubscriptionsClick}
                className={`feed-list ${feedsCount ? '' : 'empty'}`}
                title={
                  <span>
                    <Icon type="folder" />
                    <FormattedMessage id="menuSubscriptions" />
                  </span>
                }>
                {feeds.map(feed => {
                  const ifeed = feedsMap.get(feed._id)
                  return (
                    <MenuItem key={feed._id}>
                      <Avatar
                        shape="square"
                        size={22}
                        src={ifeed ? ifeed.favicon : defaultFavicon}
                        onError={() => this.setFeedFaviconDefault(feed._id)}
                      />
                      <span className="feed-title" title={feed.title}>
                        {feed.title}
                      </span>
                    </MenuItem>
                  )
                })}
              </SubMenu>
            </Menu>
          </Scrollbars>
        </div>
        <div className="menu-footer">
          <div className="menu-footer-left">
            {onlineStatus && (
              <Icon
                type={isUpdatingFeeds || isCreatingFeed ? 'loading' : 'sync'}
                className="sync-rss"
                onClick={this.handleUpdateFeedsClick}
              />
            )}
          </div>
          {!onlineStatus && (
            <span>
              <Icon type="warning" theme="twoTone" twoToneColor="#faad14" />{' '}
              OFFLINE
            </span>
          )}
          <div className="menu-footer-right">
            {onlineStatus && (
              <Icon
                type="plus"
                className="add-rss"
                onClick={this.handleAddFeedClick}
              />
            )}
          </div>
          <AddFeedModal
            visible={this.state.isAddFeedModalVisible}
            onOk={this.handleAddFeedModalOk}
            onCancel={this.handleAddFeedModalCancel}
          />
        </div>
      </div>
    )
  }
}

export default injectIntl(AppMenuComponent)
