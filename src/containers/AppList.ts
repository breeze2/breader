import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import AppList from '../components/AppList'
import { asyncFilterArticlesAction } from '../redux/actions'

const mapStateToProps = (store: any, props: any) => {
    return {
        articlesFilter: store.articles.get('filter'),
        selectedMenuKey: store.menu.get('selectedKey'),
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>, props: any) => ({
    asyncFilterArticles: (filter: string) => dispatch(asyncFilterArticlesAction(filter)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AppList)
