import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux'
import { Dispatch } from 'redux'
import ArticleView, {
  IArticleViewDispatchProps,
  IArticleViewOwnProps,
  IArticleViewStateProps,
} from '../components/ArticleView'
import { asyncActionDispatcher, asyncStarArticleAction } from '../redux/actions'
import { IReduxAction, IReduxState } from '../schemas'

const mapStateToProps: MapStateToProps<
  IArticleViewStateProps,
  IArticleViewOwnProps,
  IReduxState
> = (state: IReduxState) => ({
  articles: state.articles.list,
  currentArticle: state.articles.current,
  feedsMap: state.feeds.map,
  isUpdatingCurrentArticle: state.articles.isUpdatingCurrent,
})

const mapDispatchToProps: MapDispatchToProps<
  IArticleViewDispatchProps,
  IArticleViewOwnProps
> = (dispatch: Dispatch<IReduxAction>) => ({
  asyncStarArticle: (articleId: string, isStarred: boolean) =>
    asyncActionDispatcher(
      dispatch,
      asyncStarArticleAction(articleId, isStarred)
    ),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleView)
