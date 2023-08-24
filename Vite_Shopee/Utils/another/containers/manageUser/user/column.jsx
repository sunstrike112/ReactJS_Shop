import { createColumnHelper } from '@tanstack/react-table';
import { editTableDropdownRole, editTableDropdownStatus } from 'dhm/containers/table/element/editCells';
import { transOutHook } from 'dhm/contexts/TranslateContext';
import { columnKeys } from 'dhm/services/table/columnKeysBE';

const { createdUserHistory, createdDatetimeHistory, updatedUserHistory, updatedDatetimeHistory, statusHistory } =
  columnKeys;

const columnHelper = createColumnHelper();
const t = (key) => transOutHook(key, 'keyValidatorDefine');
const trans = (value) => transOutHook(value, 'table');

const userName = columnHelper.accessor('userName', {
  header: t('userName'),
  cell: (info) => <div>{info.getValue()}</div>,
  haveCustomSort: true,
  //   haveCustomFilter: true,
});
const mailAddress = columnHelper.accessor('mailAddress', {
  header: t('mailAddress'),
  cell: (info) => <div>{info.getValue()}</div>,
  haveCustomSort: true,
  //   haveCustomFilter: true,
});
const roleId = columnHelper.accessor('roleId', {
  header: t('roleId'),
  cell: (info) => <div>{info.getValue()}</div>,
  haveCustomSort: true,
  //   haveCustomFilter: true,
});
const userNameEdit = columnHelper.accessor('userName', {
  header: t('userName'),
  cell: (info) => <div>{info.getValue()}</div>,
});
const mailAddressEdit = columnHelper.accessor('mailAddress', {
  header: t('mailAddress'),
  cell: (info) => <div>{info.getValue()}</div>,
});
const roleIdEdit = columnHelper.accessor('roleId', {
  header: t('roleId'),
  ...editTableDropdownRole,
  noTooltip: true,
});
const statusHistoryEdit = columnHelper.accessor('deleteFlg', {
  header: trans('status_History'),
  ...editTableDropdownStatus,
  noTooltip: true,
});

const columnsUser = [userName, mailAddress, roleId, statusHistory];
const columnUserEdit = [userNameEdit, mailAddressEdit, roleIdEdit, statusHistoryEdit];
const columnsUserHistory = [
  userName,
  mailAddress,
  roleId,
  createdDatetimeHistory,
  createdUserHistory,
  updatedDatetimeHistory,
  updatedUserHistory,
  statusHistory,
];

export { columnsUser, columnsUserHistory, columnUserEdit };
