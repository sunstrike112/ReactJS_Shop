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

export const LOAD_SEMINAR_LIST = '@SEMINAR_LIST/LOAD_SEMINAR'
export const LOAD_SEMINAR_LIST_SUCCESS = '@SEMINAR_LIST/LOAD_SEMINAR_LIST_SUCCESS'

export const LOAD_SEMINAR_DETAIL = '@SEMINAR_LIST/LOAD_SEMINAR_DETAIL'
export const LOAD_SEMINAR_DETAIL_SUCCESS = '@SEMINAR_LIST/LOAD_SEMINAR_DETAIL_SUCCESS'
export const REMOVE_SEMINAR_DETAIL = '@SEMINAR_LIST/REMOVE_SEMINAR_DETAIL'
export const IS_HAVE_DATA = '@SEMINAR_LIST/IS_HAVE_DATA'

export const LOAD_REPOS_ERROR = '@SEMINAR_LIST/LOAD_REPOS_ERROR'
