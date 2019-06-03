import { Icon, message as Message, Modal, Radio } from 'antd'
import React, { Component } from 'react'
import { FormattedMessage, InjectedIntlProps, injectIntl, intlShape } from 'react-intl'
import SearchArticleModal from '../containers/SearchArticleModal'
import VirtualList from '../containers/VirtualList'
import '../styles/AppList.less'

const RadioButton = Radio.Button
const RadioGroup = Radio.Group
const Confirm = Modal.confirm

export interface IAppListReduxData {
    allArticlesReadAt: number
    articlesFilter: string
    selectedMenuKey: string
}

export interface IAppListReduxFunc {
    asyncFilterArticles: (filter: string) => any
    asyncSetAllArticlesRead: () => any
}

interface IAppListProps extends IAppListReduxData, IAppListReduxFunc {
}

interface IAppListState {
    isSearchArticleModalVisible: boolean
    chooseItemIndex: number
}

class AppList extends Component<IAppListProps & InjectedIntlProps> {
    public static propTypes: React.ValidationMap<any> = {
        intl: intlShape.isRequired,
    }
    public state: IAppListState
    public constructor(props: any) {
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
                this.props.asyncSetAllArticlesRead()
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
    public componentWillReceiveProps(props: any) {
        if (props.allArticlesReadAt > 0 && props.allArticlesReadAt > this.props.allArticlesReadAt) {
            Message.success(this.props.intl.formatMessage({ id: 'allArticlesAreReadNow' }))
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
