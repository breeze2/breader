import Immutable from 'immutable'
import { IReduxAction, MenuKeyEnum } from '../../schemas'
import {
    ISetLanguagePayload,
    ISetMenuKeyPayload,
    MenuActionTypes,
} from '../actions'

export interface IMenuState {
    language: string
    onlineStatus: boolean
    selectedKey: string
}

export type IIMenuState = Immutable.Record<IMenuState> & Readonly<IMenuState>

const LANGUAGE = 'LANGUAGE'
const MenuKeyDefault = MenuKeyEnum.ALL_ITEMS
const languageDefault = localStorage.getItem(LANGUAGE) || navigator.language

const initialMenuState = Immutable.Record<IMenuState>({
    language: languageDefault,
    onlineStatus: true,
    selectedKey: MenuKeyDefault,
})()

const menuReducer = (state = initialMenuState, action: IReduxAction) => {
    const payload = action.payload;
    switch (action.type) {
        case MenuActionTypes.SET_LANGUAGE: return handleSetLanguage(state, payload)
        case MenuActionTypes.SET_MENU_KEY: return handleSetMenuKey(state, payload)
        case MenuActionTypes.UPDATE_ONLINE_STATUS: return handleUpdateOnlineStatus(state)
        default: return state
    }
}

function handleSetLanguage(state: IIMenuState, payload: ISetLanguagePayload) {
    localStorage.setItem(LANGUAGE, payload.language)
    return state.set('language', payload.language)
}

function handleUpdateOnlineStatus(state: IIMenuState) {
    return state.set('onlineStatus', navigator.onLine)
}

function handleSetMenuKey(state: IIMenuState, payload: ISetMenuKeyPayload) {
    return state.set('selectedKey', payload.key)
}

export default menuReducer
