import { Input, Modal } from 'antd'
import Immutable from 'immutable'
import React, { PureComponent } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import { FormattedMessage, injectIntl, WrappedComponentProps } from 'react-intl'
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

export interface ISearchArticleModalDispatchProps {}

export interface ISearchArticleModalStateProps {
  articles: Immutable.List<IArticle>
}

export interface ISearchArticleModalProps
  extends ISearchArticleModalOwnProps,
    ISearchArticleModalDispatchProps,
    ISearchArticleModalStateProps {}

export interface ISearchArticleModalState {
  readonly keywords: string
  readonly matchedArticles: Immutable.List<IArticle>
}

export class SearchArticleModalComponent extends PureComponent<
  ISearchArticleModalProps & WrappedComponentProps,
  ISearchArticleModalState
> {
  public searchArticles: (keywords: string) => void
  public constructor(props: ISearchArticleModalProps & WrappedComponentProps) {
    super(props)
    this.state = {
      keywords: '',
      matchedArticles: Immutable.List<IArticle>([]),
    }
    this.searchArticles = Utils.debounce(this._searchArticles, 600)
  }
  public handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keywords = e.target.value
    this.setState({ keywords })
    this.searchArticles(keywords)
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
    const { keywords, matchedArticles } = this.state
    const { intl, onCancel, visible } = this.props
    return (
      <Modal
        className="search-article-modal"
        closable={false}
        width={376}
        style={{ top: Utils.getModalTop(42) }}
        visible={visible}
        footer={null}
        onCancel={onCancel}>
        <Search
          className="search-article-keywords"
          placeholder={intl.formatMessage({ id: 'keywords' })}
          value={keywords}
          onChange={this.handleChange}
        />
        <div className="matched-list">
          <Scrollbars
            autoHide
            autoHeight
            autoHeightMax={`calc(${Utils.getClientHightForCalc()} - 164px)`}>
            {matchedArticles.map((article: IArticle) => (
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
          {!matchedArticles.size && (
            <p className="empty-list">
              <FormattedMessage id={keywords ? 'noMatched' : 'inputKeywords'} />
            </p>
          )}
        </div>
      </Modal>
    )
  }
  private _searchArticles = (keywords: string) => {
    const keys = keywords
      .split(' ')
      .map(key => key.trim())
      .filter(key => !!key)
    const len = keys.length
    let matched
    if (len < 1) {
      matched = Immutable.List<IArticle>([])
    } else {
      matched = this.props.articles.filter(
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
    }
    this.setState({
      matchedArticles: matched,
    })
  }
}

export default injectIntl(SearchArticleModalComponent)
