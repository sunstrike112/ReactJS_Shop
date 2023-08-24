// Constant

const FILTER_MENU = 'FILTER_MENU';
const FILTER_MENU_EMPLOYEE_LIST = 'FILTER_MENU_EMPLOYEE_LIST';
const FILTER_LENGTH_LV2 = 'FILTER_LENGTH_LV2';

const TABLE_FILTER_DRAFF = 'TABLE_FILTER_DRAFF';

const setSession = (key, value) => sessionStorage.setItem(key, JSON.stringify(value));
const getSession = (key) => JSON.parse(sessionStorage.getItem(key));
const removeSession = (key) => sessionStorage.removeItem(key);
const isExistSession = (key) => sessionStorage.getItem(key) !== null;

const setLocal = (key, value) => localStorage.setItem(key, JSON.stringify(value));
const getLocal = (key, noParse) => (noParse ? localStorage.getItem(key) : JSON.parse(localStorage.getItem(key)));
const removeLocal = (key) => localStorage.removeItem(key);
const isExistLocal = (key) => localStorage.getItem(key) !== null;
const clearAllLocal = () => localStorage.clear();

const SessionStore = {
  set: setSession,
  get: getSession,
  remove: removeSession,
  isExits: isExistSession,
};

const LocalStore = {
  set: setLocal,
  get: getLocal,
  remove: removeLocal,
  isExits: isExistLocal,
  clearAll: clearAllLocal,
};

const ConstantLocal = {
  FILTER_MENU,
  FILTER_MENU_EMPLOYEE_LIST,
  FILTER_LENGTH_LV2,
};

const ConstantSession = {
  TABLE_FILTER_DRAFF,
};

export { SessionStore, LocalStore, ConstantLocal, ConstantSession };
