import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import AppMenu from '../components/AppMenu'
import { asyncFetchArticlesAction, asyncFetchFeedsAction, asyncParseFeedAction, setMenuKeyAction } from '../redux/actions'

const mapStateToProps = (store: any, props: any) => {
    return {
        feeds: store.feeds.get('list'),
        selectedMenuKey: store.menu.get('selectedkey'),
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>, props: any) => ({
    asyncFetchArticles: () => dispatch(asyncFetchArticlesAction()),
    asyncFetchFeeds: () => dispatch(asyncFetchFeedsAction()),
    asyncParseFeed: (feedUrl: string) => dispatch(asyncParseFeedAction(feedUrl)),
    setMenuKey: (key: string) => dispatch(setMenuKeyAction(key)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AppMenu)
