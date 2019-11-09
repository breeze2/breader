import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux'
import { Dispatch } from 'redux'
import ArticleVirtualList, {
  IArticleVirtualListDispatchProps,
  IArticleVirtualListOwnProps,
  IArticleVirtualListStateProps,
} from '../components/ArticleVirtualList'
import {
  asyncActionDispatcher,
  asyncSelectAndReadArticleAction,
} from '../redux/actions'
import { IReduxAction, IReduxState } from '../schemas'

const mapStateToProps: MapStateToProps<
  IArticleVirtualListStateProps,
  IArticleVirtualListOwnProps,
  IReduxState
> = (state: IReduxState) => ({
  articles: state.articles.list,
  currentArticle: state.articles.current,
  selectedMenuKey: state.menu.selectedKey,
})

const mapDispatchToProps: MapDispatchToProps<
  IArticleVirtualListDispatchProps,
  IArticleVirtualListOwnProps
> = (dispatch: Dispatch<IReduxAction>) => ({
  selectArticle: (id: string, index: number) =>
    asyncActionDispatcher(dispatch, asyncSelectAndReadArticleAction(id, index)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleVirtualList)
