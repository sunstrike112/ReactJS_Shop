/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const TOGGLE_SIDEBAR = '@GLOBAL/TOGGLE_SIDEBAR'
export const HOVER_SIDEBAR = '@GLOBAL/HOVER_SIDEBAR'

export const SET_THEME_REQUEST = '@GLOBAL/SET_THEME_REQUEST'
export const SET_THEME_SUCCESS = '@GLOBAL/SET_THEME_SUCCESS'
export const SET_THEME_FAILURE = '@GLOBAL/SET_THEME_FAILURE'

export const API_82_105 = '@GLOBAL/API_82_105'
