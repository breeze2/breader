import React, { CSSProperties, PureComponent } from 'react'
import '../styles/Skeletons.less'

interface ITextSkeletonProps {
    width?: number | string
    className?: string
    style?: CSSProperties
}

export default class TextSkeleton extends PureComponent<ITextSkeletonProps> {
    public constructor(props: ITextSkeletonProps) {
        super(props)
    }
    public render() {
        const { className, style, width } = this.props
        const classes = 'text-skeleton skeleton-active ' + (className || '')
        return (
            <div
                className={classes}
                style={{
                    ...style,
                    width,
                }}
            />
        )
    }
}
