import { Input, Modal } from 'antd'
import Immutable from 'immutable'
import React, { Component } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import { injectIntl, WrappedComponentProps } from 'react-intl'
import ArticleItem from '../containers/ArticleItem'
import { IArticle } from '../schemas'
import Utils from '../utils'

import '../styles/SearchArticleModal.less'

const Search = Input.Search

export interface ISearchArticleModalOwnProps {
  visible: boolean
  onCancel: (e: any) => any
  onItemChoose: (index: number) => any
}

export interface ISearchArticleModalReduxDispatch {}

export interface ISearchArticleModalReduxState {
  articles: Immutable.List<IArticle>
}

export interface ISearchArticleModalProps
  extends ISearchArticleModalOwnProps,
    ISearchArticleModalReduxDispatch,
    ISearchArticleModalReduxState {}

export interface ISearchArticleModalState {
  readonly keywords: string
  readonly matchedArticles: Immutable.List<IArticle>
}

class SearchArticleModal extends Component<
  ISearchArticleModalProps & WrappedComponentProps,
  ISearchArticleModalState
> {
  public searchArticles: (keywords: string[]) => any
  public constructor(props: ISearchArticleModalProps & WrappedComponentProps) {
    super(props)
    this.state = {
      keywords: '',
      matchedArticles: Immutable.List<IArticle>([]),
    }
    this.searchArticles = Utils.debounce(this._searchArticles, 100)
    this.searchArticles = this.searchArticles.bind(this)
  }
  public handleSubmit = () => {
    const keywords = this.state.keywords
    const matched = this._searchArticles(keywords.split(' '))
    if (keywords) {
      this.setState({
        matchedArticles: matched,
      })
    }
  }
  public handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      keywords: e.target.value,
    })
  }
  public componentDidUpdate() {
    if (this.props.visible) {
      setImmediate(() => {
        const input: HTMLInputElement | null = document.querySelector(
          '.search-article-keywords input'
        )
        if (input) {
          input.focus()
        }
      })
    }
  }
  public render() {
    return (
      <Modal
        className="search-article-modal"
        closable={false}
        width={376}
        style={{ top: 42 }}
        visible={this.props.visible}
        footer={null}
        onCancel={this.props.onCancel}>
        <Search
          className="search-article-keywords"
          placeholder={this.props.intl.formatMessage({ id: 'keywords' })}
          value={this.state.keywords}
          onChange={this.handleChange}
          onSearch={this.handleSubmit}
        />
        <div className="matched-list">
          <Scrollbars autoHide autoHeight autoHeightMax={'calc(100vh - 164px)'}>
            {this.state.matchedArticles.map((article: IArticle) => (
              <div
                key={article._id}
                onClick={() =>
                  this.props.onItemChoose(article.index as number)
                }>
                <ArticleItem
                  author={article.author}
                  guid={article._id}
                  time={article.time}
                  feedId={article.feedId}
                  title={article.title}
                  summary={article.summary}
                  className="item-is-unread"
                />
              </div>
            ))}
          </Scrollbars>
        </div>
      </Modal>
    )
  }
  private _searchArticles(keys: string[]) {
    const len = keys.length
    if (len < 1) {
      return Immutable.List<IArticle>([])
    }
    const matched = this.props.articles.filter(
      (article: IArticle, index: number) => {
        const str = article.title + article.author + article.summary
        let i = 0
        for (; i < len; i++) {
          if (str.indexOf(keys[i]) === -1) {
            break
          }
        }
        if (i === len) {
          article.index = index
          return true
        }
        return false
      }
    )
    return matched
  }
}

export default injectIntl(SearchArticleModal)
