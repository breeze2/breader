import { Icon, List as AntdList, Radio } from 'antd'
import React, { Component } from 'react'
import InterfaceArticle from '../schemas/InterfaceArticle'
import '../styles/AppList.less'
import ListItem from './ListItem'

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

class List extends Component<InterfaceAppMenuProps> {
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
                    <AntdList
                        itemLayout="horizontal"
                        dataSource={this.props.articles}
                        renderItem={(article: InterfaceArticle, i: number) => {
                            const flag = this.state.dividingDate === article.date
                            if (!flag) {
                                this.state.dividingDate = article.date
                            }
                            return (<div key={article.guid} className={i === 0 ? 'first-list-item' : ''}>
                                {!flag && <div className="date-divid">{article.date}</div>}
                                <ListItem feedFavicons={this.props.feedFavicons} author={article.author}
                                    guid={article.guid}
                                    feedTitle={article.feed_title}
                                    time={article.time}
                                    inid={article.id}
                                    feedId={article.feed_id}
                                    title={article.title}
                                    summary={article.summary} />
                            </div>)
                        }}
                    />
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
        );
    }
}

export default List;
