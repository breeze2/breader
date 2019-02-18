import { Icon, Menu } from 'antd'
import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import logo from '../images/logo.png'
import '../styles/AppMenu.less'

const MenuItem = Menu.Item
const SubMenu = Menu.SubMenu
interface InterfaceMenuProps {
    selectedKey: string,
    handleSelect: (e: any) => any
}
interface InterfaceMenuState {
    feeds: string[]
}

class AppMenu extends Component<InterfaceMenuProps> {
    public render() {
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
                        <Icon type="plus" className="add-rss" />
                    </div>
                </div>
            </div>
        )
    }
}

export default AppMenu
