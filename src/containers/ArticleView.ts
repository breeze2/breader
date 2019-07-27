import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux'
import { Dispatch } from 'redux'
import ArticleView, { IArticleViewOwnProps, IArticleViewReduxDispatch, IArticleViewReduxState } from '../components/ArticleView'
import { asyncActionDispatcher, asyncStarArticleAction } from '../redux/actions'
import { IReduxAction, IReduxState } from '../schemas'

const mapStateToProps: MapStateToProps<IArticleViewReduxState, IArticleViewOwnProps, IReduxState> = (state: IReduxState) => ({
    articles: state.articles.list,
    currentArticle: state.articles.current,
    feedsMap: state.feeds.map,
    isUpdatingCurrentArticle: state.articles.isUpdatingCurrent,
})

const mapDispatchToProps: MapDispatchToProps<IArticleViewReduxDispatch, IArticleViewOwnProps> = (dispatch: Dispatch<IReduxAction>) => ({
    asyncStarArticle: (articleId: string, isStarred: boolean) => asyncActionDispatcher(dispatch, asyncStarArticleAction(articleId, isStarred)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ArticleView)
