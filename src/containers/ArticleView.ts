import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux'
import { Dispatch } from 'redux'
import ArticleView, { IArticleViewOwnProps, IArticleViewReduxDispatch, IArticleViewReduxState } from '../components/ArticleView'
import { asyncActionDispatcher, asyncStarArticleAction } from '../redux/actions'
import { IReduxAction, IReduxState } from '../schemas'

const mapStateToProps: MapStateToProps<IArticleViewReduxState, IArticleViewOwnProps, IReduxState> = (state: IReduxState) => ({
    articleContent: state.articles.selectedContent,
    articleId: state.articles.selectedId,
    articleIndex: state.articles.selectedIndex,
    articles: state.articles.list,
})

const mapDispatchToProps: MapDispatchToProps<IArticleViewReduxDispatch, IArticleViewOwnProps> = (dispatch: Dispatch<IReduxAction>) => ({
    asyncStarArticle: (articleId: string, isStarred: boolean) => asyncActionDispatcher(dispatch, asyncStarArticleAction(articleId, isStarred)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ArticleView)
