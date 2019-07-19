import React, { CSSProperties, PureComponent } from "react";
import "../styles/Skeleton.less";

interface ISpanSkeletonProps {
    width?: number | string;
    className?: string;
    style?: CSSProperties;
}

export default class SpanSkeleton extends PureComponent<ISpanSkeletonProps> {
    public constructor(props: ISpanSkeletonProps) {
        super(props);
    }
    public render() {
        const { className, style, width } = this.props;
        const classes = 'span-skeleton skeleton-active ' + (className || '');
        return <span className={classes} style={{
            ...style,
            width,
        }} />;
    }
}
