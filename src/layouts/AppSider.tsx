import { Layout } from 'antd'
import React, { Component } from 'react'
// import AppMenu from '../components/AppMenu'
import AppList from '../containers/AppList'
import AppMenu from '../containers/AppMenu'
import '../styles/AppSider.less'

const LayoutSider = Layout.Sider

class AppSider extends Component {
    public render() {
        return (
            <LayoutSider className="app-sider" width="490">
                <AppMenu />
                <AppList />
            </LayoutSider>
        )
    }
}

export default AppSider
