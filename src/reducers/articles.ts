import { ArticlesActionTypes, InterfaceArticlesAction } from '../actions/articles'
import InterfaceArticle from '../schemas/InterfaceArticle'

let lastDateStr = ''
const articles = (state: InterfaceArticle[] = [], action: InterfaceArticlesAction) => {
    switch (action.type) {
        case ArticlesActionTypes.ADD_ARTICLES:
            lastDateStr = ''
            action.articles.forEach((article) => {
                if (lastDateStr !== article.date) {
                    lastDateStr = article.date
                    article.is_dayfirst = true
                }
            })
            return state.concat(action.articles)
        case ArticlesActionTypes.SET_ARTICLES:
            lastDateStr = ''
            action.articles.forEach((article) => {
                if (lastDateStr !== article.date) {
                    lastDateStr = article.date
                    article.is_dayfirst = true
                }
            })
            return action.articles
        default:
            return state
    }
}

export default articles
