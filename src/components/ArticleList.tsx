import { Icon, Modal, Radio } from 'antd'
import Immutable from 'immutable'
import React, { Component } from 'react'
import { InjectedIntlProps, injectIntl } from 'react-intl'
import ArticleVirtualList from '../containers/ArticleVirtualList'
import SearchArticleModal from '../containers/SearchArticleModal'
import { IArticle, MenuKeyEnum } from '../schemas'
import ArticleListSkeleton from '../skeletons/ArticleListSkeleton'

import '../styles/ArticleList.less'

const RadioButton = Radio.Button
const RadioGroup = Radio.Group
const Confirm = Modal.confirm

export interface IArticleListOwnProps {
}

export interface IArticleListReduxState {
    articles: Immutable.List<IArticle>
    articlesFilter: string
    isFetchingArticles: boolean
    selectedMenuKey: string
}

export interface IArticleListReduxDispatch {
    asyncFilterArticles: (filter: string) => Promise<void>
    asyncSetAllArticlesRead: (ids: string[]) => Promise<number>
}

interface IArticleListProps extends IArticleListOwnProps, IArticleListReduxState, IArticleListReduxDispatch {
}

interface IArticleListState {
    isSearchArticleModalVisible: boolean
    chooseItemIndex: number
}

class ArticleList extends Component<IArticleListProps & InjectedIntlProps, IArticleListState> {
    public constructor(props: IArticleListProps & InjectedIntlProps) {
        super(props)
        this.state = {
            chooseItemIndex: -1,
            isSearchArticleModalVisible: false,
        }
    }
    public handleRadioChange = (e: any) => {
        const target = e.target
        this.props.asyncFilterArticles(target.value)
    }
    public handleSearchClick = () => {
        this.setState({
            isSearchArticleModalVisible: true,
        })
    }
    public handleSearchCancel = () => {
        this.setState({
            isSearchArticleModalVisible: false,
        })
    }
    public handleCheckClick = (e: any) => {
        Confirm({
            onOk: () => {
                const ids = this.props.articles.filter(article => article.isUnread)
                .map(article => article._id).toArray()
                this.props.asyncSetAllArticlesRead(ids)
            },
            title: (this.props.intl.formatMessage({ id: 'doYouWantSetAllArticlesBeRead' })),
        })
    }
    public handleSearchItemChoose = (index: number) => {
        this.setState({
            isSearchArticleModalVisible: false,
        })
        if (index > -1 && index !== this.state.chooseItemIndex) {
            this.setState({
                chooseItemIndex: index,
            })
        }
    }

    public render() {
        return (
            <div className="article-list">
                <div className="list-header">
                    {!(this.props.selectedMenuKey in MenuKeyEnum) &&
                    <div className="list-header-right">
                        <RadioGroup defaultValue={this.props.articlesFilter} size="small" onChange={this.handleRadioChange}>
                            <RadioButton value="STARRED"><Icon type="star" theme="filled" /></RadioButton>
                            <RadioButton value="UNREAD"><Icon type="file-text" theme="filled" /></RadioButton>
                            <RadioButton value="ALL"><Icon type="profile" theme="filled" /></RadioButton>
                        </RadioGroup>
                    </div>}
                </div>
                <div className="list-content">
                    <ArticleVirtualList scrollToIndex={this.state.chooseItemIndex} />
                </div>
                <div className="list-footer">
                    <div className="list-footer-left">
                        <Icon type="check-circle" theme="filled" className="check-all" onClick={this.handleCheckClick} />
                    </div>
                    <div className="list-footer-right">
                        <Icon type="search" className="search-item" onClick={this.handleSearchClick} />
                        {/* <Icon type="right" className="show-content" /> */}
                    </div>
                </div>
                <ArticleListSkeleton row={8} style={{
                    display: this.props.isFetchingArticles ? 'block' : 'none',
                }} />
                <SearchArticleModal visible={this.state.isSearchArticleModalVisible}
                    onCancel={this.handleSearchCancel}
                    onItemChoose={this.handleSearchItemChoose} />
            </div>
        )
    }
}

export default injectIntl(ArticleList)
