import Enzyme from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import EnzymeToJson from 'enzyme-to-json'
import Immutable from 'immutable'
import React from 'react'
import { IntlProvider } from 'react-intl'
import { Provider as ReduxProvider } from 'react-redux'
import { IArticleListProps } from '../components/ArticleList'
import ArticleList from '../containers/ArticleList'
import store from '../redux'
import { IArticle } from '../schemas'
import { intlProviderProps } from './PropsMock'

Enzyme.configure({ adapter: new EnzymeAdapter() })

describe('ArticleList Testing', () => {
    const propsMock: IArticleListProps = {
        articles: Immutable.List<IArticle>([]),
        articlesFilter: 'ALL',
        asyncFilterArticles: jest.fn(),
        asyncSetAllArticlesRead: jest.fn(),
        isFetchingArticles: false,
        selectedMenuKey: 'ALL_ITEMS',
    }

    it('dom testing', () => {
        const component = Enzyme.shallow(
            <ReduxProvider store={store}>
                <IntlProvider {...intlProviderProps}>
                    <ArticleList {...propsMock} />
                </IntlProvider>
            </ReduxProvider>
        )
    })

    it('snapshot testing', () => {
        const component = Enzyme.mount(
            <ReduxProvider store={store}>
                <IntlProvider {...intlProviderProps}>
                    <ArticleList {...propsMock} />
                </IntlProvider>
            </ReduxProvider>
        )
        const tree = EnzymeToJson(component)
        expect(tree).toMatchSnapshot()
    })
})
