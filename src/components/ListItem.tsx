import { Avatar } from 'antd'
import Immutable from 'immutable'
import React, { Component, PureComponent } from 'react'
import { InjectedIntlProps, injectIntl } from 'react-intl'
import defaultFavicon from '../images/rss.png'
import { IFeed } from '../schemas';
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
    feedsMap: Immutable.Map<string, IFeed>
}

export interface IListItemProps extends IListItemOwnProps, IListItemReduxDispatch, IListItemReduxState {
}

class ListItem<T extends IListItemProps> extends PureComponent<T & InjectedIntlProps> {
    public constructor(props: T & InjectedIntlProps) {
        super(props)
    }
    public componentWillReceiveProps(props: T & InjectedIntlProps) {
        // console.log(props)
    }
    public render () {
        const { className, feedId, feedsMap, intl, summary, time, title } = this.props
        const dateTime = Utils.timeToTimeString(time)
        const feed = feedsMap.get(feedId)
        const feedTitle = feed ? feed.title : intl.formatMessage({id: 'unknown'})
        const favicon = feed ? feed.favicon : defaultFavicon
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

export default injectIntl(ListItem)
