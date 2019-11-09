import { Empty } from 'antd'
import Immutable from 'immutable'
import React, { PureComponent, RefObject } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import {
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  List as VList,
} from 'react-virtualized'
import ArticleItem from '../containers/ArticleItem'
import { IArticle } from '../schemas'
import '../styles/ArticleVirtualList.less'
import Utils from '../utils'

export interface IArticleVirtualListOwnProps {
  scrollToIndex?: number
}

export interface IArticleVirtualListDispatchProps {
  selectArticle: (id: string, index: number) => Promise<IArticle | null>
}

export interface IArticleVirtualListStateProps {
  articles: Immutable.List<IArticle>
  currentArticle: IArticle | null
  selectedMenuKey: string
}

export interface IArticleVirtualListProps
  extends IArticleVirtualListOwnProps,
    IArticleVirtualListDispatchProps,
    IArticleVirtualListStateProps {}

export interface IArticleVirtualListState {
  cellCache: CellMeasurerCache
  isAffixVisible: boolean
  lastArticles: Immutable.List<IArticle>
  readItems: { [_id: string]: boolean }
  renderStartDate: string
}

class ArticleVirtualList extends PureComponent<
  IArticleVirtualListProps,
  IArticleVirtualListState
> {
  public static getDerivedStateFromProps(
    nextProps: IArticleVirtualListProps,
    prevState: IArticleVirtualListState
  ) {
    if (nextProps.articles !== prevState.lastArticles) {
      return {
        cellCache: new CellMeasurerCache({
          defaultHeight: 80,
          fixedWidth: true,
        }),
        lastArticles: nextProps.articles,
      }
    }
    return null
  }
  public scrollbar: RefObject<Scrollbars>
  public vlist: RefObject<VList>
  public updateRenderStartDate: (...params: any[]) => void
  public constructor(props: IArticleVirtualListProps) {
    super(props)
    this.vlist = React.createRef<VList>()
    this.scrollbar = React.createRef<Scrollbars>()
    this.state = {
      cellCache: new CellMeasurerCache({
        defaultHeight: 80,
        fixedWidth: true,
      }),
      isAffixVisible: false,
      lastArticles: props.articles,
      readItems: {},
      renderStartDate: '',
    }
    this.updateRenderStartDate = Utils.throttle(
      this._updateRenderStartDate,
      100
    )

    // Object.defineProperty(window, 'updateRenderStartDate', {value: this.updateRenderStartDate})
  }
  public componentDidUpdate(prevProps: IArticleVirtualListProps) {
    const props = this.props
    const vlist = this.vlist.current
    const sbar = this.scrollbar.current
    const index = props.scrollToIndex
    if (props.selectedMenuKey !== prevProps.selectedMenuKey) {
      if (sbar) {
        sbar.scrollToTop()
      }
      return
    }
    if (
      index !== undefined &&
      index > -1 &&
      index !== prevProps.scrollToIndex
    ) {
      if (sbar && vlist && vlist.Grid) {
        Utils.asyncRedo(
          () => {
            return new Promise(resolve => {
              const top = vlist.getOffsetForRow({ index })
              sbar.scrollTop(top)
              setImmediate(resolve)
            })
          },
          () => {
            const top = vlist.getOffsetForRow({ index })
            return sbar.getScrollTop() < top
          }
        ).then(() => {
          setImmediate(() => {
            const items = document.querySelectorAll('.vlist-item')
            items.forEach((item: any) => {
              if (
                item.dataset.index === index ||
                item.dataset.index === index + ''
              ) {
                item.click()
              }
            })
          })
        })
      }
    }
  }
  public handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const readItems = this.state.readItems
    const target = e.target
    const $item = (target as HTMLDivElement).closest('.vlist-item')
    if ($item) {
      const { id, index } = ($item as HTMLDivElement).dataset
      const article = this.props.currentArticle
      if (article && article._id === id) {
        // do nothing
      } else if (id && index) {
        this.props.selectArticle(id, parseInt(index, 10))
        readItems[id] = true
        this.setState({
          readItems: { ...readItems },
        })
      }
    }
  }
  public handleScrollbarScroll = (event: React.UIEvent) => {
    const vlist = this.vlist.current
    if (vlist && vlist.Grid) {
      const target = event.target
      const { scrollTop, scrollLeft } = target as HTMLDivElement
      vlist.Grid.handleScrollEvent({ scrollTop, scrollLeft })
    }
  }
  public render() {
    return (
      <div className="article-virtual-list" onClick={this.handleClick}>
        {this.state.isAffixVisible && (
          <div className="list-affix">{this.state.renderStartDate}</div>
        )}
        <AutoSizer>
          {({ width, height }) => (
            <Scrollbars
              autoHide
              ref={this.scrollbar}
              style={{ width, height }}
              onScroll={this.handleScrollbarScroll}>
              <VList
                ref={this.vlist}
                width={width}
                height={height}
                style={{ overflowX: 'visible', overflowY: 'visible' }}
                deferredMeasurementCache={this.state.cellCache}
                rowCount={this.props.articles.size}
                rowHeight={this.state.cellCache.rowHeight}
                rowRenderer={(info: any) => this._rowRenderer(info)}
                noRowsRenderer={() => this._noRowsRenderer()}
                onScroll={(info: any) => this._onScroll(info)}
              />
            </Scrollbars>
          )}
        </AutoSizer>
      </div>
    )
  }
  private _onScroll(info: any) {
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
  private _noRowsRenderer() {
    return (
      <div style={{ paddingTop: '30px' }}>
        <Empty />
      </div>
    )
  }
  private _rowRenderer(info: any) {
    const index = info.index
    const parent = info.parent
    const key = info.key
    const style = info.style
    const article = this.props.articles.get(index) as IArticle
    const currentArticle = this.props.currentArticle
    const isCurrent = currentArticle && article._id === currentArticle._id
    return (
      <CellMeasurer
        key={key}
        cache={this.state.cellCache}
        parent={parent}
        columnIndex={0}
        rowIndex={index}>
        <div
          style={style}
          data-id={article._id}
          data-index={index}
          className={index === 0 ? 'vlist-item first-list-item' : 'vlist-item'}>
          {article.isDayFirst && (
            <div className="date-divid">
              {Utils.timeToDateString(article.time)}
            </div>
          )}
          <ArticleItem
            author={article.author}
            guid={article._id}
            time={article.time}
            feedId={article.feedId}
            title={article.title}
            summary={article.summary}
            className={
              (article.isUnread && !this.state.readItems[article._id]
                ? 'item-is-unread'
                : '') + (isCurrent ? ' item-is-selected' : '')
            }
          />
        </div>
      </CellMeasurer>
    )
  }
}

export default ArticleVirtualList
