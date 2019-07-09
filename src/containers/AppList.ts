import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux'
import { Dispatch } from 'redux'
import AppList, { IAppListOwnProps, IAppListReduxDispatch, IAppListReduxState } from '../components/AppList'
import { asyncActionDispatcher, asyncFilterArticlesAction, asyncSetAllArticlesReadAction } from '../redux/actions'
import { IReduxAction, IReduxState } from '../schemas'

const mapStateToProps: MapStateToProps<IAppListReduxState, IAppListOwnProps, IReduxState> = (state: IReduxState) => ({
    articles: state.articles.list,
    articlesFilter: state.articles.filter,
    selectedMenuKey: state.menu.selectedKey,
})

const mapDispatchToProps: MapDispatchToProps<IAppListReduxDispatch, IAppListOwnProps> = (dispatch: Dispatch<IReduxAction>) => ({
    asyncFilterArticles: (filter: string) => asyncActionDispatcher(dispatch, asyncFilterArticlesAction(filter)),
    asyncSetAllArticlesRead: (ids: string[]) => asyncActionDispatcher(dispatch, asyncSetAllArticlesReadAction(ids)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AppList)
