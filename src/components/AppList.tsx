import { Icon, Modal, Radio } from 'antd'
import Immutable from 'immutable'
import React, { Component } from 'react'
import { InjectedIntlProps, injectIntl } from 'react-intl'
import SearchArticleModal from '../containers/SearchArticleModal'
import VirtualList from '../containers/VirtualList'
import { IArticle } from '../schemas'
import '../styles/AppList.less'

const RadioButton = Radio.Button
const RadioGroup = Radio.Group
const Confirm = Modal.confirm

export interface IAppListOwnProps {
}

export interface IAppListReduxState {
    articlesFilter: string
    selectedMenuKey: string
    articles: Immutable.List<IArticle>
}

export interface IAppListReduxDispatch {
    asyncFilterArticles: (filter: string) => Promise<void>
    asyncSetAllArticlesRead: (ids: string[]) => Promise<number>
}

interface IAppListProps extends IAppListOwnProps, IAppListReduxState, IAppListReduxDispatch {
}

interface IAppListState {
    isSearchArticleModalVisible: boolean
    chooseItemIndex: number
}

class AppList extends Component<IAppListProps & InjectedIntlProps, IAppListState> {
    public constructor(props: IAppListProps & InjectedIntlProps) {
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
            <div className="app-list">
                <div className="list-header">
                    {
                        this.props.selectedMenuKey !== 'ALL_ITEMS' &&
                        this.props.selectedMenuKey !== 'STARRED_ITEMS' &&
                        this.props.selectedMenuKey !== 'UNREAD_ITEMS' &&
                        <div className="list-header-right">
                            <RadioGroup defaultValue={this.props.articlesFilter} size="small" onChange={this.handleRadioChange}>
                                <RadioButton value="STARRED"><Icon type="star" theme="filled" /></RadioButton>
                                <RadioButton value="UNREAD"><Icon type="file-text" theme="filled" /></RadioButton>
                                <RadioButton value="ALL"><Icon type="profile" theme="filled" /></RadioButton>
                            </RadioGroup>
                        </div>
                    }
                </div>
                <div className="list-content">
                    <VirtualList scrollToIndex={this.state.chooseItemIndex} />
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
                <SearchArticleModal visible={this.state.isSearchArticleModalVisible}
                    onCancel={this.handleSearchCancel}
                    onItemChoose={this.handleSearchItemChoose} />
            </div>
        )
    }
}

export default injectIntl(AppList)
