import store from '../redux'
import * as actions from '../redux/actions'
import { EArticleFilter, EMenuKey } from '../schemas'
import { article, feed } from './MockData'

describe('Redux Testing', () => {
    const {dispatch, getState } = store

    it('articles state testing', () => {
        dispatch(actions.setArticlesAction([article]))
        expect(getState().articles.list.size).toBe(1)

        dispatch(actions.setArticlesFilterAction(EArticleFilter.STARRED))
        expect(getState().articles.filter).toBe(
            EArticleFilter.STARRED
        )

        dispatch(actions.setCurrentArticleAction(article))
        expect(getState().articles.current).toBeDefined()

        dispatch(actions.setIsUpdatingCurrentArticleAction(true))
        expect(getState().articles.isUpdatingCurrent).toBe(true)

        dispatch(actions.setIsFetchingArticlesAction(true))
        expect(getState().articles.isFetching).toBe(true)
    })

    it('feeds state testing', () => {
        dispatch(actions.addFeedAction(feed))
        expect(getState().feeds.list.size).toBe(1)

        dispatch(actions.setFeedsAction([feed]))
        expect(getState().feeds.list.size).toBe(1)

        dispatch(
            actions.setFeedFaviconAction(feed._id, 'favicon_url')
        )
        expect(getState().feeds.map.get(feed._id)).toBeDefined()
        dispatch(
            actions.setFeedFaviconAction('not_exists', 'favicon_url')
        )

        dispatch(actions.setIsCreatingFeedAction(true))
        expect(getState().feeds.isCreating).toBe(true)

        dispatch(actions.setIsUpdatingFeedsAction(true))
        expect(getState().feeds.isUpdating).toBe(true)
    })

    it('menu state testing', () => {
        dispatch(actions.setMenuKeyAction(EMenuKey.STARRED_ITEMS))
        expect(getState().menu.selectedKey).toBe(
            EMenuKey.STARRED_ITEMS
        )

        dispatch(actions.setLanguageAction('zh-CN'))
        expect(getState().menu.language).toBe('zh-CN')

        dispatch(actions.updateOnlineStatusAction())
        expect(getState().menu.onlineStatus).toBeDefined()
    })
})
