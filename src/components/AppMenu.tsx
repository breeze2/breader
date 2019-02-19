import { Icon, Menu } from 'antd'
import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import '../styles/AppMenu.less'
import AddFeedModal from './AddFeedModal'

const MenuItem = Menu.Item
const SubMenu = Menu.SubMenu
interface InterfaceAppMenuProps {
    selectedKey: string,
    handleSelect: (e: any) => any
}
interface InterfaceAppMenuState {
    feeds: string[]
    isAddFeedModalVisible: boolean
}

class AppMenu extends Component<InterfaceAppMenuProps> {
    public state: InterfaceAppMenuState
    public constructor (props: any) {
        super(props)
        this.state = {
            feeds: [],
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
    public handleAddFeedModalOk = () => {
        this.setState({
            isAddFeedModalVisible: false,
        })
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
                        defaultSelectedKeys={['ALL_ITEMS']}
                        defaultOpenKeys={['subscriptions']}
                        mode="inline"
                        onSelect={this.props.handleSelect}
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
                        <SubMenu key="subscriptions" title={<span><Icon type="folder" /><FormattedMessage id="menuSubscriptions" /></span>}>
                            <MenuItem key="5">Option 5</MenuItem>
                            <MenuItem key="6">Option 6</MenuItem>
                            <MenuItem key="7">Option 7</MenuItem>
                            <MenuItem key="8">Option 8</MenuItem>
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
