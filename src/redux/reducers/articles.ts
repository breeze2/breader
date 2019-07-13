import Immutable from 'immutable'
import { IArticle, IReduxAction } from '../../schemas'
import Utils from '../../utils';
import {
    ArticlesActionTypes,
    ISetArticlesFilterPayload,
    ISetArticlesPayload,
    ISetCurrentArticlePayload,
} from '../actions'

export interface IArticlesState {
    current: IArticle | null
    filter: string
    list: Immutable.List<IArticle>
}

export type IIArticlesState = Immutable.Record<IArticlesState> & Readonly<IArticlesState>

const initialArticlesState = Immutable.Record<IArticlesState>({
    current: null,
    filter: 'ALL',
    list: Immutable.List<IArticle>([]),
})()

const articlesReducer = (state = initialArticlesState, action: IReduxAction) => {
    const payload = action.payload;
    switch (action.type) {
        case ArticlesActionTypes.SET_CURRENT_ARTICLE:
            return handleSetCurrentArticle(state, payload)
        case ArticlesActionTypes.SET_ARTICLES_FILTER:
            return handleSetArticlesFilter(state, payload)

        case ArticlesActionTypes.SET_ARTICLES:
            return handleSetArticles(state, payload)

        default:
            return state
    }
}

function handleSetArticles(state: IIArticlesState, payload: ISetArticlesPayload) {
    let lastDateTime = ''
    payload.articles.forEach((article: IArticle) => {
        const dateTime = Utils.timeToDateString(article.time)
        if (lastDateTime !== dateTime) {
            lastDateTime = dateTime
            article.isDayFirst = true
        }
    })
    return state.set('list', Immutable.List<IArticle>(payload.articles))
        // .set('current', null)

}

function handleSetCurrentArticle(state: IIArticlesState, payload: ISetCurrentArticlePayload) {
    return state.set('current', payload.article)
}

function handleSetArticlesFilter(state: IIArticlesState, payload: ISetArticlesFilterPayload) {
    return state.set('filter', payload.filter)
}

export default articlesReducer
