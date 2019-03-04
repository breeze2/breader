import { Layout } from 'antd'
import { List, Map } from 'immutable'
import React, { Component } from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'

import SettingsModal from './containers/SettingsModal'

import RootReducer from './redux/reducers'
import RootSaga from './redux/sagas'

import AppContent from './layouts/AppContent'
import AppSider from './layouts/AppSider'
import { IntlProvider, messages } from './locales'
import './styles/App.less'
import Utils from './utils';

const sagaMiddleware = createSagaMiddleware()
// const store = createStore(RootReducer, applyMiddleware(sagaMiddleware))

// import { composeWithDevTools } from 'redux-devtools-extension'
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || (window as any).compose
const store = composeEnhancers ? createStore(RootReducer, composeEnhancers(applyMiddleware(sagaMiddleware))) :
  createStore(RootReducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(RootSaga)

interface InterfaceAppState {
  isSettingsModalVisible: boolean
  language: string
}

class App extends Component {
  public state: InterfaceAppState
  public constructor(props: any) {
    super(props)
    this.state = {
      isSettingsModalVisible: false,
      language: store.getState().menu.get('language'),
    }
  }
  public componentWillMount() {
    Utils.ipcRenderer.on('PREFERENCES_MODAL', (event: any, args: any) => {
      if (args === 'OPEN') {
        this.setState({
          isSettingsModalVisible: true,
        })
      }
    })
  }
  public handleSettingsModalClose = (e: any) => {
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
        <IntlProvider locale={this.state.language} messages={messages[this.state.language]}>
          <div className="app">
            <Layout>
              <AppSider />
              <AppContent />
              {/* <Layout></Layout> */}
              <SettingsModal visible={this.state.isSettingsModalVisible}
                onLanguageChange={this.handleLanguageChange}
              onClose={this.handleSettingsModalClose} />
            </Layout>
          </div>
        </IntlProvider>
      </ReduxProvider>
    )
  }
}

export default App
