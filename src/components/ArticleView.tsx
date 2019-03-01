import { Empty } from 'antd'
import { List, Map } from 'immutable'
import React, { Component, PureComponent } from 'react'
import greyLogo from '../images/grey-logo.png'
import InterfaceArticle from '../schemas/InterfaceArticle'
import '../styles/ArticleView.less'

interface InterfaceArticleViewProps {
    articleContent: string
    articleIndex: number
    articles: List<InterfaceArticle>
}

interface InterfaceArticleViewState {
    hoverLink: string
}

class ArticleView extends PureComponent<InterfaceArticleViewProps> {
    public state: InterfaceArticleViewState
    private _articleContentIsAppended: boolean
    private _articleContentElement: HTMLDivElement
    private _articleContentLinks: string[]
    public constructor(props: any) {
        super(props)
        this.state = {
            hoverLink: ''
        }
        this._articleContentIsAppended = false
        this._articleContentElement = document.createElement('div')
        this._articleContentLinks = []
    }
    public componentWillReceiveProps(props: any) {
        if (props.articleContent && this.props.articleContent !== props.articleContent) {
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
    public handleMouseLeave = () => {
        this.setState({
            hoverLink: '',
        })
    }
    public handleMouseOverInfo = (link: string) => {
        if (link) {
            this.setState({
                hoverLink: link,
            })
        }
    }
    public handleMouseOverContent = (e: any) => {
        const target = e.target
        if (target.tagName === 'A' && target.dataset.index) {
            const link = this._articleContentLinks[target.dataset.index]
            this.setState({
                hoverLink: link,
            })
        } else {
            this.setState({
                hoverLink: '',
            })
        }
    }
    public render() {
        let viewContent: any
        if (this.props.articles && this.props.articleIndex > -1) {
            const article: any = this.props.articles.get(this.props.articleIndex)
            viewContent = (
                <div className="view-content" onMouseLeave={this.handleMouseLeave}>
                    <div className="article-info" onMouseOver={() => this.handleMouseOverInfo(article.link)}>
                        <div className="article-date"><p>{article.date}</p></div>
                        <div className="article-title"><h1>{article.title}</h1></div>
                        <div className="article-author"><p>{article.author} @ {article.feed_title}</p></div>
                    </div>
                    <div className="article-content" onMouseOver={this.handleMouseOverContent}>{' '}</div>
                </div>
            )
        } else {
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
                <div className="view-header">{''}</div>
                {viewContent}
                <div className="view-footer"><p>{this.state.hoverLink}</p></div>
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
            link.href = 'javascript:void;'
        })
        this._articleContentElement = div
        this._articleContentIsAppended = false
    }
}

export default ArticleView
