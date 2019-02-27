import { Avatar } from 'antd'
import { Map } from 'immutable'
import React, { Component, PureComponent } from 'react'
import '../styles/ListItem.less'

interface InterfaceListItemState {
    guid: string
}
export interface InterfaceListItemProps {
    feedFavicons: Map<string, string>
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
            favicon = (this.props.feedFavicons.get(this.props.feedId.toString()) as string)
        }
        return (
            <div className={'list-item ' + this.props.className} data-id={this.props.inid}>
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
