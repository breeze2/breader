import { Affix, Icon, List as AntdList, Radio } from 'antd'
import Immutable, { List, Map } from 'immutable'
import React, { Component } from 'react'
import VirtualList from '../containers/VirtualList'
import InterfaceArticle from '../schemas/InterfaceArticle'
import '../styles/AppList.less'

const RadioButton = Radio.Button
const RadioGroup = Radio.Group

interface InterfaceAppMenuProps {
    // articleId: number
    // feedFavicons: Map<number, string>
    // articles: List<InterfaceArticle>
    // setArticleId: (id: number) => any
    // setArticles: (feeds: InterfaceArticle[]) => any
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
    public handleVirtualListClick = (e: any) => {
        console.log(this.props)
        console.log(e.target)
    }
    public componentWillReceiveProps() {
        console.log(arguments, 22)
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
                    <VirtualList />
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
