import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import ListItem from '../components/ListItem'
import { IAction } from '../redux/actions'

const mapStateToProps = (store: any, props: any) => {
    return {
        feedFavicons: store.feeds.get('favicons'),
    }
}

const mapDispatchToProps = (dispatch: Dispatch<IAction>, props: any) => ({})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ListItem)
