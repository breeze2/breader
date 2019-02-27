export const MenuActionTypes = {
    SET_MENU_KEY: 'SET_MENU_KEY',
}

export const setMenuKeyAction = (key: string) => ({
    payload: { key },
    type: 'SET_MENU_KEY',
})
