import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux'
import { Dispatch } from 'redux'
import AppList, { IAppListOwnProps, IAppListReduxDispatch, IAppListReduxState } from '../components/AppList'
import { asyncFilterArticlesAction, asyncSetAllArticlesReadAction } from '../redux/actions'
import { IReduxAction, IReduxState } from '../schemas'

const mapStateToProps: MapStateToProps<IAppListReduxState, IAppListOwnProps, IReduxState> = (state: IReduxState) => ({
    allArticlesReadAt: state.articles.get('allReadAt'),
    articlesFilter: state.articles.get('filter'),
    selectedMenuKey: state.menu.selectedKey,
})

const mapDispatchToProps: MapDispatchToProps<IAppListReduxDispatch, IAppListOwnProps> = (dispatch: Dispatch<IReduxAction>) => ({
    asyncFilterArticles: (filter: string) => dispatch(asyncFilterArticlesAction(filter)),
    asyncSetAllArticlesRead: () => dispatch(asyncSetAllArticlesReadAction()),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AppList)
