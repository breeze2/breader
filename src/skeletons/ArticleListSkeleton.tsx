import React, { CSSProperties, PureComponent } from 'react'
import ArticleItemSkeleton from "./ArticleItemSkeleton"
import SpanSkeleton from './SpanSkeleton'

import '../styles/Skeleton.less'

interface IArticleListSkeletonProps {
    row: number
    style?: CSSProperties
}

export default class ArticleListSkeleton extends PureComponent<IArticleListSkeletonProps> {
    public constructor(props: IArticleListSkeletonProps) {
        super(props)
    }
    public render() {
        const { row, style } = this.props;
        const list = Array(row).fill(0).map((el, i) => i)
        return (<div className="article-list-skeleton" style={style} >
            <SpanSkeleton width={90} style={{marginLeft: 8}} />
            {list.map(item => (
                <ArticleItemSkeleton key={item} />
            ))}
        </div>
        );
    }
}
