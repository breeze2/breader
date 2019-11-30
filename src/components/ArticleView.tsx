import { Empty, Icon } from 'antd'
import hljs from 'highlight.js'
import Immutable from 'immutable'
import React, { PureComponent, RefObject } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import { injectIntl, WrappedComponentProps } from 'react-intl'
import greyLogo from '../images/grey-logo.png'
import { IArticle, IFeed } from '../schemas'
import ArticleViewSkeleton from '../skeletons/ArticleViewSkeleton'
import Utils from '../utils'
import WebviewDrawer from './WebviewDrawer'

import 'highlight.js/styles/solarized-light.css'
import '../styles/ArticleView.less'

export interface IArticleViewOwnProps {}

export interface IArticleViewStateProps {
  currentArticle: IArticle | null
  articles: Immutable.List<IArticle>
  feedsMap: Immutable.Map<string, IFeed>
  isUpdatingCurrentArticle: boolean
}

export interface IArticleViewDispatchProps {
  asyncStarArticle: (articleId: string, isStarred: boolean) => Promise<void>
}

export interface IArticleViewProps
  extends IArticleViewOwnProps,
    IArticleViewDispatchProps,
    IArticleViewStateProps {}

export interface IArticleViewState {
  hoverLink: string
  isWebviewDrawerVisible: boolean
  webviewDrawerSrc: string
  isStarredsMap: { [_id: string]: boolean }
}

export class ArticleViewComponent extends PureComponent<
  IArticleViewProps & WrappedComponentProps,
  IArticleViewState
> {
  public static getDerivedStateFromProps(
    nextProps: IArticleViewProps,
    prevState: IArticleViewState
  ) {
    const currentArticle = nextProps.currentArticle
    const isStarredsMap = prevState.isStarredsMap
    if (currentArticle && isStarredsMap[currentArticle._id] === undefined) {
      isStarredsMap[currentArticle._id] = currentArticle.isStarred
      return {
        isStarredsMap: { ...isStarredsMap },
      }
    }
    return null
  }
  private _articleContentIsAppended: boolean
  private _articleContentElement: HTMLDivElement
  private _articleContentLinks: string[]
  private _scrollbar: RefObject<Scrollbars>
  public constructor(props: IArticleViewProps & WrappedComponentProps) {
    super(props)
    this.state = {
      hoverLink: '',
      isStarredsMap: {},
      isWebviewDrawerVisible: false,
      webviewDrawerSrc: '',
    }
    this._articleContentIsAppended = false
    this._articleContentElement = document.createElement('div')
    this._articleContentLinks = []
    this._scrollbar = React.createRef<Scrollbars>()
  }
  public getSnapshotBeforeUpdate(prevProps: IArticleViewProps) {
    const props = this.props
    const currentArticle = props.currentArticle
    if (currentArticle && currentArticle !== prevProps.currentArticle) {
      this._parseArticleContent(currentArticle.description)
    }
    return null
  }
  public componentDidUpdate() {
    if (this._articleContentIsAppended) {
      return
    }
    this._articleContentIsAppended = true
    const div = document.querySelector('.article-content.real-content')
    if (div && this._articleContentElement) {
      while (div.firstChild) {
        div.removeChild(div.firstChild)
      }
      div.appendChild(this._articleContentElement)
      if (this._scrollbar.current) {
        this._scrollbar.current.scrollToTop()
      }
    }
    setImmediate(() => {
      document.querySelectorAll('.article-content pre code').forEach(block => {
        hljs.highlightBlock(block)
      })
    })
  }
  public handleStarIconClick = () => {
    const currentArticle = this.props.currentArticle
    const isStarredsMap = this.state.isStarredsMap
    if (currentArticle) {
      const articleId = currentArticle._id
      isStarredsMap[articleId] = !isStarredsMap[articleId]
      this.setState({
        isStarredsMap: { ...isStarredsMap },
      })
      this.props.asyncStarArticle(articleId, isStarredsMap[articleId])
    }
  }
  public handleContentClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault()
    const link = this.state.hoverLink
    if (link) {
      this.setState({
        isWebviewDrawerVisible: true,
        webviewDrawerSrc: link,
      })
    }
  }
  public handelWebviewClose = () => {
    this.setState({ isWebviewDrawerVisible: false })
  }
  public handleMouseLeave = () => {
    this.setState({ hoverLink: '' })
  }
  public handleMouseOverContent = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const target = e.target as HTMLDivElement
    const div = target.closest('.article-info') as HTMLDivElement
    let link = ''
    if (target.tagName === 'A' && target.dataset.index) {
      const index = parseInt(target.dataset.index, 10)
      link = this._articleContentLinks[index]
    } else if (div && div.dataset.link) {
      link = div.dataset.link
    }
    this.setState({ hoverLink: link })
  }
  public render() {
    let viewContent: JSX.Element
    let starIcon: JSX.Element | null

    if (this.props.currentArticle) {
      const { currentArticle, feedsMap, intl } = this.props
      const feed = feedsMap.get(currentArticle.feedId)
      viewContent = (
        <Scrollbars ref={this._scrollbar}>
          <div
            className="view-content"
            onMouseLeave={this.handleMouseLeave}
            onMouseOver={this.handleMouseOverContent}
            onClick={this.handleContentClick}>
            <div className="article-info" data-link={currentArticle.link}>
              <div className="article-date">
                <p>{Utils.timeToDateTimeString(currentArticle.time)}</p>
              </div>
              <div className="article-title">
                <h1>{currentArticle.title}</h1>
              </div>
              <div className="article-author">
                <p>
                  {currentArticle.author} @{' '}
                  {feed ? feed.title : intl.formatMessage({ id: 'unknown' })}
                </p>
              </div>
            </div>
            <div className="article-content real-content" />
          </div>
        </Scrollbars>
      )
      if (this.state.isStarredsMap[currentArticle._id as string]) {
        starIcon = (
          <Icon type="star" theme="filled" onClick={this.handleStarIconClick} />
        )
      } else {
        starIcon = (
          <Icon
            type="star"
            theme="outlined"
            onClick={this.handleStarIconClick}
          />
        )
      }
    } else {
      viewContent = (
        <div className="view-content">
          <div style={{ marginTop: '128px' }}>
            <Empty image={greyLogo} description={' '} />
          </div>
        </div>
      )
      starIcon = null
    }
    return (
      <div className="article-view">
        <div className="view-header">
          <div className="view-header-right">{starIcon}</div>
        </div>
        {viewContent}
        <div className="view-footer">
          <p>{this.state.hoverLink ? 'Open ' + this.state.hoverLink : ''}</p>
        </div>
        <WebviewDrawer
          width={'calc(100vw - 490px)'}
          onClose={this.handelWebviewClose}
          visible={this.state.isWebviewDrawerVisible}
          src={this.state.webviewDrawerSrc}
        />
        <ArticleViewSkeleton
          style={{
            display: this.props.isUpdatingCurrentArticle ? 'block' : 'none',
          }}
        />
      </div>
    )
  }
  private _parseArticleContent(content: string) {
    const div = document.createElement('div')
    div.innerHTML = content
    const scripts = div.querySelectorAll('script')
    scripts.forEach(script => {
      script.remove()
    })

    const links = div.querySelectorAll('a')
    this._articleContentLinks = []
    links.forEach((link, i) => {
      this._articleContentLinks.push(link.href)
      link.dataset.index = `${i}`
      link.href = `#link${i}`
    })

    const frames = div.querySelectorAll('iframe')
    frames.forEach(frame => {
      frame.setAttribute('sandbox', '')
    })
    this._articleContentElement = div
    this._articleContentIsAppended = false
  }
}

export default injectIntl(ArticleViewComponent)
