import Immutable from 'immutable'
import { EMenuKey, IIMenuState, IMenuState, IReduxAction } from '../../schemas'
import {
  ISetLanguagePayload,
  ISetMenuKeyPayload,
  MenuActionTypes,
} from '../actions'

const LANGUAGE = 'LANGUAGE'
const MenuKeyDefault = EMenuKey.ALL_ITEMS
const languageDefault = localStorage.getItem(LANGUAGE) || navigator.language

const initialMenuState = Immutable.Record<IMenuState>({
  language: languageDefault,
  onlineStatus: true,
  selectedKey: MenuKeyDefault,
})()

const menuReducer = (state = initialMenuState, action: IReduxAction) => {
  const payload = action.payload
  switch (action.type) {
    case MenuActionTypes.SET_LANGUAGE:
      return handleSetLanguage(state, payload)
    case MenuActionTypes.SET_MENU_KEY:
      return handleSetMenuKey(state, payload)
    case MenuActionTypes.UPDATE_ONLINE_STATUS:
      return handleUpdateOnlineStatus(state)
    default:
      return state
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
