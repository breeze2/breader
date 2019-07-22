import Enzyme from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import EnzymeToJson from 'enzyme-to-json'
import Immutable from 'immutable'
import React from 'react'
import { IntlProvider } from 'react-intl'
import { Provider as ReduxProvider } from 'react-redux'
import { IArticleViewProps } from '../components/ArticleView'
import ArticleView from '../containers/ArticleView'
import store from '../redux'
import { IArticle, IFeed } from '../schemas'
import { articleProps, intlProviderProps } from './MockData'

Enzyme.configure({ adapter: new EnzymeAdapter() })

describe('ArticleView Testing', () => {

    const propsMock: IArticleViewProps = {
        articles: Immutable.List<IArticle>([articleProps]),
        asyncStarArticle: jest.fn(),
        currentArticle: articleProps,
        feedsMap: Immutable.Map<IFeed>({}),
        isUpdatingCurrentArticle: false,
    }

    it('dom testing', () => {
        const component = Enzyme.shallow(
            <ReduxProvider store={store}>
                <IntlProvider {...intlProviderProps}>
                    <ArticleView {...propsMock} />
                </IntlProvider>
            </ReduxProvider>
        )
    })

    it('snapshot testing', () => {
        const component = Enzyme.mount(
            <ReduxProvider store={store}>
                <IntlProvider {...intlProviderProps}>
                    <ArticleView {...propsMock} />
                </IntlProvider>
            </ReduxProvider>
        )
        const tree = EnzymeToJson(component)
        expect(tree).toMatchSnapshot()
    })
})
