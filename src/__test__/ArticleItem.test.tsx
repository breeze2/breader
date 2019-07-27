import Enzyme from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import EnzymeToJson from 'enzyme-to-json'
import React from 'react'
import { IntlProvider } from 'react-intl'
import { Provider as ReduxProvider } from 'react-redux'
import TestRenderer from 'react-test-renderer'
import { IArticleItemOwnProps } from '../components/ArticleItem'
import ArticleItem from '../containers/ArticleItem'
import store from '../redux'
import { intlProviderProps } from './MockData'

Enzyme.configure({ adapter: new EnzymeAdapter() })

describe('ArticleItem Testing', () => {
    const propsMock: IArticleItemOwnProps = {
        author: 'Author',
        feedId: 'feedId',
        guid: 'guid',
        key: 1,
        summary: 'summary',
        time: 1563726737427,
        title: 'Title',
    }

    it('dom testing', () => {
        const wrapper = Enzyme.shallow(
            <ReduxProvider store={store}>
                <IntlProvider {...intlProviderProps}>
                    <ArticleItem {...propsMock} />
                </IntlProvider>
            </ReduxProvider>
        )
    })

    // it('snapshot testing', () => {
    //     const renderer = TestRenderer.create(
    //         <ReduxProvider store={store}>
    //             <IntlProvider {...intlProviderProps}>
    //                 <ArticleItem {...propsMock} />
    //             </IntlProvider>
    //         </ReduxProvider>
    //     )
    //     const tree = renderer.toJSON()
    //     expect(tree).toMatchSnapshot()
    // })
})
