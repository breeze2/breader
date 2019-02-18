export interface InterfaceMenuAction {
    key: string
    type: string
};

export const MenuActionTypes = {
    SET_MENU_KEY: 'SET_MENU_KEY',
}

export const setMenuKeyAction = (key: string): InterfaceMenuAction => ({
    key,
    type: 'SET_MENU_KEY',
});
