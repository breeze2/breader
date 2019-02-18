import { Icon, Menu as AntdMenu } from 'antd'
import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'

import '../styles/Menu.less'

const AntdSubMenu = AntdMenu.SubMenu;
interface InterfaceMenuProps {
    selectedKey: string,
    handleSelect: (e: any) => any
}
interface InterfaceMenuState {
    feeds: string[]
}

class Menu extends Component<InterfaceMenuProps> {
    public render() {
        return (
            <div className="app-menu">
                <div className="menu-content">
                    <AntdMenu
                        defaultSelectedKeys={['ALL_ITEMS']}
                        defaultOpenKeys={['subscriptions']}
                        mode="inline"
                        onSelect={this.props.handleSelect}
                    >
                        <AntdMenu.Item key="ALL_ITEMS">
                            <Icon type="profile" />
                            <FormattedMessage id="menuAllItems" />
                        </AntdMenu.Item>
                        <AntdMenu.Item key="STARRED_ITEMS">
                            <Icon type="star" />
                            <FormattedMessage id="menuStarred" />
                        </AntdMenu.Item>
                        <AntdMenu.Item key="UNREAD_ITEMS">
                            <Icon type="file-text" />
                            <FormattedMessage id="menuUnread" />
                        </AntdMenu.Item>
                        <AntdSubMenu key="subscriptions" title={<span><Icon type="folder" /><FormattedMessage id="menuSubscriptions" /></span>}>
                            <AntdMenu.Item key="5">Option 5</AntdMenu.Item>
                            <AntdMenu.Item key="6">Option 6</AntdMenu.Item>
                            <AntdMenu.Item key="7">Option 7</AntdMenu.Item>
                            <AntdMenu.Item key="8">Option 8</AntdMenu.Item>
                        </AntdSubMenu>
                    </AntdMenu>
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

export default Menu
