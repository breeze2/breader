import { IArticle } from '../../schemas'
import { actionCreator } from './helpers'

export const ArticlesActionTypes = {
    SET_ARTICLES: 'SET_ARTICLES',
    SET_ARTICLES_FILTER: 'SET_ARTICLES_FILTER',
    SET_CURRENT_ARTICLE: 'SET_CURRENT_ARTICLE',
    SET_IS_FETCHING: 'SET_IS_FETCHING',
    SET_IS_UPDATING_CURRENT: 'SET_IS_UPDATING_CURRENT',

    ASYNC_FETCH_ARTICLES: 'ASYNC_FETCH_ARTICLES',
    ASYNC_FILTER_ARTICLES: 'ASYNC_FILTER_ARTICLES',
    ASYNC_SELECT_AND_READ_ARTICLE: 'ASYNC_SELECT_AND_READ_ARTICLE',
    ASYNC_SET_ALL_ARTICLES_READ: 'ASYNC_SET_ALL_ARTICLES_READ',
    ASYNC_STAR_ARTICLE: 'ASYNC_STAR_ARTICLE',
}

export interface ISetCurrentArticlePayload { article: IArticle | null }
export const setCurrentArticleAction = (article: IArticle | null) =>
    actionCreator<ISetCurrentArticlePayload>(ArticlesActionTypes.SET_CURRENT_ARTICLE)({ article })

export interface ISetArticlesFilterPayload { filter: string }
export const setArticlesFilterAction = (filter: string) =>
    actionCreator<ISetArticlesFilterPayload>(ArticlesActionTypes.SET_ARTICLES_FILTER)({ filter })

export interface ISetArticlesPayload { articles: IArticle[]}
export const setArticlesAction = (articles: IArticle[]) =>
    actionCreator<ISetArticlesPayload>(ArticlesActionTypes.SET_ARTICLES)({ articles })

export interface ISetIsFetchingArticlePayload { isFetching: boolean }
export const setIsFetchingArticleAction = (isFetching: boolean) =>
    actionCreator<ISetIsFetchingArticlePayload>(ArticlesActionTypes.SET_IS_UPDATING_CURRENT)({ isFetching })

export interface ISetIsUpdatingCurrentArticlePayload { isUpdatingCurrent: boolean }
export const setIsUpdatingCurrentArticleAction = (isUpdatingCurrent: boolean) =>
    actionCreator<ISetIsUpdatingCurrentArticlePayload>(ArticlesActionTypes.SET_IS_UPDATING_CURRENT)({ isUpdatingCurrent })

export const asyncFetchArticlesAction = () =>
    actionCreator<void>(ArticlesActionTypes.ASYNC_FETCH_ARTICLES)()

export interface IAsyncFilterArticlesPayload { filter: string }
export const asyncFilterArticlesAction = (filter: string) =>
    actionCreator<IAsyncFilterArticlesPayload>(ArticlesActionTypes.ASYNC_FILTER_ARTICLES)({ filter })

export interface IAsyncSelectAndReadArticlePayload { articleId: string, articleIndex: number }
export const asyncSelectAndReadArticleAction = (articleId: string, articleIndex: number) =>
    actionCreator<IAsyncSelectAndReadArticlePayload>(ArticlesActionTypes.ASYNC_SELECT_AND_READ_ARTICLE)({ articleId, articleIndex })

export interface IAsyncStarArticlePayload { articleId: string, isStarred: boolean }
export const asyncStarArticleAction = (articleId: string, isStarred: boolean) =>
    actionCreator<IAsyncStarArticlePayload>(ArticlesActionTypes.ASYNC_STAR_ARTICLE)({ articleId, isStarred })

export interface IAsyncSetAllArticlesReadPayload { articleIds: string[] }
export const asyncSetAllArticlesReadAction = (articleIds: string[]) =>
    actionCreator<IAsyncSetAllArticlesReadPayload>(ArticlesActionTypes.ASYNC_SET_ALL_ARTICLES_READ)({ articleIds })
