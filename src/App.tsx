import { Layout } from 'antd'
import { ipcRenderer } from 'electron'
import React, { Component } from 'react'
import { IntlProvider } from 'react-intl'
import { Provider as ReduxProvider } from 'react-redux'

import SettingsModal from './containers/SettingsModal'

import AppContent from './layouts/AppContent'
import AppSider from './layouts/AppSider'
import { messages } from './locales'
import './styles/App.less'

import store from './redux'

export interface IAppState {
  isSettingsModalVisible: boolean
  language: string
}

export interface IAppProps {}

class App extends Component<IAppProps, IAppState> {
  public state: IAppState
  public constructor(props: IAppProps) {
    super(props)
    this.state = {
      isSettingsModalVisible: false,
      language: store.getState().menu.get('language'),
    }
  }
  public componentDidMount() {
    ipcRenderer.on('PREFERENCES_MODAL', (event: any, args: any) => {
      if (args === 'OPEN') {
        this.setState({
          isSettingsModalVisible: true,
        })
      }
    })
  }
  public handleSettingsModalClose = () => {
    this.setState({
      isSettingsModalVisible: false,
    })
  }
  public handleLanguageChange = (language: string) => {
    this.setState({
      language,
    })
  }
  public render() {
    return (
      <ReduxProvider store={store}>
        <IntlProvider
          locale={this.state.language}
          messages={messages[this.state.language]}>
          <div className="app">
            <Layout>
              <AppSider />
              <AppContent />
              {/* <Layout></Layout> */}
              <SettingsModal
                visible={this.state.isSettingsModalVisible}
                onLanguageChange={this.handleLanguageChange}
                onClose={this.handleSettingsModalClose}
              />
            </Layout>
          </div>
        </IntlProvider>
      </ReduxProvider>
    )
  }
}

export default App
