import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import AppMenu from '../components/AppMenu'
import { addFeedAction, asyncFetchArticlesAction, asyncFetchFeedsAction, asyncParseFeedAction, setFeedsAction, setMenuKeyAction } from '../redux/actions'
import InterfaceArticle from '../schemas/InterfaceArticle'
import InterfaceFeed from '../schemas/InterfaceFeed'

const mapStateToProps = (store: any, props: any) => {
    return {
        feeds: store.feeds.get('list'),
        selectedKey: store.menu.get('key'),
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
