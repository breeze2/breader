import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux'
import { Dispatch } from 'redux'
import SettingsModal, { ISettingsModalOwnProps, ISettingsModalReduxDispatch, ISettingsModalReduxState } from '../components/SettingsModal'
import { asyncActionDispatcher, asyncDeleteFeedsAction, setLanguageAction } from '../redux/actions'
import { IReduxAction, IReduxState } from '../schemas'

const mapStateToProps: MapStateToProps<ISettingsModalReduxState, ISettingsModalOwnProps, IReduxState> = (state: IReduxState) => ({
    feeds: state.feeds.list,
    language: state.menu.language,
})

const mapDispatchToProps: MapDispatchToProps<ISettingsModalReduxDispatch, ISettingsModalOwnProps> = (dispatch: Dispatch<IReduxAction>) => ({
    asyncDeleteFeeds: (feedIds: number[]) => asyncActionDispatcher(dispatch, asyncDeleteFeedsAction(feedIds)),
    setLanguage: (language: string) => dispatch(setLanguageAction(language)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SettingsModal)
