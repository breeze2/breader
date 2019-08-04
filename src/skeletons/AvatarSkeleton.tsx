import React, { CSSProperties, PureComponent } from 'react'
import '../styles/Skeletons.less'

interface IAvatarSkeletonProps {
  className?: string
  style?: CSSProperties
}

export default class AvatarSkeleton extends PureComponent<
  IAvatarSkeletonProps
> {
  public constructor(props: IAvatarSkeletonProps) {
    super(props)
  }
  public render() {
    const { className, style } = this.props
    const classes = 'avatar-skeleton skeleton-active ' + (className || '')
    return <div className={classes} style={style} />
  }
}
