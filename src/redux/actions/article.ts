export interface InterfaceArticleAction {
    id: number
    type: string
}

export const ArticleActionTypes = {
    SET_ARTICLE_ID: 'SET_ARTICLE_ID',
}

export const setArticleIdAction = (id: number): InterfaceArticleAction => ({
    id,
    type: 'SET_ARTICLE_ID',
})
