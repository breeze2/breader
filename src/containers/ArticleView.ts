import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import ArticleView from '../components/ArticleView'

const mapStateToProps = (store: any, props: any) => {
    return {
        articleContent: store.articles.get('selectedContent'),
        articleIndex: store.articles.get('selectedIndex'),
        articleId: store.articles.get('selectedId'),
        articles: store.articles.get('list'),
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>, props: any) => ({})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ArticleView)
