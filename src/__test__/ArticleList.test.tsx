import Enzyme from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import EnzymeToJson from 'enzyme-to-json'
import React from 'react'
import { IntlProvider } from 'react-intl'
import { Provider as ReduxProvider } from 'react-redux'

import ArticleList from '../containers/ArticleList'
import store from '../redux'
import { intlProviderProps } from './MockData'

Enzyme.configure({ adapter: new EnzymeAdapter() })

describe('ArticleList Testing', () => {
  it('snapshot testing', () => {
    const wrapper = Enzyme.mount(
      <ReduxProvider store={store}>
        <IntlProvider {...intlProviderProps}>
          <ArticleList />
        </IntlProvider>
      </ReduxProvider>
    )
    const tree = EnzymeToJson(wrapper)
    expect(tree).toMatchSnapshot()
  })
})
