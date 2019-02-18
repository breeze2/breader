import { Layout } from 'antd'
import React, { Component } from 'react'
// import AppMenu from '../components/AppMenu'
import AppMenu from '../containers/AppMenu'
import '../styles/AppSider.less'
// import List from './List'

const LayoutSider = Layout.Sider

class AppSider extends Component {
    public render() {
        return (
            <LayoutSider className="app-sider" width="490">
                <AppMenu />
                {/* <List /> */}
            </LayoutSider>
        )
    }
}

export default AppSider
