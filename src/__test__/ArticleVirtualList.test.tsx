import Enzyme from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import EnzymeToJson from 'enzyme-to-json'
import Immutable from 'immutable'
import React from 'react'
import { IntlProvider } from 'react-intl'
import ArticleVirtualList, {
  IArticleVirtualListProps,
} from '../components/ArticleVirtualList'
import { EMenuKey, IArticle } from '../schemas'
import { article, intlProviderProps } from './MockData'

Enzyme.configure({ adapter: new EnzymeAdapter() })

describe('ArticleVirtualList Testing', () => {
  const mockProps: IArticleVirtualListProps = {
    articles: Immutable.List<IArticle>([article]),
    currentArticle: null,
    scrollToIndex: 0,
    selectArticle: jest.fn(),
    selectedMenuKey: EMenuKey.ALL_ITEMS,
  }

  it('dom testing', () => {
    const wrapper = Enzyme.mount(<ArticleVirtualList {...mockProps} />, {
      wrappingComponent: IntlProvider,
      wrappingComponentProps: intlProviderProps,
    })
    wrapper.setProps({
      currentArticle: article,
    })
    wrapper.update()
  })

  it('snapshot testing', () => {
    const wrapper = Enzyme.mount(<ArticleVirtualList {...mockProps} />, {
      wrappingComponent: IntlProvider,
      wrappingComponentProps: intlProviderProps,
    })
    const tree = EnzymeToJson(wrapper)
    expect(tree).toMatchSnapshot()
  })
})
