import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import SettingsModal from '../components/SettingsModal'
import { asyncDeleteFeedsAction, IAction, setLanguageAction } from '../redux/actions'

const mapStateToProps = (store: any, props: any) => {
    return {
        feeds: store.feeds.get('list'),
        language: store.menu.get('language'),
    }
}

const mapDispatchToProps = (dispatch: Dispatch<IAction>, props: any) => ({
    asyncDeleteFeeds: (feedIds: number[]) => dispatch(asyncDeleteFeedsAction(feedIds)),
    setLanguage: (language: string) => dispatch(setLanguageAction(language)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SettingsModal)
