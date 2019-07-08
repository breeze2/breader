import { Avatar, Button, Input, List as AntdList, message as Message, Modal, Select } from 'antd'
import Immutable from 'immutable'
import React, { Component } from 'react'
import { FormattedMessage, InjectedIntlProps, injectIntl, intlShape } from 'react-intl'
import { IFeed } from '../schemas'

import '../styles/SettingsModal.less'

export interface ISettingsModalOwnProps {
    visible: boolean
    onClose: (e: any) => any
    onLanguageChange: (language: string) => any
}

export interface ISettingsModalReduxDispatch {
    setLanguage: (language: string) => any
    asyncDeleteFeeds: (feedIds: string[]) => Promise<undefined>
}

export interface ISettingsModalReduxState {
    feeds: Immutable.List<IFeed>
    language: string,
}

export interface ISettingsModalProps extends ISettingsModalOwnProps, ISettingsModalReduxDispatch, ISettingsModalReduxState {
}

interface ISettingsModalState {
    needDeleted: { [id: string]: boolean },
}

class SettingsModal extends Component<ISettingsModalProps & InjectedIntlProps, {}> {
    public static propTypes: React.ValidationMap<any> = {
        intl: intlShape.isRequired,
    }
    public state: ISettingsModalState
    public constructor(props: ISettingsModalProps & InjectedIntlProps) {
        super(props)
        this.state = {
            needDeleted: {},
        }
    }
    public handleCancel = (e: any) => {
        this.props.onClose(e)
    }
    public handleOk = (e: any) => {
        const needDeleted = this.state.needDeleted
        const ids: string[] = []
        for (const id in needDeleted) {
            if (needDeleted[id]) {
                ids.push(id)
            }
        }
        if (ids.length) {
            this.props.asyncDeleteFeeds(ids)
        }
        this.props.onClose(e)
    }
    public handleDeleteClick = (feedId: string) => {
        const needDeleted = this.state.needDeleted
        needDeleted[feedId] = true
        this.setState({
            needDeleted: { ...needDeleted },
        })
    }
    public handleLanguageChange = (value: string) => {
        this.props.setLanguage(value)
        this.props.onLanguageChange(value)
    }
    public componentWillReceiveProps (props: any) {
        if (props.visible === true) {
            this.setState({
                needDeleted: {},
            })
        }
    }
    public render() {
        return (
            <Modal className="settings-modal"
                title={<FormattedMessage id="settings" />}
                width={512}
                style={{ top: 42 }}
                visible={this.props.visible}
                onCancel={this.handleCancel}
                onOk={this.handleOk}
            >
                <div className="settings-content">
                    <div className="languages-setting">
                        <p><FormattedMessage id="languages" /></p>
                        <Select defaultValue={this.props.language} style={{ width: '100%' }} onChange={this.handleLanguageChange}>
                            <Select.Option value="en-US">en-US</Select.Option>
                            <Select.Option value="zh-CN">zh-CN</Select.Option>
                        </Select>
                    </div>
                    <div className="feeds-setting">
                        <p><FormattedMessage id="feeds" /></p>
                        <AntdList
                            bordered
                            split
                            size="small"
                            itemLayout="horizontal"
                            dataSource={this.props.feeds.toArray()}
                            renderItem={(feed: IFeed) => {
                                if (feed._id && this.state.needDeleted[feed._id]) {
                                    return <div />
                                }
                                return (<AntdList.Item className="settings-feed-item"
                                    key={feed._id}
                                    actions={[
                                        (<Button size="small" type="danger" onClick={() => this.handleDeleteClick(feed._id)}
                                        ><FormattedMessage id="delete" /></Button>),
                                    ]}
                                >
                                    <p className="feed-item-content"><Avatar shape="square" size={16} src={feed.favicon} /> {feed.title}</p>
                                </AntdList.Item>)
                            }}
                        />
                    </div>
                </div>
            </Modal>
        )
    }
}

export default injectIntl(SettingsModal)
