import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import AppList from '../components/AppList'
import { asyncFilterArticlesAction, asyncSetAllArticlesReadAction } from '../redux/actions'

const mapStateToProps = (store: any, props: any) => {
    return {
        allArticlesReadAt: store.articles.get('allReadAt'),
        articlesFilter: store.articles.get('filter'),
        selectedMenuKey: store.menu.get('selectedKey'),
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>, props: any) => ({
    asyncFilterArticles: (filter: string) => dispatch(asyncFilterArticlesAction(filter)),
    asyncSetAllArticlesRead: () => dispatch(asyncSetAllArticlesReadAction()),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AppList)
