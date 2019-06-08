import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux'
import { Dispatch } from 'redux'
import SettingsModal, { ISettingsModalOwnProps, ISettingsModalReduxDispatch, ISettingsModalReduxState } from '../components/SettingsModal'
import { asyncDeleteFeedsAction, IAction, setLanguageAction } from '../redux/actions'
import { IState } from '../redux/reducers'

const mapStateToProps: MapStateToProps<ISettingsModalReduxState, ISettingsModalOwnProps, IState> = (state: IState) => ({
    feeds: state.feeds.list,
    language: state.menu.language,
})

const mapDispatchToProps: MapDispatchToProps<ISettingsModalReduxDispatch, ISettingsModalOwnProps> = (dispatch: Dispatch<IAction>) => ({
    asyncDeleteFeeds: (feedIds: number[]) => dispatch(asyncDeleteFeedsAction(feedIds)),
    setLanguage: (language: string) => dispatch(setLanguageAction(language)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SettingsModal)
