import { Avatar, Icon, Menu } from 'antd'
import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import InterfaceFeed from '../schemas/InterfaceFeed'
import '../styles/AppMenu.less'
import AddFeedModal from './AddFeedModal'

const MenuItem = Menu.Item
const SubMenu = Menu.SubMenu
interface InterfaceAppMenuProps {
    feeds: InterfaceFeed[]
    selectedKey: string
    asyncFetchArticles: () => any
    asyncFetchFeeds: () => any
    asyncParseFeed: (feedUrl: string) => any
    setMenuKey: (e: any) => any
}
interface InterfaceAppMenuState {
    isAddFeedModalVisible: boolean
}

class AppMenu extends Component<InterfaceAppMenuProps> {
    public state: InterfaceAppMenuState
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
            // Logic.createFeed(feedUrl).then((feed: any) => feed && this.props.addFeed([feed]))
            this.props.asyncParseFeed(feedUrl)
        } else {
            // TODO
        }
    }
    public handleSelect = (e: any) => {
        this.props.setMenuKey(e.key)
    }
    public componentWillMount() {
        this.props.asyncFetchFeeds()
        this.props.asyncFetchArticles()
    }
    public componentWillReceiveProps (props: any) {
        // console.log(props)
    }
    public render () {
        return (
            <div className="app-menu">
                <div className="menu-content">
                    <div className="menu-header">
                        {/* <img src={logo} alt="Breader" height="96" /> */}
                        <div className="app-logo" />
                        <p className="date-text">{new Date().toDateString()}</p>
                    </div>
                    <Menu
                        defaultSelectedKeys={[this.props.selectedKey]}
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
                            {this.props.feeds.map(feed => <MenuItem key={feed.id}>
                                {feed.favicon ? (<Avatar shape="square" size={22} src={feed.favicon} />) : (
                                    <Avatar shape="square" size={22} >{(feed.title as string).substring(0, 1)}</Avatar>
                                )}
                                <span className="feed-title" title={feed.title}>{feed.title}</span>
                            </MenuItem>)}
                        </SubMenu>
                    </Menu>
                </div>
                <div className="menu-footer">
                    <div className="menu-footer-left">
                        <Icon type="sync" className="sync-rss" />
                    </div>
                    <div className="menu-footer-right">
                        <Icon type="plus" className="add-rss" onClick={this.handleAddFeedClick} />
                    </div>
                    <AddFeedModal visible={this.state.isAddFeedModalVisible} onOk={this.handleAddFeedModalOk} onCancel={this.handleAddFeedModalCancel} />
                </div>
            </div>
        )
    }
}

export default AppMenu
