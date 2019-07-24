import Enzyme from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import React from 'react'
import { IntlProvider } from 'react-intl'
import { Provider as ReduxProvider } from 'react-redux'
import TestRenderer from 'react-test-renderer'
import ArticleItem from '../containers/ArticleItem'
import ArticleList from '../containers/ArticleList'
import store from '../redux'
import { setArticlesAction } from '../redux/actions'
import { article, intlProviderProps } from './MockData'

Enzyme.configure({ adapter: new EnzymeAdapter() })

describe('ArticleList Testing', () => {
    const dispatch = store.dispatch

    it('dom testing', () => {
        const wrapper = Enzyme.shallow(
            <ReduxProvider store={store}>
                <IntlProvider {...intlProviderProps}>
                    <ArticleList />
                </IntlProvider>
            </ReduxProvider>
        )
        dispatch(setArticlesAction([article]))
        const instance = wrapper.find(ArticleList)
        // instance.find('.check-all').simulate('click')
        // instance.find('.search-item').simulate('click')
    })

    it('snapshot testing', () => {
        const renderer = TestRenderer.create(
            <ReduxProvider store={store}>
                <IntlProvider {...intlProviderProps}>
                    <ArticleList />
                </IntlProvider>
            </ReduxProvider>
        )
        const tree = renderer.toJSON()
        expect(tree).toMatchSnapshot()
    })
})
