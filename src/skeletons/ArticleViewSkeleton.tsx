import React, { CSSProperties, PureComponent } from 'react'
import SpanSkeleton from './SpanSkeleton'
import TextSkeleton from './TextSkeleton'

import '../styles/Skeletons.less'

interface IArticleViewSkeletonProps {
  className?: string
  style?: CSSProperties
}

export default class ArticleViewSkeleton extends PureComponent<
  IArticleViewSkeletonProps
> {
  public constructor(props: IArticleViewSkeletonProps) {
    super(props)
  }
  public render() {
    const { className, style } = this.props
    const classes = 'article-view-skeleton ' + (className || '')
    return (
      <div className={classes} style={style}>
        <div className="view-content">
          <div className="article-info">
            <div className="article-date">
              <SpanSkeleton width={138} />
            </div>
            <div className="article-title">
              {/* <h1>{currentArticle.title}</h1> */}
              <TextSkeleton style={{ height: 40, marginBottom: 8 }} />
            </div>
            <div className="article-author">
              <SpanSkeleton width={156} />
            </div>
          </div>
          <div className="article-content">
            <TextSkeleton />
            <TextSkeleton />
            <TextSkeleton width="57%" />
            <br />
            <TextSkeleton />
            <TextSkeleton />
            <TextSkeleton />
            <TextSkeleton />
            <TextSkeleton width="83%" />
            <br />
            <TextSkeleton />
            <TextSkeleton />
            <TextSkeleton />
            <TextSkeleton />
            <TextSkeleton />
            <TextSkeleton width="67%" />
          </div>
        </div>
      </div>
    )
  }
}
