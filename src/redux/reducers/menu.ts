import Immutable from 'immutable'
import { IReduxAction } from '../../schemas'
import { MenuActionTypes } from '../actions'

const MenuKeyDefault = 'ALL_ITEMS'
const languageDefault = localStorage.getItem('LANGUAGE') || navigator.language

export interface IMenuState {
    language: string
    onlineStatus: boolean
    selectedKey: string
}

const initialMenuState = Immutable.Record<IMenuState>({
    language: languageDefault,
    onlineStatus: true,
    selectedKey: MenuKeyDefault,
})()

const menuKey = (state = initialMenuState, action: IReduxAction) => {
    switch (action.type) {
        case MenuActionTypes.SET_LANGUAGE:
            localStorage.setItem('LANGUAGE', action.payload.language)
            return state.set('language', action.payload.language)
        case MenuActionTypes.SET_ONLINE_STATUS:
            return state.set('onlineStatus', navigator.onLine)
        case MenuActionTypes.SET_SELECTED_MENU_KEY:
            return state.set('selectedKey', action.payload.key)
        default:
            return state
    }
}

export default menuKey
