import { connect, MapStateToProps } from 'react-redux'
import ListItem, { IListItemOwnProps, IListItemReduxState } from '../components/ListItem'
import { IState } from '../redux/reducers'

const mapStateToProps: MapStateToProps<IListItemReduxState, IListItemOwnProps, IState> = (store: IState) => ({
    feedFavicons: store.feeds.get('favicons'),
})

export default connect(
    mapStateToProps,
)(ListItem)
