import Enzyme from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import React from 'react'
import { IntlProvider } from 'react-intl'
import { Provider as ReduxProvider } from 'react-redux'
import TestRenderer from 'react-test-renderer'
import ArticleView from '../containers/ArticleView'
import store from '../redux'
import { setCurrentArticleAction } from '../redux/actions'
import { article, intlProviderProps } from './MockData'

Enzyme.configure({ adapter: new EnzymeAdapter() })

describe('ArticleView Testing', () => {
    const dispatch = store.dispatch

    it('dom testing', () => {
        const wrapper = Enzyme.mount(
            <ReduxProvider store={store}>
                <IntlProvider {...intlProviderProps}>
                    <ArticleView />
                </IntlProvider>
            </ReduxProvider>
        )
        dispatch(setCurrentArticleAction(article))
        wrapper.update()
    })

    // it('snapshot testing', () => {
    //     const renderer = TestRenderer.create(
    //         <ReduxProvider store={store}>
    //             <IntlProvider {...intlProviderProps}>
    //                 <ArticleView />
    //             </IntlProvider>
    //         </ReduxProvider>
    //     )
    //     const tree = renderer.toJSON()
    //     expect(tree).toMatchSnapshot()
    // })
})
