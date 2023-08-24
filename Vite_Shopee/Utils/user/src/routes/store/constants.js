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

export const LOAD_REPOS_ERROR = '@APP/LOAD_REPOS_ERROR'
export const CHECK_NETWORK = '@APP/CHECK_NETWORK'
export const SHOW_MAINTAIN_NOTICE = '@APP/SHOW_MAINTAIN_NOTICE'
export const LOAD_INIT_DISPLAY = '@APP/LOAD_INIT_DISPLAY'

export const GET_MAINTAIN_NOTICE_REQUEST = '@AUTH/GET_MAINTAIN_NOTICE_REQUEST'
export const GET_MAINTAIN_NOTICE_SUCCESS = '@AUTH/GET_MAINTAIN_NOTICE_SUCCESS'
export const GET_MAINTAIN_NOTICE_FAILURE = '@AUTH/GET_MAINTAIN_NOTICE_FAILURE'

export const GET_STATUS_MAINTAIN_REQUEST = '@AUTH/GET_STATUS_MAINTAIN_REQUEST'
export const GET_STATUS_MAINTAIN_SUCCESS = '@AUTH/GET_STATUS_MAINTAIN_SUCCESS'
export const GET_STATUS_MAINTAIN_FAILURE = '@AUTH/GET_STATUS_MAINTAIN_FAILURE'

export const LOADING_PORTAL_REQUEST = '@AUTH/LOADING_PORTAL_REQUEST'
export const LOADING_PORTAL_STOP = '@AUTH/LOADING_PORTAL_STOP'

export const GET_THEME = '@AUTH/GET_THEME'

export const SET_THEME_REQUEST = '@AUTH/SET_THEME_REQUEST'
export const SET_THEME_SUCCESS = '@AUTH/SET_THEME_SUCCESS'
export const SET_THEME_FAILURE = '@AUTH/SET_THEME_FAILURE'
