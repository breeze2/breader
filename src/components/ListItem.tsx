import { Avatar } from 'antd'
import React, { Component } from 'react'
import InterfaceArticle from '../schemas/InterfaceArticle'
import '../styles/ListItem.less'

interface InterfaceListItemState {
    guid: string
}
interface InterfaceListItemProps  {
    author?: string
    className?: string
    guid: string
    feedTitle?: string
    time: string
    inid?: number
    title: string
    summary: string
}

class ListItem extends Component<InterfaceListItemProps> {
    public state: InterfaceListItemState;
    public constructor(props: InterfaceListItemProps) {
        super(props);
        this.state = {
            guid: this.props.guid,
        };
    };
    public render () {
        return (
            <div className="list-item">
                <div className="item-sider">1</div>
                <div className="item-main">
                    <div className="item-header">
                        <div className="item-header-left">{this.props.feedTitle}</div>
                        <div className="item-header-right">{(this.props.time).substring(0, 5)}</div>
                    </div>
                    <div className="item-content">{this.props.title}</div>
                    <div className="item-footer">{this.props.summary}</div>
                </div>
            </div>
        );
    };
}

export default ListItem;
