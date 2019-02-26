import { Affix, Icon, List as AntdList, Radio } from 'antd'
import React, { Component } from 'react'
import InterfaceArticle from '../schemas/InterfaceArticle'
import '../styles/AppList.less'
import VirtualList from './VirtualList'

const RadioButton = Radio.Button
const RadioGroup = Radio.Group

interface InterfaceAppMenuProps {
    feedFavicons: {[key: number]: string}
    articles: InterfaceArticle[]
    addArticles: (articles: InterfaceArticle[]) => any
    setArticles: (feeds: InterfaceArticle[]) => any
}

interface InterfaceListState {
    dividingDate: string
}

class AppList extends Component<InterfaceAppMenuProps> {
    public state: InterfaceListState
    public constructor(props: any) {
        super(props)
        this.state = {
            dividingDate: '',
        }
    }
    public render() {
        return (
            <div className="app-list">
                <div className="list-header">
                    <div className="list-header-right">
                        <RadioGroup defaultValue="a" size="small">
                            <RadioButton value="a"><Icon type="star" theme="filled" /></RadioButton>
                            <RadioButton value="b"><Icon type="file-text" theme="filled" /></RadioButton>
                            <RadioButton value="c"><Icon type="profile" theme="filled" /></RadioButton>
                        </RadioGroup>
                    </div>
                </div>
                <div className="list-content">
                    <VirtualList articels={this.props.articles.length ?
                        Array(1000).fill(0).map((el, i) => {
                            return {
                                ...(this.props.articles[0]),
                                date: 'sdfsdfdsf+ 111' + i,
                            }
                        }) : []
                    } feedFavicons={this.props.feedFavicons} />
                </div>
                <div className="list-footer">
                    <div className="list-footer-left">
                        <Icon type="check-circle" theme="filled" className="check-all" />
                    </div>
                    <div className="list-footer-right">
                        <Icon type="search" className="search-item" />
                        <Icon type="right" className="show-content" />
                    </div>
                </div>
            </div>
        )
    }
}

export default AppList
