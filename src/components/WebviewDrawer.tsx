import { Drawer, Icon } from 'antd'
import React, { Component } from 'react'
import '../styles/WebviewDrawer.less'

interface InterfaceWebviewDrawerProps {
    visible: boolean
    src: string
    width: string | number
    onClose: (e: any) => any
}
interface InterfaceWebviewDrawerState {
}

class WebviewDrawer extends Component<InterfaceWebviewDrawerProps> {
    // public state: InterfaceWebviewDrawerState
    public constructor(props: any) {
        super(props)
    }
    public render() {
        return (
            <Drawer className="webview-drawer"
                closable={false}
                visible={this.props.visible}
                onClose={this.props.onClose}
                width={this.props.width}>
                <div className="drawer-header">
                    <div className="drawer-header-left" onClick={this.props.onClose} >
                        <Icon type="close" />
                    </div>
                    <div className="drawer-header-right" onClick={this.props.onClose} >
                        <Icon type="compass" />
                    </div>
                </div>
                <div className="drawer-content">
                    {this.props.visible && <webview autosize style={{height: '100%'}} src={this.props.src}/>}
                </div>
            </Drawer>
        )
    }
}

export default WebviewDrawer
