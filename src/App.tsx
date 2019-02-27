import { Layout } from 'antd'
import React, { Component } from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import RootReducer from './redux/reducers'
import RootSaga from './redux/sagas'

import AppSider from './layouts/AppSider'
import { IntlProvider, messages } from './locales'
import './styles/App.less'

// import { composeWithDevTools } from 'redux-devtools-extension'
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || (window as any).compose
const sagaMiddleware = createSagaMiddleware()
const store = createStore(RootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)))

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
              {/* <Layout></Layout> */}
            </Layout>
          </div>
        </IntlProvider>
      </ReduxProvider>
    )
  }
}

export default App
