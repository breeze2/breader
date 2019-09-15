import Enzyme from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import Immutable from 'immutable'
import React from 'react'
import { WrappedComponentProps } from 'react-intl'
import App, { IAppProps, IAppState } from '../App'
import {
  AppMenuComponent,
  IAppMenuProps,
  IAppMenuState,
} from '../components/AppMenu'
import {
  ArticleListComponent,
  IArticleListProps,
  IArticleListState,
} from '../components/ArticleList'
import {
  ArticleViewComponent,
  IArticleViewProps,
  IArticleViewState,
} from '../components/ArticleView'
import {
  ISearchArticleModalProps,
  ISearchArticleModalState,
  SearchArticleModalComponent,
} from '../components/SearchArticleModal'
import ArticleItem from '../containers/ArticleItem'
import store from '../redux'
import {
  setArticlesAction,
  setCurrentArticleAction,
  setFeedsAction,
} from '../redux/actions'
import { IArticle } from '../schemas'
import { article, domNode, feed } from './MockData'

Enzyme.configure({ adapter: new EnzymeAdapter() })

describe('App Testing', () => {
  jest.useFakeTimers()
  const wrapper = Enzyme.mount<React.Component, IAppProps, IAppState>(<App />, {
    attachTo: domNode,
  })
  wrapper.setState({
    isSettingsModalVisible: true,
  })
  wrapper.setState({
    language: 'zh-CN',
  })
  store.dispatch(setFeedsAction([feed]))
  store.dispatch(setArticlesAction([article]))
  store.dispatch(setCurrentArticleAction(article))

  it('dom testing', () => {
    expect(wrapper.state().isSettingsModalVisible).toBe(true)
    expect(wrapper.state().language).toBe('zh-CN')
  })

  it('app menu testing', () => {
    const appMenu = wrapper.find(AppMenuComponent) as Enzyme.ReactWrapper<
      IAppMenuProps & WrappedComponentProps,
      IAppMenuState,
      AppMenuComponent
    >
    appMenu.instance().handleUpdateFeedsClick()
    appMenu.instance().handleAddFeedClick()
    appMenu.instance().handleAddFeedModalCancel()
    appMenu.instance().handleAddFeedModalOk(feed._id)
    appMenu.instance().handleOnlineStatus()
    appMenu.instance().handleSelect({ key: 'STARRED_ITEMS' } as any)
  })

  it('article list testing', () => {
    const event: any = {}
    const articleList = wrapper.find(
      ArticleListComponent
    ) as Enzyme.ReactWrapper<
      IArticleListProps & WrappedComponentProps,
      IArticleListState,
      ArticleListComponent
    >
    articleList.find('i.check-all').simulate('click')
    articleList.find('i.search-item').simulate('click')
    articleList.instance().handleSearchItemChoose(0)
    articleList.instance().handleCheckClick(event)
    articleList.instance().handleSearchCancel()
    articleList.instance().handleSearchClick()
    articleList
      .find('.article-item')
      .first()
      .simulate('click')

    const searchModal = wrapper.find(
      SearchArticleModalComponent
    ) as Enzyme.ReactWrapper<
      ISearchArticleModalProps & WrappedComponentProps,
      ISearchArticleModalState,
      SearchArticleModalComponent
    >
    searchModal
      .find('input')
      .simulate('change', { target: { value: 'article title' } })
    searchModal.find('input').simulate('change', { target: { value: '' } })
    searchModal.setState(
      {
        matchedArticles: Immutable.List<IArticle>([article]),
      },
      () => {
        wrapper
          .find(ArticleItem)
          .find('div')
          .first()
          .simulate('click')
      }
    )
  })

  it('article view testing', () => {
    const articleView = wrapper.find(
      ArticleViewComponent
    ) as Enzyme.ReactWrapper<
      IArticleViewProps & WrappedComponentProps,
      IArticleViewState,
      ArticleViewComponent
    >
    articleView
      .find('.view-content')
      .first()
      .simulate('mouseOver')
    articleView.instance().handleStarIconClick()
  })
})
