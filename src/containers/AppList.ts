import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { setArticleIdAction, setArticlesAction } from '../actions'
import AppList from '../components/AppList'
import InterfaceArticle from '../schemas/InterfaceArticle'

const mapStateToProps = (store: any, props: any) => {
    return {
        articleId: store.articleId,
        articles: store.articles,
        feedFavicons: store.feedFavicons,
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>, props: any) => ({
    setArticleId: (id: number) => dispatch(setArticleIdAction(id)),
    setArticles: (articles: InterfaceArticle[]) => dispatch(setArticlesAction(articles)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AppList)
