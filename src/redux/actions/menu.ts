export const MenuActionTypes = {
    SET_SELECTED_MENU_KEY: 'SET_SELECTED_MENU_KEY',

    ASYNC_SELECT_MENU_KEY: 'ASYNC_SELECT_MENU_KEY',
}

export const setSelectedMenuKeyAction = (key: string) => ({
    payload: { key },
    type: 'SET_SELECTED_MENU_KEY',
})

export const asyncSelectMenuKeyAction = (key: string) => ({
    payload: { key },
    type: 'ASYNC_SELECT_MENU_KEY',
})
