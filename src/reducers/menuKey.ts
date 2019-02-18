import { InterfaceMenuAction, MenuActionTypes } from '../actions/menu'

const MenuKeyDefault = 'ALL_ITEMS'

const menuKey = (state = MenuKeyDefault, action: InterfaceMenuAction) => {
    switch (action.type) {
        case MenuActionTypes.SET_MENU_KEY:
            return action.key
        default:
            return state
    }
}

export default menuKey
