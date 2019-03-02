import { Drawer, Icon, Progress } from 'antd'
import React, { Component } from 'react'
import '../styles/WebviewDrawer.less'
import Utils from '../utils'

interface InterfaceWebviewDrawerProps {
    visible: boolean
    src: string
    width: string | number
    onClose: (e: any) => any
}
interface InterfaceWebviewDrawerState {
    hasProgressBar: boolean
    progress: number
    isProgressActive: boolean
}

class WebviewDrawer extends Component<InterfaceWebviewDrawerProps> {
    public state: InterfaceWebviewDrawerState
    public webview: any
    public openTimes: number
    private _needUpdateWebview: boolean
    public constructor(props: any) {
        super(props)
        this.state = { hasProgressBar: true, progress: 0, isProgressActive: false }
        this._needUpdateWebview = false
        this.openTimes = 0
    }
    public handleCompassClick = () => {
        if (this.props.src) {
            Utils.openExternalUrl(this.props.src)
        }
    }
    public handleDrawerClose = (e: any) => {
        this.props.onClose(e)
        const times = this.openTimes
        const webview = this.webview
        const src = this.webview.src
        setTimeout(() => {
            if (this.webview && this.openTimes === times && this.props.visible === false &&
                webview === this.webview && this.webview.src === src) {
                this.webview.remove()
                this.webview = null
            }
        }, 10 * 1000)
    }
    public makeWebView(url: string) {
        console.log(111111, this.webview)
        if (this.webview) {
            this.webview.src = url
        } else {
            const div = document.querySelector('.drawer-content')
            if (div) {
                this.webview = document.createElement('webview')
                this.webview.addEventListener('did-start-loading', this.showProgressBar)
                this.webview.addEventListener('did-stop-loading', this.hideProgressBar)
                this.webview.src = url
                div.appendChild(this.webview)
            }
        }
    }
    public showProgressBar = () => {
        this.setState({
            hasProgressBar: true,
            isProgressActive: false,
            progress: 20,
        })
        const timeId = setInterval(() => {
            if (this.state.progress > 90) {
                clearInterval(timeId)
                this.setState({
                    isProgressActive: true,
                })
            } else if (this.state.progress < 10) {
                clearInterval(timeId)
            } else {
                this.setState({ progress: this.state.progress + 1 })
            }
        }, 60)
    }
    public hideProgressBar = () => {
        this.setState({
            isProgressActive: false,
            progress: 100,
        })
        setTimeout(() => {
            this.setState({
                hasProgressBar: false,
                progress: 0,
            })
        }, 300)
    }
    public componentDidUpdate = () => {
        if (this._needUpdateWebview) {
            this._needUpdateWebview = false
            this.setState({
                hasProgressBar: true,
            })
            if (this.webview) {
                this.makeWebView(this.props.src)
            } else {
                setTimeout(() => {
                    this.makeWebView(this.props.src)
                }, 800)
            }
        }
    }
    public componentWillReceiveProps(props: any) {
        if (props.visible) {
            this.openTimes++
            if (!this.webview || (this.webview.src !== props.src)) {
                this._needUpdateWebview = true
            }
        }
    }
    public componentWillUnmount() {
        this.setState = () => null
    }
    public render() {
        return (<Drawer className="webview-drawer"
            closable={false}
            visible={this.props.visible}
            onClose={this.handleDrawerClose}
            width={this.props.width}>
            <div className="drawer-header">
                <div className="drawer-header-left" onClick={this.handleDrawerClose} >
                    <Icon type="close" />
                </div>
                <div className="drawer-header-right" onClick={this.handleCompassClick} >
                    <Icon type="compass" />
                </div>
                <Progress className="webview-progress" style={{ display: this.state.hasProgressBar ? 'block' : 'none' }}
                    status={this.state.isProgressActive ? 'active' : 'normal'}
                    showInfo={false}
                    strokeColor="#ffa81e"
                    percent={this.state.progress}
                    type="line"
                    strokeWidth={3}
                />
            </div>
            <div className="drawer-content">
                {/* <webview ref={this.wvRef} style={{height: '100%'}} src={this.props.src}/> */}
            </div>
        </Drawer>)
    }
}

export default WebviewDrawer
