import { IReduxAction } from '../../schemas'

export const MenuActionTypes = {
    SET_LANGUAGE: 'SET_LANGUAGE',
    SET_SELECTED_MENU_KEY: 'SET_SELECTED_MENU_KEY',
    UPDATE_ONLINE_STATUS: 'UPDATE_ONLINE_STATUS',

    ASYNC_SELECT_MENU_KEY: 'ASYNC_SELECT_MENU_KEY',
}

export interface ISetLanguagePayload { language: string }
export const setLanguageAction = (language: string): IReduxAction<ISetLanguagePayload> => ({
    payload: { language },
    type: MenuActionTypes.SET_LANGUAGE,
})

export const updateOnlineStatusAction = (): IReduxAction<null> => ({
    payload: null,
    type: MenuActionTypes.UPDATE_ONLINE_STATUS,
})

export interface ISetSelectedMenuKeyPayload { key: string }
export const setSelectedMenuKeyAction = (key: string): IReduxAction<ISetSelectedMenuKeyPayload> => ({
    payload: { key },
    type: MenuActionTypes.SET_SELECTED_MENU_KEY,
})

export interface IAsyncSelectMenuKeyPayload { key: string }
export const asyncSelectMenuKeyAction = (key: string): IReduxAction<IAsyncSelectMenuKeyPayload> => ({
    payload: { key },
    type: MenuActionTypes.ASYNC_SELECT_MENU_KEY,
})
