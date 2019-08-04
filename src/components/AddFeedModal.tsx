import { Input, message as Message, Modal } from 'antd'
import React, { Component } from 'react'
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl'

import '../styles/AddFeedModal.less'

export interface IAddFeedModalProps {
  visible: boolean
  onOk: (e: any) => any
  onCancel: (e: any) => any
}

export interface IAddFeedModalState {
  readonly feedUrl: string
}

class AddFeedModal extends Component<
  IAddFeedModalProps & InjectedIntlProps,
  IAddFeedModalState
> {
  public constructor(props: IAddFeedModalProps & InjectedIntlProps) {
    super(props)
    this.state = {
      feedUrl: '',
    }
  }
  public handleSubmit = () => {
    const feedUrl = this.state.feedUrl
    const a = window.document.createElement('a')
    a.href = feedUrl

    if (
      a.host &&
      a.host !== window.location.host &&
      (a.protocol === 'http:' || a.protocol === 'https:')
    ) {
      this.props.onOk(feedUrl)
    } else {
      Message.warning(this.props.intl.formatMessage({ id: 'invalidFeedUrl' }))
    }
  }
  public handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      feedUrl: e.target.value,
    })
  }
  public afterClose = () => {
    this.setState({
      feedUrl: '',
    })
  }
  public componentDidUpdate() {
    if (this.props.visible) {
      setTimeout(() => {
        const input: any = document.querySelector('.input-feed-url')
        if (input) {
          input.focus()
        }
      }, 200)
    }
  }
  public render() {
    return (
      <Modal
        className="add-feed-modal"
        title={<FormattedMessage id="addFeed" />}
        width={376}
        visible={this.props.visible}
        onCancel={this.props.onCancel}
        onOk={this.handleSubmit}
        afterClose={this.afterClose}>
        {/* <FormattedMessage id="feedUrl" >{ (txt) => {
                    return <Input placeholder={txt as string} value={this.state.feedUrl} onChange={this.handleChange} onPressEnter={this.handleSubmit} />
                }}</FormattedMessage> */}
        <Input
          className="input-feed-url"
          placeholder={this.props.intl.formatMessage({ id: 'feedUrl' })}
          value={this.state.feedUrl}
          onChange={this.handleChange}
          onPressEnter={this.handleSubmit}
        />
      </Modal>
    )
  }
}

export default injectIntl(AddFeedModal)
