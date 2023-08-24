import { createColumnHelper } from '@tanstack/react-table';
import { transOutHook } from 'dhm/contexts/TranslateContext';
import { columnKeys } from 'dhm/services/table/columnKeysBE';

const { createdDatetimNoFeature, updatedDatetimeNoFeature } = columnKeys;

const columnHelper = createColumnHelper();
const t = (key) => transOutHook(key, 'keyValidatorDefine');

const roleId = columnHelper.accessor('roleId', {
  header: t('roleId'),
  cell: (info) => <div>{info.getValue()}</div>,
});
const roleName = columnHelper.accessor('roleName', {
  header: t('roleName'),
  cell: (info) => <div>{info.getValue()}</div>,
});
const roleDescription = columnHelper.accessor('roleDescription', {
  header: t('roleDescription'),
  cell: (info) => <div>{info.getValue()}</div>,
});

const userCount = columnHelper.accessor('userCount', {
  header: t('userCount'),
  cell: (info) => <div>{info.getValue()}</div>,
});
const columnsRole = [roleId, roleName, roleDescription, userCount, createdDatetimNoFeature, updatedDatetimeNoFeature];

export { columnsRole };
