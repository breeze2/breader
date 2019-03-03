import { Layout } from 'antd'
import React, { Component } from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import RootReducer from './redux/reducers'
import RootSaga from './redux/sagas'

import AppContent from './layouts/AppContent'
import AppSider from './layouts/AppSider'
import { IntlProvider, messages } from './locales'
import './styles/App.less'

const sagaMiddleware = createSagaMiddleware()
// const store = createStore(RootReducer, applyMiddleware(sagaMiddleware))

// import { composeWithDevTools } from 'redux-devtools-extension'
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || (window as any).compose
const store = composeEnhancers ? createStore(RootReducer, composeEnhancers(applyMiddleware(sagaMiddleware))) :
  createStore(RootReducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(RootSaga)

class App extends Component {
  public state = {
    locale: 'en-US',
  }
  public constructor(props: any) {
    super(props)
  }
  public render() {
    return (
      <ReduxProvider store={store}>
        <IntlProvider locale={this.state.locale} messages={messages[this.state.locale]}>
          <div className="app">
            <Layout>
              <AppSider />
              <AppContent />
              {/* <Layout></Layout> */}
            </Layout>
          </div>
        </IntlProvider>
      </ReduxProvider>
    )
  }
}

export default App
