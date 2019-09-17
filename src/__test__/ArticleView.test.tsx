import Enzyme from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import EnzymeToJson from 'enzyme-to-json'
import Immutable from 'immutable'
import React from 'react'
import { IntlProvider } from 'react-intl'
import ArticleView, { IArticleViewProps } from '../components/ArticleView'
import { IArticle, IFeed } from '../schemas'
import { article, feed, intlProviderProps } from './MockData'

Enzyme.configure({ adapter: new EnzymeAdapter() })

describe('ArticleView Testing', () => {
  const mockProps: IArticleViewProps = {
    articles: Immutable.List<IArticle>([article]),
    asyncStarArticle: jest.fn(),
    currentArticle: article,
    feedsMap: Immutable.Map<IFeed>({ [feed._id]: feed }),
    isUpdatingCurrentArticle: false,
  }

  it('snapshot testing', () => {
    const wrapper = Enzyme.mount(<ArticleView {...mockProps} />, {
      wrappingComponent: IntlProvider,
      wrappingComponentProps: intlProviderProps,
    })
    const tree = EnzymeToJson(wrapper)
    expect(tree).toMatchSnapshot()
  })
})
