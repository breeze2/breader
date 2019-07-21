import { Layout } from 'antd'
import React, { Component } from 'react'
import AppMenu from '../containers/AppMenu'
import ArticleList from '../containers/ArticleList'
import '../styles/AppSider.less'

const LayoutSider = Layout.Sider

class AppSider extends Component {
    public render() {
        return (
            <LayoutSider className="app-sider" width="490">
                <AppMenu />
                <ArticleList />
            </LayoutSider>
        )
    }
}

export default AppSider
