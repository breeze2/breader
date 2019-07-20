import React, { CSSProperties, PureComponent } from 'react'
import ArticleItemSkeleton from './ArticleItemSkeleton'
import SpanSkeleton from './SpanSkeleton'

import '../styles/Skeletons.less'

interface IArticleListSkeletonProps {
    className?: string
    row: number
    style?: CSSProperties
}

export default class ArticleListSkeleton extends PureComponent<
    IArticleListSkeletonProps
> {
    public constructor(props: IArticleListSkeletonProps) {
        super(props)
    }
    public render() {
        const { className, row, style } = this.props
        const classes = 'article-list-skeleton ' + (className || '')
        const list = Array(row)
            .fill(0)
            .map((el, i) => i)
        return (
            <div className={classes} style={style}>
                <SpanSkeleton width={90} style={{ marginLeft: 8 }} />
                {list.map(item => (
                    <ArticleItemSkeleton key={item} />
                ))}
            </div>
        )
    }
}
