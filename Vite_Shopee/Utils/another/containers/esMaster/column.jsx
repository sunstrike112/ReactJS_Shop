import { createColumnHelper } from '@tanstack/react-table';
import { transOutHook } from 'dhm/contexts/TranslateContext';
// import i18n from 'dhm/translate/index';

const columnHelper = createColumnHelper();
const t = (key) => transOutHook(key, 'form');
const trans = (key) => transOutHook(key, 'keyValidatorDefine');
// const isEng = i18n.language === 'en';

const userCode = columnHelper.accessor('userCode', {
  header: t('userCode'),
  cell: (info) => <div>{info.getValue()}</div>,
  haveCustomSort: true,
  haveCustomFilter: true,
});
// const role = columnHelper.accessor(isEng ? 'roleNameEn' : 'roleName', {
//   header: t('role'),
//   cell: (info) => <>{info.getValue()}</>,
//   haveCustomSort: true,
//   haveCustomFilter: true,
// });
const esMngPred = columnHelper.accessor('esMngPred', {
  header: t('esMngPred'),
  cell: (info) => <div>{info.getValue()}</div>,
  haveCustomSort: true,
  haveCustomFilter: true,
});
const esMngPredDes = columnHelper.accessor('esMngPredDescription', {
  header: t('esMngPredDes'),
  cell: (info) => <div>{info.getValue()}</div>,
  haveCustomSort: true,
  haveCustomFilter: true,
});

const esMngTeamLeader = columnHelper.accessor('esMngTeamLeader', {
  header: trans('esMngTeamLeader'),
  cell: (info) => <div>{info.getValue() === 'true' ? '有' : '無'}</div>,
  haveCustomSort: true,
  haveCustomFilter: true,
});
const esMngBelong = columnHelper.accessor('esMngBelong', {
  header: trans('esMngBelong'),
  cell: (info) => <div>{info.getValue()}</div>,
  haveCustomSort: true,
  haveCustomFilter: true,
});
const userCodeNoFilter = columnHelper.accessor('userCode', {
  header: t('userCode'),
  cell: (info) => <div>{info.getValue()}</div>,
  haveCustomSort: true,
});
// const roleNoFilter = columnHelper.accessor(isEng ? 'roleNameEn' : 'roleName', {
//   header: t('role'),
//   cell: (info) => <>{info.getValue()}</>,
//   haveCustomSort: true,
// });
const esMngPredNoFilter = columnHelper.accessor('esMngPred', {
  header: t('esMngPred'),
  cell: (info) => <div>{info.getValue()}</div>,
  haveCustomSort: true,
});
const esMngPredDesNoFilter = columnHelper.accessor('esMngPredDescription', {
  header: t('esMngPredDes'),
  cell: (info) => <div>{info.getValue()}</div>,
  haveCustomSort: true,
});
const esMngTeamLeaderNoFilter = columnHelper.accessor('esMngTeamLeader', {
  header: trans('esMngTeamLeader'),
  cell: (info) => <div>{info.getValue() === 'true' ? '有' : '無'}</div>,
  haveCustomSort: true,
});
const esMngBelongNoFilter = columnHelper.accessor('esMngBelong', {
  header: trans('esMngBelong'),
  cell: (info) => <div>{info.getValue()}</div>,
  haveCustomSort: true,
});
const columnsEsMaster = [userCode, esMngPred, esMngPredDes, esMngTeamLeader, esMngBelong];
const columnsEsMasterHistory = [
  userCodeNoFilter,
  esMngPredNoFilter,
  esMngPredDesNoFilter,
  esMngTeamLeaderNoFilter,
  esMngBelongNoFilter,
];

export { columnsEsMaster, columnsEsMasterHistory };
