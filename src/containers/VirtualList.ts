import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import VirtualList from '../components/VirtualList'

const mapStateToProps = (store: any, props: any) => {
    return {
        articleId: store.articles.get('selectedId'),
        articles: store.articles.get('list'),
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>, props: any) => ({
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(VirtualList)
