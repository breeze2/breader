import { Avatar, Button, List as AntdList } from 'antd'
import React, { PureComponent } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import { FormattedMessage, injectIntl, WrappedComponentProps } from 'react-intl'
import { IFeed } from '../schemas'
import '../styles/SettingFeedList.less'
import Utils from '../utils'

export interface ISettingFeedListProps {
  feeds: IFeed[]
  onDeleteFeed?: (feedId: string, feedIndex: number) => void
}
export interface ISettingFeedListState {}

export class SettingFeedListComponent extends PureComponent<
  ISettingFeedListProps & WrappedComponentProps,
  ISettingFeedListState
> {
  public constructor(props: ISettingFeedListProps & WrappedComponentProps) {
    super(props)
  }
  public handleDeleteClick = (feedId: string, feedIndex: number) => {
    const { onDeleteFeed } = this.props
    if (onDeleteFeed) {
      onDeleteFeed(feedId, feedIndex)
    }
  }
  public handleScrollStart() {
    // fix: scrollbar not get close bottom
    const uls = document.getElementsByClassName('setting-feed-items')
    const ul = uls.item(0) as HTMLElement
    if (ul) {
      ul.style.paddingLeft = '0.5px'
      setImmediate(() => {
        ul.style.paddingLeft = null
      })
    }
  }
  public render() {
    const { feeds } = this.props
    return (
      <div className="ant-list ant-list-sm ant-list-split ant-list-bordered setting-feed-list">
        <Scrollbars
          autoHide
          autoHeight
          autoHeightMax={`calc(${Utils.getClientHightForCalc()} - 332px)`}
          onScrollStart={this.handleScrollStart}>
          <ul className="ant-list-items setting-feed-items">
            {feeds.map((feed, index) => (
              <AntdList.Item
                className="setting-feed-item"
                key={feed._id}
                actions={[
                  <Button
                    key={feed._id}
                    size="small"
                    type="danger"
                    onClick={() => this.handleDeleteClick(feed._id, index)}>
                    <FormattedMessage id="delete" />
                  </Button>,
                ]}>
                <p title={feed.url} className="feed-item-content">
                  <Avatar shape="square" size={16} src={feed.favicon} />{' '}
                  {feed.title}
                </p>
              </AntdList.Item>
            ))}
          </ul>
        </Scrollbars>
        {!feeds.length && (
          <p className="empty-list">
            <FormattedMessage id="noFeeds" />
          </p>
        )}
      </div>
    )
  }
}

export default injectIntl(SettingFeedListComponent)
