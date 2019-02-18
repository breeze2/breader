import { Layout } from 'antd'
import React, { Component } from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { createStore } from 'redux'
import RootReducer from './reducers'

import AppSider from './layouts/AppSider'
import { IntlProvider, messages } from './locales'
import './styles/App.less'

const store = createStore(RootReducer)

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
