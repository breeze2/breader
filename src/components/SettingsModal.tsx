import { Avatar, Button, List as AntdList, Modal, Select } from 'antd'
import Immutable from 'immutable'
import React, { Component } from 'react'
import { FormattedMessage, injectIntl, WrappedComponentProps } from 'react-intl'
import { IFeed } from '../schemas'

import '../styles/SettingsModal.less'

export interface ISettingsModalOwnProps {
  visible: boolean
  onClose: (e: any) => any
  onLanguageChange: (language: string) => any
}

export interface ISettingsModalReduxDispatch {
  setLanguage: (language: string) => any
  asyncDeleteFeeds: (feedIds: string[]) => Promise<number>
}

export interface ISettingsModalReduxState {
  feeds: Immutable.List<IFeed>
  language: string
}

export interface ISettingsModalProps
  extends ISettingsModalOwnProps,
    ISettingsModalReduxDispatch,
    ISettingsModalReduxState {}

interface ISettingsModalState {
  allFeeds: IFeed[]
  lastVisible: boolean
  needDeletedIds: string[]
}

class SettingsModal extends Component<
  ISettingsModalProps & WrappedComponentProps,
  ISettingsModalState
> {
  public static getDerivedStateFromProps(
    nextProps: ISettingsModalProps,
    prevState: ISettingsModalState
  ) {
    if (nextProps.visible && !prevState.lastVisible) {
      return {
        allFeeds: nextProps.feeds.toArray(),
        lastVisible: nextProps.visible,
        needDeletedIds: [],
      }
    }
    if (!nextProps.visible && prevState.lastVisible) {
      return {
        lastVisible: nextProps.visible,
      }
    }
    return null
  }
  public constructor(props: ISettingsModalProps & WrappedComponentProps) {
    super(props)
    this.state = {
      allFeeds: props.feeds.toArray(),
      lastVisible: props.visible,
      needDeletedIds: [],
    }
  }
  public handleCancel = (e: any) => {
    this.props.onClose(e)
  }
  public handleOk = (e: any) => {
    const ids = this.state.needDeletedIds
    if (ids.length) {
      this.props.asyncDeleteFeeds(ids)
    }
    this.props.onClose(e)
  }
  public handleDeleteClick = (feedId: string, feedIndex: number) => {
    const { allFeeds, needDeletedIds } = this.state
    if (allFeeds[feedIndex] && allFeeds[feedIndex]._id === feedId) {
      needDeletedIds.push(feedId)
      allFeeds.splice(feedIndex, 1)
    }
    this.setState({
      allFeeds: [...allFeeds],
      needDeletedIds: [...needDeletedIds],
    })
  }
  public handleLanguageChange = (value: string) => {
    this.props.setLanguage(value)
    this.props.onLanguageChange(value)
  }
  public render() {
    return (
      <Modal
        className="settings-modal"
        title={<FormattedMessage id="settings" />}
        width={512}
        style={{ top: 42 }}
        visible={this.props.visible}
        onCancel={this.handleCancel}
        onOk={this.handleOk}>
        <div className="settings-content">
          <div className="languages-setting">
            <p>
              <FormattedMessage id="languages" />
            </p>
            <Select
              defaultValue={this.props.language}
              style={{ width: '100%' }}
              onChange={this.handleLanguageChange}>
              <Select.Option value="en-US">en-US</Select.Option>
              <Select.Option value="zh-CN">zh-CN</Select.Option>
            </Select>
          </div>
          <div className="feeds-setting">
            <p>
              <FormattedMessage id="feeds" />
            </p>
            <AntdList
              bordered
              split
              size="small"
              itemLayout="horizontal"
              dataSource={this.state.allFeeds}
              renderItem={(feed: IFeed, index: number) => (
                <AntdList.Item
                  className="settings-feed-item"
                  key={feed._id}
                  actions={[
                    <Button
                      key={`${feed._id}_button_1`}
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
              )}
            />
          </div>
        </div>
      </Modal>
    )
  }
}

export default injectIntl(SettingsModal)
