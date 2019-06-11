import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux'
import { Dispatch } from 'redux'
import AppList, { IAppListOwnProps, IAppListReduxDispatch, IAppListReduxState } from '../components/AppList'
import { asyncFilterArticlesAction, asyncSetAllArticlesReadAction, IAction } from '../redux/actions'
import { IState } from '../redux/reducers'

const mapStateToProps: MapStateToProps<IAppListReduxState, IAppListOwnProps, IState> = (state: IState) => ({
    allArticlesReadAt: state.articles.get('allReadAt'),
    articlesFilter: state.articles.get('filter'),
    selectedMenuKey: state.menu.selectedKey,
})

const mapDispatchToProps: MapDispatchToProps<IAppListReduxDispatch, IAppListOwnProps> = (dispatch: Dispatch<IAction>) => ({
    asyncFilterArticles: (filter: string) => dispatch(asyncFilterArticlesAction(filter)),
    asyncSetAllArticlesRead: () => dispatch(asyncSetAllArticlesReadAction()),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AppList)
