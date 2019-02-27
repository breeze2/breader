import InterfaceArticle from '../../schemas/InterfaceArticle'

export const ArticlesActionTypes = {
    SELECT_ARTICLE: 'SELECT_ARTICLE',
    SET_ARTICLES: 'SET_ARTICLES',

    ASYNC_FETCH_ARTICLES: 'ASYNC_FETCH_ARTICLES',
}

export const selectArticleAction = (articleId: number) => ({
    payload: { articleId },
    type: 'SET_ARTICLES',
})

export const setArticlesAction = (articles: InterfaceArticle[]) => ({
    payload: { articles },
    type: 'SET_ARTICLES',
})

export const asyncFetchArticlesAction = () => {
    return ({
        payload: null,
        type: 'ASYNC_FETCH_ARTICLES',
    })
}
