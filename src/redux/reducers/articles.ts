import Immutable from 'immutable'
import { IArticle, IReduxAction } from '../../schemas'
import Utils from '../../utils';
import { ArticlesActionTypes } from '../actions'

export interface IArticlesState {
    allReadAt: number
    filter: string
    list: Immutable.List<IArticle>
    selectedContent: string,
    selectedId: string,
    selectedIndex: number,
}

const initialArticlesState = Immutable.Record<IArticlesState>({
    allReadAt: 0,
    filter: 'ALL',
    list: Immutable.List<IArticle>([]),
    selectedContent: '',
    selectedId: '',
    selectedIndex: -1,
})()

let lastDateTime = ''
const articles = (state = initialArticlesState, action: IReduxAction) => {
    switch (action.type) {
        case ArticlesActionTypes.SET_ALL_ARTICLES_READ_AT:
            return state.set('allReadAt', action.payload.allReadAt)
        case ArticlesActionTypes.SET_SELECTED_ARTICLE:
            return state.set('selectedId', action.payload.articleId).set('selectedIndex', action.payload.articleIndex)
        case ArticlesActionTypes.SET_ARTICLES_FILTER:
            return state.set('filter', action.payload.filter)
        case ArticlesActionTypes.SET_SELECTED_ARTICLE_CONTENT:
            return state.set('selectedContent', action.payload.articleContent)
        case ArticlesActionTypes.SET_ARTICLES:
            lastDateTime = ''
            action.payload.articles.forEach((article: IArticle) => {
                const dateTime = Utils.timeToDateString(article.time)
                if (lastDateTime !== dateTime) {
                    lastDateTime = dateTime
                    article.isDayFirst = true
                }
            })
            return state.set('list', Immutable.List<IArticle>(action.payload.articles))
                .set('selectedId', '')
                .set('selectedIndex', -1)
                .set('selectedContent', '')
        default:
            return state
    }
}

export default articles
