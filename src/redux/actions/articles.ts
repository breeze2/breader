import { IArticle, IReduxAction } from '../../schemas'

export const ArticlesActionTypes = {
    SET_ARTICLES: 'SET_ARTICLES',
    SET_ARTICLES_FILTER: 'SET_ARTICLES_FILTER',
    SET_CURRENT_ARTICLE: 'SET_CURRENT_ARTICLE',

    ASYNC_FETCH_ARTICLES: 'ASYNC_FETCH_ARTICLES',
    ASYNC_FILTER_ARTICLES: 'ASYNC_FILTER_ARTICLES',
    ASYNC_SELECT_AND_READ_ARTICLE: 'ASYNC_SELECT_AND_READ_ARTICLE',
    ASYNC_SET_ALL_ARTICLES_READ: 'ASYNC_SET_ALL_ARTICLES_READ',
    ASYNC_STAR_ARTICLE: 'ASYNC_STAR_ARTICLE',
}

export interface ISetCurrentArticlePayload { article: IArticle | null }
export const setCurrentArticleAction = (article: IArticle | null): IReduxAction<ISetCurrentArticlePayload> => ({
    payload: { article },
    type: ArticlesActionTypes.SET_CURRENT_ARTICLE,
})

export interface ISetArticlesFilterPayload { filter: string }
export const setArticlesFilterAction = (filter: string): IReduxAction<ISetArticlesFilterPayload> => ({
    payload: { filter },
    type: ArticlesActionTypes.SET_ARTICLES_FILTER,
})

export interface ISetArticlesPayload { articles: IArticle[]}
export const setArticlesAction = (articles: IArticle[]): IReduxAction<ISetArticlesPayload> => ({
    payload: { articles },
    type: ArticlesActionTypes.SET_ARTICLES,
})

export const asyncFetchArticlesAction = (): IReduxAction<null> => ({
    payload: null,
    type: ArticlesActionTypes.ASYNC_FETCH_ARTICLES,
})

export interface IAsyncFilterArticlesPayload { filter: string }
export const asyncFilterArticlesAction = (filter: string): IReduxAction<IAsyncFilterArticlesPayload> => ({
    payload: { filter },
    type: ArticlesActionTypes.ASYNC_FILTER_ARTICLES,
})

export interface IAsyncSelectAndReadArticlePayload { articleId: string, articleIndex: number }
export const asyncSelectAndReadArticleAction = (articleId: string, articleIndex: number): IReduxAction<IAsyncSelectAndReadArticlePayload> => ({
    payload: { articleId, articleIndex },
    type: ArticlesActionTypes.ASYNC_SELECT_AND_READ_ARTICLE,
})

export interface IAsyncStarArticlePayload { articleId: string, isStarred: boolean }
export const asyncStarArticleAction = (articleId: string, isStarred: boolean): IReduxAction<IAsyncStarArticlePayload> => ({
    payload: { articleId, isStarred },
    type: ArticlesActionTypes.ASYNC_STAR_ARTICLE,
})

export interface IAsyncSetAllArticlesReadPayload { articleIds: string[] }
export const asyncSetAllArticlesReadAction = (articleIds: string[]): IReduxAction<IAsyncSetAllArticlesReadPayload> => ({
    payload: { articleIds },
    type: ArticlesActionTypes.ASYNC_SET_ALL_ARTICLES_READ,
})
