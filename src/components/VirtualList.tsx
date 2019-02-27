import { Affix, Empty } from 'antd'
import { List } from 'immutable'
import React, { Component, PureComponent, RefObject } from 'react'
import { AutoSizer, CellMeasurer, CellMeasurerCache, List as VList, WindowScroller } from 'react-virtualized'
import ListItem from '../containers/ListItem'
import InterfaceArticle from '../schemas/InterfaceArticle'
import '../styles/VirtualList.less'
import Utils from '../utils'

interface InterfaceVirtualListProps {
    articleId: number
    articles: List<InterfaceArticle>
    onClick?: (e: any) => any
}

interface InterfaceVirtualListState {
    dateStr: string
    isAffixVisible: boolean
    itemHeights: number[]
}

class VirtualList extends PureComponent<InterfaceVirtualListProps> {
    public vlist: RefObject<VList>
    public state: InterfaceVirtualListState
    public cache: CellMeasurerCache
    public updateRenderStartDate: (...params: any[]) => void
    public constructor(props: InterfaceVirtualListProps) {
        super(props)
        this.vlist = React.createRef()
        this.cache = new CellMeasurerCache ({
            defaultHeight: 80,
            fixedWidth: true,
        })
        this.state = {
            dateStr: '',
            isAffixVisible: false,
            itemHeights: [],
        }
        this.updateRenderStartDate = Utils.throttle(this._updateRenderStartDate, 100)

        Object.defineProperty(window, 'updateRenderStartDate', {value: this.updateRenderStartDate})
    }
    // public componentWillReceiveProps () {
    //     console.log(arguments, 22)
    // }
    // public componentWillUpdate() {
    //     console.log(arguments, 11)
    // }
    // public componentDidCatch () {
    //     console.log(arguments, 33)
    // }
    public render() {
        return (
            <div className="virtual-list" onClick={(e: any) => {if (this.props.onClick) {this.props.onClick(e)}}}>
                {this.state.isAffixVisible && <div className="list-affix" >{this.state.dateStr}</div>}
                <AutoSizer>
                    {({ width, height }) => (
                        <VList ref={this.vlist}
                            width={width}
                            height={height}
                            deferredMeasurementCache={this.cache}
                            rowCount={this.props.articles.size}
                            rowHeight={this.cache.rowHeight}
                            rowRenderer={(info: any) => this._rowRenderer(info)}
                            noRowsRenderer={() => this._noRowsRenderer()}
                            onScroll={(info: any) => this._onScroll(info)}
                        />
                    )}
                </AutoSizer>
            </div>
        )
    }
    private _onScroll (info: any) {
        if (info.scrollTop > 3 && this.state.isAffixVisible === false) {
            this.setState({
                isAffixVisible: true,
            })
        }
        if (info.scrollTop <= 3 && this.state.isAffixVisible === true) {
            this.setState({
                isAffixVisible: false,
            })
        }
        this.updateRenderStartDate.call(this)
    }
    private _updateRenderStartDate() {
        const vlist = this.vlist.current
        if (vlist && vlist.Grid) {
            const startIndex = (vlist.Grid as any)._renderedRowStartIndex
            const startArticle = this.props.articles.get(startIndex)
            if (startArticle && (startArticle.date !== this.state.dateStr)) {
                this.setState({
                    dateStr: startArticle.date,
                })
            }
            // console.log(vlist.Grid, startIndex)
        }
    }
    private _noRowsRenderer () {
        return (
            <div style={{ marginTop: '30px' }}>
                <Empty />
            </div>
        )
    }
    private _rowRenderer(info: any) {
        const index = info.index
        const parent = info.parent
        const key = info.key
        const style = info.style
        const article = (this.props.articles.get(index) as InterfaceArticle)

        return (
            <CellMeasurer key={key} cache={this.cache} parent={parent} columnIndex={0} rowIndex={index} >
                <div style={style} className={index === 0 ? 'first-list-item' : ''}>
                    {article.is_dayfirst && <div className="date-divid">{article.date}</div>}
                    <ListItem author={article.author}
                        guid={article.guid}
                        feedTitle={article.feed_title}
                        time={article.time}
                        inid={article.id}
                        feedId={article.feed_id}
                        title={article.title}
                        summary={article.summary}
                        className={(article.is_unread ? 'is-unread-item' : '') + (article.id === this.props.articleId ? ' is-selected-item' : '')}
                    />
                </div>
            </CellMeasurer>
        )
    }
}

export default VirtualList
