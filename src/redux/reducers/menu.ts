import Immutable from 'immutable'
import { InterfaceAction, MenuActionTypes } from '../actions'

const MenuKeyDefault = 'ALL_ITEMS'
const initialMenuState = Immutable.fromJS({
    onlineStatus: true,
    selectedKey: MenuKeyDefault,
})

const menuKey = (state = initialMenuState, action: InterfaceAction) => {
    switch (action.type) {
        case MenuActionTypes.SET_ONLINE_STATUS:
            return state.set('onlineStatus', navigator.onLine)
        case MenuActionTypes.SET_SELECTED_MENU_KEY:
            return state.set('selectedKey', action.payload.key)
        default:
            return state
    }
}

export default menuKey
