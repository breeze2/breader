import { connect, MapDispatchToPropsFunction, MapStateToProps } from 'react-redux'
import { Dispatch } from 'redux'
import AppList, { IAppListReduxData, IAppListReduxFunc } from '../components/AppList'
import { asyncFilterArticlesAction, asyncSetAllArticlesReadAction, IAction } from '../redux/actions'

const mapStateToProps: MapStateToProps<IAppListReduxData, any, any> = (store: any, props: any) => ({
    allArticlesReadAt: store.articles.get('allReadAt'),
    articlesFilter: store.articles.get('filter'),
    selectedMenuKey: store.menu.get('selectedKey'),
})

const mapDispatchToProps: MapDispatchToPropsFunction<IAppListReduxFunc, any> = (dispatch: Dispatch<IAction>, props: any): IAppListReduxFunc => ({
    asyncFilterArticles: (filter: string) => dispatch(asyncFilterArticlesAction(filter)),
    asyncSetAllArticlesRead: () => dispatch(asyncSetAllArticlesReadAction()),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AppList)
