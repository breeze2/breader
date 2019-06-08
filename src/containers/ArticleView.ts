import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux'
import { Dispatch } from 'redux'
import ArticleView, { IArticleViewOwnProps, IArticleViewReduxDispatch, IArticleViewReduxState } from '../components/ArticleView'
import { asyncStarArticleAction, IAction } from '../redux/actions'
import { IState } from '../redux/reducers'

const mapStateToProps: MapStateToProps<IArticleViewReduxState, IArticleViewOwnProps, IState> = (state: IState) => ({
    articleContent: state.articles.selectedContent,
    articleId: state.articles.selectedId,
    articleIndex: state.articles.selectedIndex,
    articles: state.articles.list,
})

const mapDispatchToProps: MapDispatchToProps<IArticleViewReduxDispatch, IArticleViewOwnProps> = (dispatch: Dispatch<IAction>) => ({
    asyncStarArticle: (articleId: number, isStarred: boolean) => dispatch(asyncStarArticleAction(articleId, isStarred)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ArticleView)
