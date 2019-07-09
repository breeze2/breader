import { Affix, Empty } from 'antd'
import { List, Map } from 'immutable'
import React, { Component, PureComponent, RefObject } from 'react'
import { AutoSizer, CellMeasurer, CellMeasurerCache, List as VList, WindowScroller } from 'react-virtualized'
import ListItem from '../containers/ListItem'
import { IArticle } from '../schemas'
import '../styles/VirtualList.less'
import Utils from '../utils'

export interface IVirtualListOwnProps {
    scrollToIndex?: number
}

export interface IVirtualListReduxDispatch {
    selectArticle: (id: string, index: number) => Promise<IArticle | null>
}

export interface IVirtualListReduxState {
    currentArticle: IArticle | null
    articles: List<IArticle>
}

interface IVirtualListProps extends IVirtualListOwnProps, IVirtualListReduxDispatch, IVirtualListReduxState {
}

interface IVirtualListState {
    renderStartDate: string
    isAffixVisible: boolean
    readItems: any
}

class VirtualList extends PureComponent<IVirtualListProps> {
    public vlist: RefObject<VList>
    public state: IVirtualListState
    public cellCache: CellMeasurerCache
    public updateRenderStartDate: (...params: any[]) => void
    public constructor(props: IVirtualListProps) {
        super(props)
        this.vlist = React.createRef()
        this.cellCache = new CellMeasurerCache ({
            defaultHeight: 80,
            fixedWidth: true,
        })
        this.state = {
            isAffixVisible: false,
            readItems: {},
            renderStartDate: '',
        }
        this.updateRenderStartDate = Utils.throttle(this._updateRenderStartDate, 100)

        // Object.defineProperty(window, 'updateRenderStartDate', {value: this.updateRenderStartDate})
    }
    public componentWillReceiveProps(props: IVirtualListProps) {
        if (props.articles !== this.props.articles) {
            this.cellCache = new CellMeasurerCache({
                defaultHeight: 80,
                fixedWidth: true,
            })
        }
        if (props.scrollToIndex !== undefined && props.scrollToIndex !== undefined &&
            props.scrollToIndex > -1 && this.props.scrollToIndex !== props.scrollToIndex) {
            const vlist = this.vlist.current
            const index = props.scrollToIndex
            if (vlist) {
                vlist.scrollToRow(props.scrollToIndex + 3)
                setTimeout(() => {
                    const items = document.querySelectorAll('.vlist-item')
                    items.forEach((item: any) => {
                        if (item.dataset.index === index || item.dataset.index === index + '') {
                            item.click()
                        }
                    })
                }, 200)
            }
        }
    }
    // public componentWillUpdate() {
    //     console.log(arguments, 11)
    // }
    // public componentDidCatch () {
    //     console.log(arguments, 33)
    // }
    public handleVirtualListClick = (e: any) => {
        const readItems = this.state.readItems
        const target = e.target
        const $listItem = target.closest('.vlist-item')
        if ($listItem && $listItem.dataset) {
            this.props.selectArticle($listItem.dataset.id, parseInt($listItem.dataset.index, 10))
            readItems[$listItem.dataset.id] = 1
            this.setState({
                readItems: { ...readItems },
            })
        }
    }
    public render() {
        return (
            <div className="virtual-list" onClick={this.handleVirtualListClick}>
                {this.state.isAffixVisible && <div className="list-affix" >{this.state.renderStartDate}</div>}
                <AutoSizer>
                    {({ width, height }) => (
                        <VList ref={this.vlist}
                            width={width}
                            height={height}
                            deferredMeasurementCache={this.cellCache}
                            rowCount={this.props.articles.size}
                            rowHeight={this.cellCache.rowHeight}
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
            if (startArticle) {
                const dateTime = Utils.timeToDateString(startArticle.time)
                if (dateTime !== this.state.renderStartDate) {
                    this.setState({
                        renderStartDate: dateTime,
                    })
                }
            }
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
        const article = (this.props.articles.get(index) as IArticle)
        const currentArticle = this.props.currentArticle
        const isCurrent = currentArticle && article._id === currentArticle._id
        return (
            <CellMeasurer key={key} cache={this.cellCache} parent={parent} columnIndex={0} rowIndex={index} >
                <div style={style}
                    data-id={article._id} data-index={index}
                    className={index === 0 ? 'vlist-item first-list-item' : 'vlist-item'}>
                    {article.isDayFirst && <div className="date-divid">{Utils.timeToDateString(article.time)}</div>}
                    <ListItem author={article.author}
                        guid={article._id}
                        time={article.time}
                        feedId={article.feedId}
                        title={article.title}
                        summary={article.summary}
                        className={(article.isUnread && !this.state.readItems[(article._id)] ? 'item-is-unread' : '') + (isCurrent ? ' item-is-selected' : '')}
                    />
                </div>
            </CellMeasurer>
        )
    }
}

export default VirtualList
