import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux'
import { Dispatch } from 'redux'
import ArticleList, { IArticleListOwnProps, IArticleListReduxDispatch, IArticleListReduxState } from '../components/ArticleList'
import { asyncActionDispatcher, asyncFilterArticlesAction, asyncSetAllArticlesReadAction } from '../redux/actions'
import { IReduxAction, IReduxState } from '../schemas'

const mapStateToProps: MapStateToProps<IArticleListReduxState, IArticleListOwnProps, IReduxState> = (state: IReduxState) => ({
    articles: state.articles.list,
    articlesFilter: state.articles.filter,
    isFetchingArticles: state.articles.isFetching,
    selectedMenuKey: state.menu.selectedKey,
})

const mapDispatchToProps: MapDispatchToProps<IArticleListReduxDispatch, IArticleListOwnProps> = (dispatch: Dispatch<IReduxAction>) => ({
    asyncFilterArticles: (filter: string) => asyncActionDispatcher(dispatch, asyncFilterArticlesAction(filter)),
    asyncSetAllArticlesRead: (ids: string[]) => asyncActionDispatcher(dispatch, asyncSetAllArticlesReadAction(ids)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ArticleList)
