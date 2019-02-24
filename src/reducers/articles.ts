import { ArticlesActionTypes, InterfaceArticlesAction } from '../actions/articles'
import InterfaceArticle from '../schemas/InterfaceArticle'

const articles = (state: InterfaceArticle[] = [], action: InterfaceArticlesAction) => {
    switch (action.type) {
        case ArticlesActionTypes.ADD_ARTICLES:
            return state.concat(action.articles)
        case ArticlesActionTypes.SET_ARTICLES:
            return action.articles
        default:
            return state
    }
}

export default articles
