import InterfaceArticle from '../schemas/InterfaceArticle'

export interface InterfaceArticlesAction {
    articles: InterfaceArticle[]
    type: string
}

export const ArticlesActionTypes = {
    ADD_ARTICLES: 'ADD_ARTICLES',
    SET_ARTICLES: 'SET_ARTICLES',
}

export const addArticlesAction = (articles: InterfaceArticle[]): InterfaceArticlesAction => ({
    articles,
    type: 'ADD_ARTICLES',
})

export const setArticlesAction = (articles: InterfaceArticle[]): InterfaceArticlesAction => ({
    articles,
    type: 'SET_ARTICLES',
})
