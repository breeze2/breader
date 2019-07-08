import Immutable from 'immutable'
import { IReduxAction } from '../../schemas'
import {
    ISetLanguagePayload,
    ISetMenuKeyPayload,
    MenuActionTypes,
} from '../actions'

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

const menu = (state = initialMenuState, action: IReduxAction) => {
    const payload = action.payload;
    switch (action.type) {
        case MenuActionTypes.SET_LANGUAGE: return handleSetLanguage(state, payload)
        case MenuActionTypes.SET_MENU_KEY: return handleSetMenuKey(state, payload)
        case MenuActionTypes.UPDATE_ONLINE_STATUS: return handleUpdateOnlineStatus(state)
        default: return state
    }
}

function handleSetLanguage(state: Immutable.Record<IMenuState> & Readonly<IMenuState>, payload: ISetLanguagePayload) {
    localStorage.setItem('LANGUAGE', payload.language)
    return state.set('language', payload.language)
}

function handleUpdateOnlineStatus(state: Immutable.Record<IMenuState> & Readonly<IMenuState>) {
    return state.set('onlineStatus', navigator.onLine)
}

function handleSetMenuKey(state: Immutable.Record<IMenuState> & Readonly<IMenuState>, payload: ISetMenuKeyPayload) {
    return state.set('selectedKey', payload.key)
}

export default menu
