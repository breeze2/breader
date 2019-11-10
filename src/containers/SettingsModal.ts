import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux'
import { Dispatch } from 'redux'
import SettingsModal, {
  ISettingsModalDispatchProps,
  ISettingsModalOwnProps,
  ISettingsModalStateProps,
} from '../components/SettingsModal'
import {
  asyncActionDispatcher,
  asyncDeleteFeedsAction,
  setLanguageAction,
} from '../redux/actions'
import { IReduxAction, IReduxState } from '../schemas'

const mapStateToProps: MapStateToProps<
  ISettingsModalStateProps,
  ISettingsModalOwnProps,
  IReduxState
> = (state: IReduxState) => ({
  feeds: state.feeds.list,
  language: state.menu.language,
})

const mapDispatchToProps: MapDispatchToProps<
  ISettingsModalDispatchProps,
  ISettingsModalOwnProps
> = (dispatch: Dispatch<IReduxAction>) => ({
  asyncDeleteFeeds: (feedIds: string[]) =>
    asyncActionDispatcher(dispatch, asyncDeleteFeedsAction(feedIds)),
  setLanguage: (language: string) => dispatch(setLanguageAction(language)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsModal)
