import Enzyme from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import EnzymeToJson from 'enzyme-to-json'
import Immutable from 'immutable'
import React from 'react'
import { IntlProvider } from 'react-intl'
import { Provider as ReduxProvider } from 'react-redux'
import { IArticleItemProps } from '../components/ArticleItem'
import ArticleItem from '../containers/ArticleItem'
import store from '../redux'
import { IFeed } from '../schemas'
import { intlProviderProps } from './MockData'

Enzyme.configure({ adapter: new EnzymeAdapter() })

describe('ArticleItem Testing', () => {
    const propsMock: IArticleItemProps = {
        author: 'Author',
        feedId: 'feedId',
        feedsMap: Immutable.Map<IFeed>({}),
        guid: 'guid',
        key: 1,
        summary: 'summary',
        time: 1563726737427,
        title: 'Title',
    }

    it('dom testing', () => {
        const component = Enzyme.shallow(
            <ReduxProvider store={store}>
                <IntlProvider {...intlProviderProps}>
                    <ArticleItem {...propsMock} />
                </IntlProvider>
            </ReduxProvider>
        )
    })

    it('snapshot testing', () => {
        const component = Enzyme.mount(
            <ReduxProvider store={store}>
                <IntlProvider {...intlProviderProps}>
                    <ArticleItem {...propsMock} />
                </IntlProvider>
            </ReduxProvider>
        )
        const tree = EnzymeToJson(component)
        expect(tree).toMatchSnapshot()
    })
})
