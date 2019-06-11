import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux'
import { Dispatch } from 'redux'
import ListItem, { IListItemOwnProps, IListItemReduxDispatch, IListItemReduxState } from '../components/ListItem'
import { IAction } from '../redux/actions'
import { IState } from '../redux/reducers'

const mapStateToProps: MapStateToProps<IListItemReduxState, IListItemOwnProps, IState> = (state: IState) => ({
    feedFavicons: state.feeds.favicons,
})

const mapDispatchToProps: MapDispatchToProps<IListItemReduxDispatch, IListItemOwnProps> = (dispatch: Dispatch<IAction>) => ({
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ListItem)
