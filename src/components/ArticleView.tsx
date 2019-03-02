import { Empty, Icon } from 'antd'
import { List, Map } from 'immutable'
import React, { Component, PureComponent } from 'react'
import greyLogo from '../images/grey-logo.png'
import InterfaceArticle from '../schemas/InterfaceArticle'
import '../styles/ArticleView.less'
import WebviewDrawer from './WebviewDrawer'

interface InterfaceArticleViewProps {
    articleContent: string
    articleIndex: number
    articleId: number
    articles: List<InterfaceArticle>
}

interface InterfaceArticleViewState {
    hoverLink: string
    isWebviewDrawerVisible: boolean
    webviewDrawerSrc: string,
}

class ArticleView extends PureComponent<InterfaceArticleViewProps> {
    public state: InterfaceArticleViewState
    private _articleContentIsAppended: boolean
    private _articleContentElement: HTMLDivElement
    private _articleContentLinks: string[]
    public constructor(props: any) {
        super(props)
        this.state = {
            hoverLink: '',
            isWebviewDrawerVisible: false,
            webviewDrawerSrc: '',
        }
        this._articleContentIsAppended = false
        this._articleContentElement = document.createElement('div')
        this._articleContentLinks = []
    }
    public componentWillReceiveProps(props: any) {
        if (props.articleContent) {
            this._parseArticleContent(props.articleContent)
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
        if (this.props.articles && this.props.articles.size && this.props.articleIndex > -1) {
            const article: any = this.props.articles.get(this.props.articleIndex)
            if (article && article.id === this.props.articleId) {
                viewContent = (
                    <div className="view-content" onMouseLeave={this.handleMouseLeave} onClick={this.handleContentClick}>
                        <div className="article-info" onMouseOver={() => this.handleMouseOverInfo(article.link)}>
                            <div className="article-date"><p>{article.date}</p></div>
                            <div className="article-title"><h1>{article.title}</h1></div>
                            <div className="article-author"><p>{article.author} @ {article.feed_title}</p></div>
                        </div>
                        <div className="article-content" onMouseOver={this.handleMouseOverContent}>{' '}</div>
                    </div>
                )
            }
        }
        if (!viewContent) {
            viewContent = (
                <div className="view-content">
                    <div style={{'marginTop': '128px'}}>
                        <Empty image={greyLogo} description={' '} />
                    </div>
                </div>
            )
        }
        return (
            <div className="article-view" >
                <div className="view-header">
                    <div className="view-header-right">
                        <Icon type="star" onClick={this.handleStarIconClick} />
                    </div>
                </div>
                {viewContent}
                <div className="view-footer"><p>{this.state.hoverLink}</p></div>
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
        this._articleContentElement = div
        this._articleContentIsAppended = false
    }
}

export default ArticleView
