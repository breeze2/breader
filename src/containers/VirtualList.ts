import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import VirtualList from '../components/VirtualList'
import { selectArticleAction } from '../redux/actions'

const mapStateToProps = (store: any, props: any) => {
    return {
        articleId: store.articles.get('selectedId'),
        articles: store.articles.get('list'),
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>, props: any) => ({
    selectArticle: (id: number) => dispatch(selectArticleAction(id)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(VirtualList)
