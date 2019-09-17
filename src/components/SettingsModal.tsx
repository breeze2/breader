import { Modal, Select } from 'antd'
import Immutable from 'immutable'
import React, { Component } from 'react'
import { FormattedMessage, injectIntl, WrappedComponentProps } from 'react-intl'
import { IFeed } from '../schemas'
import Utils from '../utils'
import SettingFeedList from './SettingFeedList'

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

export interface ISettingsModalState {
  allFeeds: IFeed[]
  lastVisible: boolean
  needDeletedIds: string[]
}

export class SettingsModalComponent extends Component<
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
  public handleCancel = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    this.props.onClose(e)
  }
  public handleOk = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const ids = this.state.needDeletedIds
    if (ids.length) {
      this.props.asyncDeleteFeeds(ids)
    }
    this.props.onClose(e)
  }
  public handleDeleteFeed = (feedId: string, feedIndex: number) => {
    const { allFeeds, needDeletedIds } = this.state
    allFeeds.splice(feedIndex, 1)
    needDeletedIds.push(feedId)
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
        style={{ top: Utils.getModalTop(42) }}
        bodyStyle={{
          maxHeight: `calc(${Utils.getClientHightForCalc()} - 192px)`,
        }}
        visible={this.props.visible}
        onCancel={this.handleCancel}
        onOk={this.handleOk}>
        <div className="settings-content">
          <div className="languages-setting">
            <p className="settings-item-title">
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
            <p className="settings-item-title">
              <FormattedMessage id="feeds" />
            </p>
            <SettingFeedList
              feeds={this.state.allFeeds}
              onDeleteFeed={this.handleDeleteFeed}
            />
          </div>
        </div>
      </Modal>
    )
  }
}

export default injectIntl(SettingsModalComponent)
