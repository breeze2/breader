import { Progress } from 'antd'
import React, { PureComponent } from 'react'

interface IProgressBarProps {
    className?: string
    start?: number
    max: number
    time: number
    onEnd?: () => any
}
interface IProgressBarState {
    progress: number
}

class ProgressBar extends PureComponent<IProgressBarProps, IProgressBarState> {
    public constructor(props: IProgressBarProps) {
        super(props)
        this.state = { progress: props.start || 0 }
    }
    public componentDidMount () {
        const { max, time } = this.props
        const interval = 120
        const step = (max - this.state.progress) * interval / (time * 1000)
        if (step <= 0) {
            this.setState({ progress: max })
        } else {
            const timeId = setInterval(() => {
                const progress = this.state.progress
                if (progress >= max) {
                    clearInterval(timeId)
                } else {
                    this.setState({ progress: this.state.progress + step })
                }
            }, interval)
        }
    }
    public toEnd() {
        this.setState({ progress: 100 })
        const onEnd = this.props.onEnd
        if (onEnd) {
            setTimeout(() => {
                onEnd()
            }, 1200)
        }
    }
    public render() {
        return (<Progress className={this.props.className}
            status='active'
            showInfo={false}
            strokeColor={{
                '0%': '#c8af8d',
                '100%': '#ffa81e',
            }}
            percent={this.state.progress}
            type="line"
            strokeWidth={3}
        />)
    }
}

export default ProgressBar
