import { ArticleActionTypes, InterfaceArticleAction } from '../actions/article'

const ArticleIdDefault = 0

const articleId = (state = ArticleIdDefault, action: InterfaceArticleAction) => {
    switch (action.type) {
        case ArticleActionTypes.SET_ARTICLE_ID:
            return action.id
        default:
            return state
    }
}

export default articleId
