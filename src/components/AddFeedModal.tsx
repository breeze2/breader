import { Input, Modal } from 'antd'
import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'

import '../styles/AddFeedModal.less'

interface InterfaceAddFeedModalProps {
    visible: boolean
    onOk: (e: any) => any
    onCancel: (e: any) => any
}

interface InterfaceAddFeedModalState {
    readonly feedUrl: string
}

class AddFeedModal extends Component<InterfaceAddFeedModalProps> {
    public state: InterfaceAddFeedModalState
    public constructor(props: InterfaceAddFeedModalProps) {
        super(props)
        this.state = {
            feedUrl: '',
        }
    }
    public handleSummit = (e: any) => {
        const feedUrl = this.state.feedUrl
        this.props.onOk(feedUrl)
    }
    public handleChange = (e: any) => {
        this.setState({
            feedUrl: e.target.value,
        })
    }
    public render() {
        return (
            <Modal className="add-feed-modal"
                title={<FormattedMessage id="addFeed" />}
                width={376}
                visible={this.props.visible}
                onCancel={this.props.onCancel}
                onOk={this.handleSummit}
            >
                <FormattedMessage id="feedUrl" >{ (txt) => {
                    return <Input placeholder={txt as string} value={this.state.feedUrl} onChange={this.handleChange} />
                }}</FormattedMessage>
            </Modal>
        )
    }
}

export default AddFeedModal
