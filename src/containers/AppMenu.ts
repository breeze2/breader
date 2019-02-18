import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { setMenuKeyAction } from '../actions'
import AppMenu from '../components/AppMenu'

const mapStateToProps = (store: any, props: any) => {
    return {
        selectedKey: store.menuKey,
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>, props: any) => ({
    handleSelect: (e: any) => dispatch(setMenuKeyAction(e.key)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AppMenu)
