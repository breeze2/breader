import Immutable from 'immutable'
import { IReduxAction } from '../../schemas'
import {
    ISetLanguagePayload,
    ISetSelectedMenuKeyPayload,
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

const menuKey = (state = initialMenuState, action: IReduxAction) => {
    switch (action.type) {
        case MenuActionTypes.SET_LANGUAGE:
            const language = (action as IReduxAction<ISetLanguagePayload>).payload.language
            localStorage.setItem('LANGUAGE', language)
            return state.set('language', language)

        case MenuActionTypes.SET_ONLINE_STATUS:
            return state.set('onlineStatus', navigator.onLine)

        case MenuActionTypes.SET_SELECTED_MENU_KEY:
            const key = (action as IReduxAction<ISetSelectedMenuKeyPayload>).payload.key
            return state.set('selectedKey', key)

        default:
            return state
    }
}

export default menuKey
