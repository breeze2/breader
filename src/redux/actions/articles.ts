import InterfaceArticle from '../../schemas/InterfaceArticle'

export const ArticlesActionTypes = {
    SET_ARTICLES: 'SET_ARTICLES',
    SET_SELECTED_ARTICLE: 'SET_SELECTED_ARTICLE',
    SET_SELECTED_ARTICLE_CONTENT: 'SET_SELECTED_ARTICLE_CONTENT',

    ASYNC_FETCH_ARTICLES: 'ASYNC_FETCH_ARTICLES',
    ASYNC_SELECT_AND_READ_ARTICLE: 'ASYNC_SELECT_AND_READ_ARTICLE',
}

export const setSelectedArticleAction = (articleId: number, articleIndex: number) => ({
    payload: { articleId, articleIndex },
    type: 'SET_SELECTED_ARTICLE',
})

export const setSelectedArticleContentAction = (articleContent: string) => ({
    payload: { articleContent },
    type: 'SET_SELECTED_ARTICLE_CONTENT',
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

export const asyncSelectAndReadArticlesAction = (articleId: number, articleIndex: number) => ({
    payload: { articleId, articleIndex },
    type: 'ASYNC_SELECT_AND_READ_ARTICLE',
})
