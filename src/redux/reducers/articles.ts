import Immutable from 'immutable'
import { IArticle, IArticlesState, IIArticlesState, IReduxAction, } from '../../schemas'
import Utils from '../../utils';
import {
    ArticlesActionTypes,
    ISetArticlesFilterPayload,
    ISetArticlesPayload,
    ISetCurrentArticlePayload,
    ISetIsFetchingArticlesPayload,
    ISetIsUpdatingCurrentArticlePayload,
} from '../actions'

const initialArticlesState = Immutable.Record<IArticlesState>({
    current: null,
    filter: 'ALL',
    isFetching: false,
    isUpdatingCurrent: false,
    list: Immutable.List<IArticle>([]),
})()

const articlesReducer = (state = initialArticlesState, action: IReduxAction) => {
    const payload = action.payload;
    switch (action.type) {
        case ArticlesActionTypes.SET_CURRENT_ARTICLE:
            return handleSetCurrentArticle(state, payload)
        case ArticlesActionTypes.SET_ARTICLES_FILTER:
            return handleSetArticlesFilter(state, payload)
        case ArticlesActionTypes.SET_IS_FETCHING:
            return handleSetIsFetchingArticle(state, payload)
        case ArticlesActionTypes.SET_IS_UPDATING_CURRENT:
            return handleSetIsUpdatingCurrentArticle(state, payload)
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

function handleSetIsFetchingArticle(state: IIArticlesState, payload: ISetIsFetchingArticlesPayload) {
    return state.set('isFetching', payload.isFetching)
}

function handleSetIsUpdatingCurrentArticle(state: IIArticlesState, payload: ISetIsUpdatingCurrentArticlePayload) {
    return state.set('isUpdatingCurrent', payload.isUpdatingCurrent)
}

export default articlesReducer
