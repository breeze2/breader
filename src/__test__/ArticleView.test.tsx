import Enzyme from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import EnzymeToJson from 'enzyme-to-json'
import Immutable from 'immutable'
import React from 'react'
import { IntlProvider } from 'react-intl'
import ArticleView, { IArticleViewProps } from '../components/ArticleView'
import { IArticle, IFeed } from '../schemas'
import { article, intlProviderProps } from './MockData'

Enzyme.configure({ adapter: new EnzymeAdapter() })

describe('ArticleView Testing', () => {
  const mockProps: IArticleViewProps = {
    articles: Immutable.List<IArticle>([]),
    asyncStarArticle: jest.fn(),
    currentArticle: null,
    feedsMap: Immutable.Map<IFeed>({}),
    isUpdatingCurrentArticle: false,
  }

  it('dom testing', () => {
    const wrapper = Enzyme.mount(<ArticleView {...mockProps} />, {
      wrappingComponent: IntlProvider,
      wrappingComponentProps: intlProviderProps,
    })
    wrapper.setProps({
      currentArticle: article,
    })
    wrapper.update()
  })

  it('snapshot testing', () => {
    const wrapper = Enzyme.mount(<ArticleView {...mockProps} />, {
      wrappingComponent: IntlProvider,
      wrappingComponentProps: intlProviderProps,
    })
    const tree = EnzymeToJson(wrapper)
    expect(tree).toMatchSnapshot()
  })
})
