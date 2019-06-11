import { Input, List as AntdList, message as Message, Modal } from 'antd'
import { List, Map } from 'immutable'
import React, { Component } from 'react'
import { FormattedMessage, InjectedIntlProps, injectIntl, intlShape } from 'react-intl'
import ListItem from '../containers/ListItem'
import IArticle from '../schemas/IArticle'
import Utils from '../utils'

import '../styles/SearchArticleModal.less'

const Search = Input.Search

export interface ISearchArticleModalOwnProps {
    visible: boolean
    onCancel: (e: any) => any
    onItemChoose: (index: number) => any
}

export interface ISearchArticleModalReduxDispatch {
}

export interface ISearchArticleModalReduxState {
    articles: List<IArticle>
}

interface ISearchArticleModalProps extends ISearchArticleModalOwnProps, ISearchArticleModalReduxDispatch, ISearchArticleModalReduxState {
}

interface ISearchArticleModalState {
    readonly keywords: string
    readonly matchedArticles: List<IArticle>
}

class SearchArticleModal extends Component<ISearchArticleModalProps & InjectedIntlProps, {}> {
    public static propTypes: React.ValidationMap<any> = {
        intl: intlShape.isRequired,
    }
    public state: ISearchArticleModalState
    public searchArticles: (keywords: string[]) => any
    public constructor(props: any) {
        super(props)
        this.state = {
            keywords: '',
            matchedArticles: List<IArticle>([]),
        }
        this.searchArticles = Utils.debounce(this._searchArticles, 100)
        this.searchArticles = this.searchArticles.bind(this)
    }
    public handleSubmit = (e: any) => {
        const keywords = this.state.keywords
        const matched = this._searchArticles(keywords.split(' '))
        if (keywords) {
            this.setState({
                matchedArticles: matched,
            })
        }
    }
    public handleChange = (e: any) => {
        this.setState({
            keywords: e.target.value,
        })
    }
    public componentDidUpdate() {
        if (this.props.visible) {
            setTimeout(() => {
                const input: any = document.querySelector('.search-article-keywords')
                if (input) {
                    input.focus()
                }
            }, 200)
        }
    }
    public render() {
        return (
            <Modal className="search-article-modal"
                closable={false}
                width={376}
                style={{top: 42}}
                visible={this.props.visible}
                footer={null}
                onCancel={this.props.onCancel}
            >
                <Search className="search-article-keywords"
                    placeholder={this.props.intl.formatMessage({ id: 'keywords' })}
                    value={this.state.keywords}
                    onChange={this.handleChange}
                    onSearch={this.handleSubmit} />
                <div className="matched-list">
                    {this.state.matchedArticles.map((article: IArticle) => (
                        <div key={article.id} onClick={() => this.props.onItemChoose(article.index as number)}>
                            <ListItem author={article.author}
                                guid={article.guid}
                                feedTitle={article.feed_title}
                                time={''}
                                inid={article.id}
                                feedId={article.feed_id}
                                title={article.title}
                                summary={article.summary}
                                className='item-is-unread'
                            />
                        </div>
                    ))}
                </div>
            </Modal>
        )
    }
    private _searchArticles(keys: string[]) {
        const len = keys.length
        if (len < 1) {
            return List<IArticle>([])
        }
        const matched = this.props.articles.filter((article: IArticle, index: number) => {
            const str = article.title + article.author + article.summary
            let i = 0
            for (; i < len; i++) {
                if (str.indexOf(keys[i]) === -1) {
                    break
                }
            }
            if (i === len) {
                article.index = index
                return article
            }
        })
        return matched
    }
}

export default injectIntl(SearchArticleModal)
