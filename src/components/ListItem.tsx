import { Avatar } from 'antd'
import Immutable, { List, Map } from 'immutable'
import React, { Component, PureComponent } from 'react'
import InterfaceArticle from '../schemas/InterfaceArticle'
import '../styles/ListItem.less'

interface InterfaceListItemState {
    guid: string
}
export interface InterfaceListItemProps {
    feedFavicons: Map<number, string>
    author?: string
    className?: string
    key?: string | number
    style?: any
    guid: string
    feedTitle?: string
    feedId?: number
    time: string
    inid?: number
    title: string
    summary: string
}

class ListItem<T extends InterfaceListItemProps> extends PureComponent<T> {
    public state: InterfaceListItemState
    public constructor(props: T) {
        super(props)
        this.state = {
            guid: this.props.guid,
        }
    }
    public render () {
        const feedTitle = this.props.feedTitle
        const time = this.props.time
        let favicon = ''
        if (this.props.feedId) {
            console.log(this.props.feedFavicons, this.props.feedFavicons.get(0))
            favicon = (this.props.feedFavicons.get((this.props.feedId as number)) as string)
        }
        return (
            <div className="list-item">
                <div className="item-sider">
                    {favicon ? (<Avatar shape="square" size={22} src={favicon} />) : (
                        <Avatar shape="square" size={22} >{feedTitle ? feedTitle.substring(0, 1) : ''}</Avatar>
                    )}
                </div>
                <div className="item-main">
                    <div className="item-header">
                        <div className="item-header-left">{feedTitle}</div>
                        <div className="item-header-right">{time ? time.substring(0, 5) : ''}</div>
                    </div>
                    <div className="item-content">{this.props.title}</div>
                    <div className="item-footer">{this.props.summary}</div>
                </div>
            </div>
        );
    };
}

export default ListItem
