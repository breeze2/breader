import { Avatar, Icon, Menu, message as Message } from 'antd'
import { SelectParam } from 'antd/lib/menu'
import Immutable from 'immutable'
import React, { Component } from 'react'
import { FormattedMessage, InjectedIntlProps, injectIntl, intlShape } from 'react-intl'
import defaultFavicon from '../images/rss.png'
import { IArticle, IFeed } from '../schemas'
import '../styles/AppMenu.less'
import AddFeedModal from './AddFeedModal'

const MenuItem = Menu.Item
const SubMenu = Menu.SubMenu

export interface IAppMenuOwnProps {
}

export interface IAppMenuReduxDispatch {
    setFeedFavicon: (id: string, favicon: string) => any
    updateOnlineStatus: () => any
    asyncFetchArticles: () => Promise<IArticle[]>
    asyncFetchFeeds: () => Promise<undefined>
    asyncParseFeed: (feedUrl: string) => Promise<undefined>
    asyncSelectMenuKey: (key: string) => Promise<void>
    asyncUpdateFeeds: () => Promise<undefined>
}

export interface IAppMenuReduxState {
    feedFavicons: Immutable.Map<string, string>
    feeds: Immutable.List<IFeed>
    feedsChanges: number
    feedsUpdatedAt: number
    invalidFeedsCount: number
    isCreatingFeed: boolean
    isUpdatingFeeds: boolean
    selectedMenuKey: string
    onlineStatus: boolean
}

interface IAppMenuProps extends IAppMenuOwnProps, IAppMenuReduxDispatch, IAppMenuReduxState {
}

interface IAppMenuState {
    isAddFeedModalVisible: boolean
}

class AppMenu extends Component<IAppMenuProps & InjectedIntlProps> {
    public static propTypes: React.ValidationMap<any> = {
        intl: intlShape.isRequired,
    }
    public state: IAppMenuState
    public constructor (props: any) {
        super(props)
        this.state = {
            isAddFeedModalVisible: false,
        }
    }
    public handleAddFeedClick = () => {
        this.setState({
            isAddFeedModalVisible: true,
        })
    }
    public handleAddFeedModalCancel = () => {
        this.setState({
            isAddFeedModalVisible: false,
        })
    }
    public handleAddFeedModalOk = (feedUrl: string) => {
        this.setState({
            isAddFeedModalVisible: false,
        })
        if (feedUrl) {
            this.props.asyncParseFeed(feedUrl)
        } else {
            // TODO
        }
    }
    public handleUpdateFeedsClick = () => {
        if (this.props.isUpdatingFeeds || this.props.feedsUpdatedAt > Date.now() - 3 * 60 * 60 * 1000) {
            return Message.success(this.props.intl.formatMessage({ id: 'feedsAreUpdated' }))
        } else {
            return this.props.asyncUpdateFeeds()
        }
    }
    public handleSelect = (param: SelectParam) => {
        this.props.asyncSelectMenuKey(param.key)
    }
    public setFeedFaviconDefault = (id: string | undefined) => {
        if (id) {
            this.props.setFeedFavicon(id, defaultFavicon)
        }
        return true
    }
    public handleOnlineStatus = () => {
        this.props.updateOnlineStatus()
    }
    public componentWillMount() {
        this.props.asyncFetchFeeds()
        this.props.asyncFetchArticles()
        window.addEventListener('online', this.handleOnlineStatus)
        window.addEventListener('offline', this.handleOnlineStatus)
    }
    // public componentWillUnmount () {
    //     window.removeEventListener('online', this.handleOnlineStatus)
    //     window.removeEventListener('offline', this.handleOnlineStatus)
    // }
    public componentWillReceiveProps (props: any) {
        if (this.props.invalidFeedsCount !== props.invalidFeedsCount) {
            Message.info(this.props.intl.formatMessage({ id: 'unfoundFeed' }))
        }
        if (this.props.feedsChanges !== props.feedsChanges && props.feedsChanges > -1) {
            Message.success(this.props.intl.formatMessage({ id: 'feedsAreUpdated' }))
        }
    }
    public render () {
        const { feeds, feedFavicons, isCreatingFeed, isUpdatingFeeds, onlineStatus, selectedMenuKey } = this.props
        return (
            <div className="app-menu">
                <div className="menu-content">
                    <div className="menu-header">
                        <div className="app-logo" />
                        <p className="date-text">{new Date().toDateString()}</p>
                    </div>
                    <Menu
                        defaultSelectedKeys={[selectedMenuKey]}
                        defaultOpenKeys={['subscriptions']}
                        mode="inline"
                        onSelect={this.handleSelect}
                    >
                        <MenuItem key="ALL_ITEMS">
                            <Icon type="profile" />
                            <FormattedMessage id="menuAllItems" />
                        </MenuItem>
                        <MenuItem key="STARRED_ITEMS">
                            <Icon type="star" />
                            <FormattedMessage id="menuStarred" />
                        </MenuItem>
                        <MenuItem key="UNREAD_ITEMS">
                            <Icon type="file-text" />
                            <FormattedMessage id="menuUnread" />
                        </MenuItem>
                        <SubMenu key="subscriptions" className="feed-list" title={<span><Icon type="folder" /><FormattedMessage id="menuSubscriptions" /></span>}>
                            {feeds.map(feed => {
                                const favicon = feedFavicons.get(feed._id + '') || ''
                                return (<MenuItem key={feed._id}>
                                    <Avatar shape="square" size={22} src={favicon} onError={() => this.setFeedFaviconDefault(feed._id)}/>
                                    <span className="feed-title" title={feed.title}>{feed.title}</span>
                                </MenuItem>)
                            })}
                        </SubMenu>
                    </Menu>
                </div>
                <div className="menu-footer">
                    <div className="menu-footer-left">
                        {onlineStatus && <Icon type={isUpdatingFeeds || isCreatingFeed ? 'loading' : 'sync'} className="sync-rss" onClick={this.handleUpdateFeedsClick}/>}
                    </div>
                    {!onlineStatus && <span><Icon type="warning" theme="twoTone" twoToneColor="#faad14" /> OFFLINE</span>}
                    <div className="menu-footer-right">
                        {onlineStatus && <Icon type="plus" className="add-rss" onClick={this.handleAddFeedClick} />}
                    </div>
                    <AddFeedModal visible={this.state.isAddFeedModalVisible} onOk={this.handleAddFeedModalOk} onCancel={this.handleAddFeedModalCancel} />
                </div>
            </div>
        )
    }
}

export default injectIntl(AppMenu)
