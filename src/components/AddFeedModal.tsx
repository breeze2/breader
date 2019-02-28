import { Input, message as Message, Modal } from 'antd'
import React, { Component } from 'react'
import { FormattedMessage, InjectedIntlProps, injectIntl, intlShape } from 'react-intl'

import '../styles/AddFeedModal.less'

interface InterfaceAddFeedModalProps {
    visible: boolean
    onOk: (e: any) => any
    onCancel: (e: any) => any
}

interface InterfaceAddFeedModalState {
    readonly feedUrl: string
}

class AddFeedModal extends Component<InterfaceAddFeedModalProps & InjectedIntlProps, {}> {
    public static propTypes: React.ValidationMap<any> = {
        intl: intlShape.isRequired,
    }
    public state: InterfaceAddFeedModalState
    public constructor(props: any) {
        super(props)
        this.state = {
            feedUrl: '',
        }
    }
    public handleSummit = (e: any) => {
        const feedUrl = this.state.feedUrl
        const a = window.document.createElement('a')
        a.href = feedUrl

        if (a.host && (a.host !== window.location.host) &&
            ((a.protocol === 'http:') || (a.protocol === 'https:'))) {
            this.props.onOk(feedUrl)
        } else {
            Message.warning(this.props.intl.formatMessage({ id: 'invalidFeedUrl'}))
        }
    }
    public handleChange = (e: any) => {
        this.setState({
            feedUrl: e.target.value,
        })
    }
    public componentWillReceiveProps () {
        this.setState({
            feedUrl: '',
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
                {/* <FormattedMessage id="feedUrl" >{ (txt) => {
                    return <Input placeholder={txt as string} value={this.state.feedUrl} onChange={this.handleChange} onPressEnter={this.handleSummit} />
                }}</FormattedMessage> */}
                <Input placeholder={this.props.intl.formatMessage({ id: 'feedUrl'})} value={this.state.feedUrl} onChange={this.handleChange} onPressEnter={this.handleSummit} />
            </Modal>
        )
    }
}

export default injectIntl(AddFeedModal)
