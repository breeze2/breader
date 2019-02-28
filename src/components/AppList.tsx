import { Icon, Radio } from 'antd'
import React, { Component } from 'react'
import VirtualList from '../containers/VirtualList'
import '../styles/AppList.less'

const RadioButton = Radio.Button
const RadioGroup = Radio.Group

interface InterfaceListProps {
    selectedMenuKey: string
    articlesFilter: string
    asyncFilterArticles: (filter: string) => any
}

interface InterfaceListState {
    // dividingDate: string
}

class AppList extends Component<InterfaceListProps> {
    // public state: InterfaceListState
    public constructor(props: any) {
        super(props)
    }
    public handleRadioChange = (e: any) => {
        const target = e.target
        this.props.asyncFilterArticles(target.value)
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
                        <Icon type="check-circle" theme="filled" className="check-all" />
                    </div>
                    <div className="list-footer-right">
                        <Icon type="search" className="search-item" />
                        {/* <Icon type="right" className="show-content" /> */}
                    </div>
                </div>
            </div>
        )
    }
}

export default AppList
