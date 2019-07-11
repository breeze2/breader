import { Empty, Icon } from 'antd'
import Immutable from 'immutable'
import React, { Component, PureComponent } from 'react'
import { InjectedIntlProps, injectIntl } from 'react-intl'
import greyLogo from '../images/grey-logo.png'
import { IArticle, IFeed } from '../schemas'
import Utils from '../utils'
import WebviewDrawer from './WebviewDrawer'

import '../styles/ArticleView.less'

export interface IArticleViewOwnProps {
}

export interface IArticleViewReduxState {
    currentArticle: IArticle | null
    articles: Immutable.List<IArticle>
    feedsMap: Immutable.Map<string, IFeed>
}

export interface IArticleViewReduxDispatch {
    asyncStarArticle: (articleId: string, isStarred: boolean) => Promise<void>
}

interface IArticleViewProps extends IArticleViewOwnProps, IArticleViewReduxDispatch, IArticleViewReduxState {
}

interface IArticleViewState {
    hoverLink: string
    isWebviewDrawerVisible: boolean
    webviewDrawerSrc: string,
    isStarredsMap: {[_id: string]: boolean},
}

class ArticleView extends PureComponent<IArticleViewProps & InjectedIntlProps> {
    public state: IArticleViewState
    private _articleContentIsAppended: boolean
    private _articleContentElement: HTMLDivElement
    private _articleContentLinks: string[]
    public constructor(props: IArticleViewProps & InjectedIntlProps) {
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
    }
    public componentWillReceiveProps(props: IArticleViewProps) {
        const currentArticle = props.currentArticle
        const isStarredsMap = this.state.isStarredsMap
        if (currentArticle && currentArticle !== this.props.currentArticle) {
            this._parseArticleContent(currentArticle.description)
            if (isStarredsMap[currentArticle._id] === undefined) {
                isStarredsMap[currentArticle._id] = currentArticle.isStarred
                this.setState({
                    isStarredsMap: {...isStarredsMap},
                })
            }
        }
    }
    public componentDidUpdate() {
        if (this._articleContentIsAppended) {
            return
        }
        this._articleContentIsAppended = true
        const div = document.querySelector('.article-content')
        if (div && this._articleContentElement) {
            while (div.firstChild) {
                div.removeChild(div.firstChild);
            }
            div.appendChild(this._articleContentElement)
            const view = div.closest('.view-content')
            if (view) {
                view.scrollTo(0, 0)
            }
        }
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
    public handleContentClick = (e: any) => {
        const link = this.state.hoverLink
        if (link) {
            this.setState({
                isWebviewDrawerVisible: true,
                webviewDrawerSrc: link,
            })
        }
    }
    public handelWebviewClose = (e: any) => {
        this.setState({ isWebviewDrawerVisible: false })
    }
    public handleMouseLeave = () => {
        this.setState({hoverLink: ''})
    }
    public handleMouseOverInfo = (link: string) => {
        if (link) {
            this.setState({hoverLink: link})
        }
    }
    public handleMouseOverContent = (e: any) => {
        const target = e.target
        if (target.tagName === 'A' && target.dataset.index) {
            const link = this._articleContentLinks[target.dataset.index]
            this.setState({hoverLink: link})
        } else {
            this.setState({hoverLink: ''})
        }
    }
    public render() {
        let viewContent: any
        let starIcon: any

        if (this.props.currentArticle) {
            const article = this.props.currentArticle
            const feedsMap = this.props.feedsMap
            const intl = this.props.intl
            const feed = feedsMap.get(article.feedId)
            viewContent = (
                <div className="view-content" onMouseLeave={this.handleMouseLeave} onClick={this.handleContentClick}>
                    <div className="article-info" onMouseOver={() => this.handleMouseOverInfo(article.link)}>
                        <div className="article-date"><p>{Utils.timeToDateTimeString(article.time)}</p></div>
                        <div className="article-title"><h1>{article.title}</h1></div>
                        <div className="article-author">
                            <p>{article.author} @ {feed ? feed.title : intl.formatMessage({id: 'unknown'})}</p>
                        </div>
                    </div>
                    <div className="article-content" onMouseOver={this.handleMouseOverContent}>{' '}</div>
                </div>
            )
            if (this.state.isStarredsMap[(article._id as string)]) {
                starIcon = (<Icon type="star" theme="filled"
                    onClick={this.handleStarIconClick} />)
            } else {
                starIcon = (<Icon type="star" theme="outlined"
                    onClick={this.handleStarIconClick} />)
            }
        } else {
            viewContent = (
                <div className="view-content">
                    <div style={{'marginTop': '128px'}}>
                        <Empty image={greyLogo} description={' '} />
                    </div>
                </div>
            )
            starIcon = null
        }
        return (
            <div className="article-view" >
                <div className="view-header">
                    <div className="view-header-right">
                        {starIcon}
                    </div>
                </div>
                {viewContent}
                <div className="view-footer"><p>{this.state.hoverLink ? 'Open ' + this.state.hoverLink : ''}</p></div>
                <WebviewDrawer width={'calc(100vw - 490px)'} onClose={this.handelWebviewClose} visible={this.state.isWebviewDrawerVisible} src={this.state.webviewDrawerSrc} />
            </div>
        )
    }
    private _parseArticleContent(content: string) {
        const div = document.createElement('div')
        div.innerHTML = content
        const scripts = div.querySelectorAll('scripts')
        scripts.forEach((script) => {
            script.remove()
        })

        const links = div.querySelectorAll('a')
        this._articleContentLinks = []
        links.forEach((link, i) => {
            this._articleContentLinks.push(link.href)
            link.dataset.index = i + ''
            link.href = 'javascript:void(0);'
        })

        const frames = div.querySelectorAll('iframe')
        frames.forEach((frame) => {
            frame.setAttribute('sandbox', '')
        })
        this._articleContentElement = div
        this._articleContentIsAppended = false
    }
}

export default injectIntl(ArticleView)
