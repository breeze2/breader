import { Layout } from 'antd'
import React, { Component } from 'react'
import ArticleView from '../containers/ArticleView'
import '../styles/AppContent.less'

const LayoutContent = Layout.Content

class AppContent extends Component {
  public render() {
    return (
      <LayoutContent className="app-content">
        <ArticleView />
      </LayoutContent>
    )
  }
}

export default AppContent
