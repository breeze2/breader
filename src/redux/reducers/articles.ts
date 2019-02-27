import Immutable, { List } from 'immutable'
import InterfaceArticle from '../../schemas/InterfaceArticle'
import { ArticlesActionTypes, InterfaceAction } from '../actions'

const initialArticlesState = Immutable.fromJS({
    list: [],
    selectedId: 0,
})

let lastDateStr = ''
const articles = (state = initialArticlesState, action: InterfaceAction) => {
    switch (action.type) {
        case ArticlesActionTypes.SELECT_ARTICLE:
            return state.set('selectedId', action.payload.articleId)
        case ArticlesActionTypes.SET_ARTICLES:
            lastDateStr = ''
            action.payload.articles.forEach((article: InterfaceArticle) => {
                if (lastDateStr !== article.date) {
                    lastDateStr = article.date
                    article.is_dayfirst = true
                }
            })
            return state.set('list', List<InterfaceArticle>(action.payload.articles))
        default:
            return state
    }
}

export default articles
