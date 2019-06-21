import { IReduxAction } from '../../schemas'

export const MenuActionTypes = {
    SET_LANGUAGE: 'SET_LANGUAGE',
    SET_ONLINE_STATUS: 'SET_ONLINE_STATUS',
    SET_SELECTED_MENU_KEY: 'SET_SELECTED_MENU_KEY',

    ASYNC_SELECT_MENU_KEY: 'ASYNC_SELECT_MENU_KEY',
}

export const setLanguageAction = (language: string): IReduxAction => ({
    payload: { language },
    type: MenuActionTypes.SET_LANGUAGE,
})

export const setOnlineStatusAction = (): IReduxAction => ({
    payload: null,
    type: MenuActionTypes.SET_ONLINE_STATUS,
})

export const setSelectedMenuKeyAction = (key: string): IReduxAction => ({
    payload: { key },
    type: MenuActionTypes.SET_SELECTED_MENU_KEY,
})

export const asyncSelectMenuKeyAction = (key: string): IReduxAction => ({
    payload: { key },
    type: MenuActionTypes.ASYNC_SELECT_MENU_KEY,
})
