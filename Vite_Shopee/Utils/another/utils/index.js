import { VALIDATOR, COMMON_BUSINESS, MASTER, STAFF, SUMMARY, MESS_SUCCESS } from './constants/messageId';

const ListMessError = { ...VALIDATOR(), ...COMMON_BUSINESS(), ...MASTER(), ...STAFF(), ...SUMMARY() };
const ListMessSuccess = { ...MESS_SUCCESS };

export { ListMessError, ListMessSuccess };
export * from './helpers/local';
export * from './constants/style';
export * from './responsive';
