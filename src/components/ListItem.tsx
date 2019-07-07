import { Avatar } from 'antd'
import Immutable from 'immutable'
import React, { Component, PureComponent } from 'react'
import '../styles/ListItem.less'
import Utils from '../utils';

export interface IListItemOwnProps {
    author?: string
    className?: string
    key?: string | number
    style?: any
    guid: string
    feedId: string
    time: number
    title: string
    summary: string
}

export interface IListItemReduxDispatch {
}

export interface IListItemReduxState {
    feedFavicons: Immutable.Map<string, string>
    feedTitles: Immutable.Map<string, string>
}

export interface IListItemProps extends IListItemOwnProps, IListItemReduxDispatch, IListItemReduxState {
}

interface IListItemState {
    guid: string
}

class ListItem<T extends IListItemProps> extends PureComponent<T> {
    public state: IListItemState
    public constructor(props: T) {
        super(props)
        this.state = {
            guid: this.props.guid,
        }
    }
    public componentWillReceiveProps(props: any) {
        // console.log(props)
    }
    public render () {
        const { className, feedId, feedFavicons, feedTitles, summary, time, title } = this.props
        const dateTime = Utils.timeToTimeString(time)
        const feedTitle = feedTitles.get(feedId) || ''
        const favicon = feedFavicons.get(feedId) || ''
        return (
            <div className={'list-item ' + className}>
                <div className="item-sider">
                    {favicon ? (<Avatar shape="square" size={22} src={favicon} />) : (
                        <Avatar shape="square" size={22} >{feedTitle ? feedTitle.substring(0, 1) : ''}</Avatar>
                    )}
                </div>
                <div className="item-main">
                    <div className="item-header">
                        <div className="item-header-left">{feedTitle}</div>
                        <div className="item-header-right">{dateTime}</div>
                    </div>
                    <div className="item-content">{title}</div>
                    <div className="item-footer">{summary}</div>
                </div>
            </div>
        );
    };
}

export default ListItem
