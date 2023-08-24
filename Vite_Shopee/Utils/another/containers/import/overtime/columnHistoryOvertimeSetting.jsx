import { createColumnHelper } from '@tanstack/react-table';
import { transOutHook } from 'dhm/contexts/TranslateContext';
import { convertToCurrentTime } from 'dhm/utils/helpers/convert';
import { formatDateJP } from 'dhm/utils/helpers/format';

const columnHelper = createColumnHelper();

const tCsv = (value) => transOutHook(value, 'csvDefine');
const trans = (value) => transOutHook(value, 'table');

const fiscalYear = columnHelper.accessor('fiscalYear', {
  header: tCsv('year'),
  cell: (info) => <>{info.getValue()}</>,
});
const monthlyOtLimit = columnHelper.accessor('monthlyOtLimit', {
  header: tCsv('overtime_setting'),
  cell: (info) => <>{info.getValue()}</>,
});

const createdDatetime = columnHelper.accessor('createdDatetime', {
  header: trans('registrationDate'),
  cell: (info) => <>{formatDateJP(convertToCurrentTime(info.getValue()), 'fulltime')}</>,
});
const createdUser = columnHelper.accessor('createdUser', {
  header: trans('createdUser'),
  cell: (info) => <>{info.getValue()}</>,
});
const updatedDatetime = columnHelper.accessor('updatedDatetime', {
  header: trans('updatedDatetime'),
  cell: (info) => <>{formatDateJP(convertToCurrentTime(info.getValue()), 'fulltime')}</>,
});
const updatedUser = columnHelper.accessor('updatedUser', {
  header: trans('updatedUser'),
  cell: (info) => <>{info.getValue()}</>,
});

const columnHistoryOvertimeSetting = {
  fiscalYear,
  monthlyOtLimit,
  createdDatetime,
  createdUser,
  updatedDatetime,
  updatedUser,
};
export { columnHistoryOvertimeSetting };
