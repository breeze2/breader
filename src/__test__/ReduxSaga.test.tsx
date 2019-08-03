import store from '../redux'
import * as actions from '../redux/actions'
import { EArticleFilter, EMenuKey, IArticle, IFeed } from '../schemas'
import { feed } from './MockData'

describe('Redux Testing', () => {
    jest.setTimeout(10 * 1000)
    const asyncActionDispatcher = actions.asyncActionDispatcher
    const {dispatch, getState } = store

    it('articles saga testing', async () => {
        const articles = await asyncActionDispatcher<IArticle>(
            dispatch,
            actions.asyncFetchArticlesAction()
        )
        expect(articles).toHaveLength(0)

        const changes = await asyncActionDispatcher<IArticle>(
            dispatch,
            actions.asyncSetAllArticlesReadAction([])
        )
        expect(changes).toBe(0)

        await asyncActionDispatcher<void>(
            dispatch,
            actions.asyncFilterArticlesAction(EArticleFilter.STARRED)
        )
        expect(getState().articles.filter).toBe(EArticleFilter.STARRED)

        try {
            await asyncActionDispatcher<void>(
                dispatch,
                actions.asyncStarArticleAction('not_exists', true)
            )
        } catch (error) {
            expect(error).toHaveProperty('status', 404)
        }

        try {
            await asyncActionDispatcher<void>(
                dispatch,
                actions.asyncSelectAndReadArticleAction('not_exists', 0)
            )
        } catch (error) {
            expect(error).toHaveProperty('status', 404)
        }

    })

    it('feeds saga testing', async () => {
        const feeds = await asyncActionDispatcher<IFeed[]>(
            dispatch,
            actions.asyncFetchFeedsAction()
        )
        expect(feeds).toHaveLength(0)

        let changes = await asyncActionDispatcher<number>(
            dispatch,
            actions.asyncUpdateFeedsAction()
        )
        expect(changes).toBe(0)

        changes = await asyncActionDispatcher<number>(
            dispatch,
            actions.asyncDeleteFeedsAction([])
        )
        expect(changes).toBe(0)

        changes = await asyncActionDispatcher<number>(
            dispatch,
            actions.asyncUpdateFeedsAction()
        )
        expect(changes).toBe(0)

        const result = await asyncActionDispatcher<IFeed>(
            dispatch,
            actions.asyncParseFeedAction(feed.url)
        )
        expect(result).toHaveProperty('url', feed.url)
    })

    it('menu saga testing', async () => {
        await asyncActionDispatcher<void>(
            dispatch,
            actions.asyncSelectMenuKeyAction(EMenuKey.STARRED_ITEMS)
        )
        expect(getState().menu.selectedKey).toBe(EMenuKey.STARRED_ITEMS)
    })
})
