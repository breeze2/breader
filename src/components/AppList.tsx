import { Icon, message as Message, Modal, Radio } from 'antd'
import React, { Component } from 'react'
import { FormattedMessage, InjectedIntlProps, injectIntl, intlShape } from 'react-intl'
import VirtualList from '../containers/VirtualList'
import '../styles/AppList.less'

const RadioButton = Radio.Button
const RadioGroup = Radio.Group
const Confirm = Modal.confirm

interface InterfaceListProps {
    allArticlesReadAt: number
    articlesFilter: string
    selectedMenuKey: string
    asyncFilterArticles: (filter: string) => any
    asyncSetAllArticlesRead: () => any
}

interface InterfaceListState {
    // dividingDate: string
}

class AppList extends Component<InterfaceListProps & InjectedIntlProps> {
    // public state: InterfaceListState
    public static propTypes: React.ValidationMap<any> = {
        intl: intlShape.isRequired,
    }
    public constructor(props: any) {
        super(props)
    }
    public handleRadioChange = (e: any) => {
        const target = e.target
        this.props.asyncFilterArticles(target.value)
    }
    public handleCheckClick = (e: any) => {
        Confirm({
            onOk: () => {
                this.props.asyncSetAllArticlesRead()
            },
            title: (this.props.intl.formatMessage({ id: 'doYouWantSetAllArticlesBeRead' })),
        })
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
                    <VirtualList />
                </div>
                <div className="list-footer">
                    <div className="list-footer-left">
                        <Icon type="check-circle" theme="filled" className="check-all" onClick={this.handleCheckClick} />
                    </div>
                    <div className="list-footer-right">
                        <Icon type="search" className="search-item" />
                        {/* <Icon type="right" className="show-content" /> */}
                    </div>
                </div>
                <Modal  />
            </div>
        )
    }
}

export default injectIntl(AppList)
