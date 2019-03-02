import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import ArticleView from '../components/ArticleView'
import { asyncStarArticleAction } from '../redux/actions'

const mapStateToProps = (store: any, props: any) => {
    return {
        articleContent: store.articles.get('selectedContent'),
        articleId: store.articles.get('selectedId'),
        articleIndex: store.articles.get('selectedIndex'),
        articles: store.articles.get('list'),
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>, props: any) => ({
    asyncStarArticle: (articleId: number, isStarred: boolean) => dispatch(asyncStarArticleAction(articleId, isStarred)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ArticleView)
