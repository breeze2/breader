import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux'
import { Dispatch } from 'redux'
import ListItem, { IListItemOwnProps, IListItemReduxDispatch, IListItemReduxState } from '../components/ListItem'
import { IReduxAction, IReduxState } from '../schemas'

const mapStateToProps: MapStateToProps<IListItemReduxState, IListItemOwnProps, IReduxState> = (state: IReduxState) => ({
    feedFavicons: state.feeds.favicons,
    feedTitles: state.feeds.titles,
})

const mapDispatchToProps: MapDispatchToProps<IListItemReduxDispatch, IListItemOwnProps> = (dispatch: Dispatch<IReduxAction>) => ({
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ListItem)
