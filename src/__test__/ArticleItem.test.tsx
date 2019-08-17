import Enzyme from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import EnzymeToJson from 'enzyme-to-json'
import Immutable from 'immutable'
import React from 'react'
import { IntlProvider } from 'react-intl'
import ArticleItem, { IArticleItemProps } from '../components/ArticleItem'
import { IFeed } from '../schemas'
import { feed, intlProviderProps } from './MockData'

Enzyme.configure({ adapter: new EnzymeAdapter() })

describe('ArticleItem Testing', () => {
  const mockProps: IArticleItemProps = {
    author: 'Author',
    feedId: feed._id,
    feedsMap: Immutable.Map<IFeed>({ [feed._id]: feed }),
    guid: 'guid',
    key: 1,
    summary: 'Summary',
    time: 1563726737427,
    title: 'Title',
  }

  it('dom testing', () => {
    const wrapper = Enzyme.mount(<ArticleItem {...mockProps} />, {
      wrappingComponent: IntlProvider,
      wrappingComponentProps: intlProviderProps,
    })
    const porps = wrapper.props() as IArticleItemProps
    expect(porps.author).toBe('Author')
    expect(porps.guid).toBe('guid')
  })

  it('snapshot testing', () => {
    const wrapper = Enzyme.mount(<ArticleItem {...mockProps} />, {
      wrappingComponent: IntlProvider,
      wrappingComponentProps: intlProviderProps,
    })
    const tree = EnzymeToJson(wrapper)
    expect(tree).toMatchSnapshot()
  })
})
