import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import AppMenu from '../components/AppMenu'
import { asyncFetchArticlesAction, asyncFetchFeedsAction, asyncParseFeedAction, asyncSelectMenuKeyAction } from '../redux/actions'

const mapStateToProps = (store: any, props: any) => {
    return {
        feeds: store.feeds.get('list'),
        selectedMenuKey: store.menu.get('selectedKey'),
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>, props: any) => ({
    asyncFetchArticles: () => dispatch(asyncFetchArticlesAction()),
    asyncFetchFeeds: () => dispatch(asyncFetchFeedsAction()),
    asyncParseFeed: (feedUrl: string) => dispatch(asyncParseFeedAction(feedUrl)),
    asyncSelectMenuKey: (key: string) => dispatch(asyncSelectMenuKeyAction(key)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AppMenu)
