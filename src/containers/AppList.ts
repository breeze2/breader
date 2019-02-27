import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import AppList from '../components/AppList'
import { asyncFetchFeedsAction } from '../redux/actions'

const mapStateToProps = (store: any, props: any) => {
    return {
        selectedMenuKey: store.menu.get('selectedkey'),
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>, props: any) => ({
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AppList)
