import { actionCreator } from './helpers'

export const MenuActionTypes = {
    SET_LANGUAGE: 'SET_LANGUAGE',
    SET_MENU_KEY: 'SET_MENU_KEY',
    UPDATE_ONLINE_STATUS: 'UPDATE_ONLINE_STATUS',

    ASYNC_SELECT_MENU_KEY: 'ASYNC_SELECT_MENU_KEY',
}

export interface ISetLanguagePayload { language: string }
export const setLanguageAction = (language: string) =>
    actionCreator<ISetLanguagePayload>(MenuActionTypes.SET_LANGUAGE)({ language })

export const updateOnlineStatusAction = () =>
    actionCreator<void>(MenuActionTypes.UPDATE_ONLINE_STATUS)()

export interface ISetMenuKeyPayload { key: string }
export const selectMenuKeyAction = (key: string) =>
    actionCreator<ISetMenuKeyPayload>(MenuActionTypes.SET_MENU_KEY)({ key })

export interface IAsyncSelectMenuKeyPayload { key: string }
export const asyncSelectMenuKeyAction = (key: string) =>
    actionCreator<IAsyncSelectMenuKeyPayload>(MenuActionTypes.ASYNC_SELECT_MENU_KEY)({ key })
