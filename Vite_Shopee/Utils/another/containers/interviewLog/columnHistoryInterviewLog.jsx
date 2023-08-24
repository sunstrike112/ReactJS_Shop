import { Badge } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import { currentLanguage, transOutHook } from 'dhm/contexts/TranslateContext';
import { convertToCurrentTime } from 'dhm/utils/helpers/convert';
import { formatDateJP } from 'dhm/utils/helpers/format';

const columnHelper = createColumnHelper();
const tInterviewLog = (value) => transOutHook(value, 'interviewLog');
const trans = (value) => transOutHook(value, 'table');

const date = columnHelper.accessor('date', {
  header: tInterviewLog('date'),
  cell: (info) => <>{formatDateJP(info.getValue())}</>,
});
const esManager = columnHelper.accessor('esManager', {
  header: tInterviewLog('esStaff'),
  cell: (info) => <>{info.getValue()}</>,
});
const nextDate = columnHelper.accessor('nextDate', {
  header: tInterviewLog('dateOfNextInterview'),
  cell: (info) => <>{formatDateJP(info.getValue())}</>,
});
const category = columnHelper.accessor('category', {
  header: tInterviewLog('inteviewCategory'),
  cell: (info) => <>{currentLanguage('jp') ? info.row.original.categoryName : info.row.original.categoryNameEn}</>,
});
const content = columnHelper.accessor('content', {
  header: tInterviewLog('content'),
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
const status = columnHelper.accessor('deleteFlg', {
  header: trans('status'),
  cell: (info) => (
    <Badge ml='1' fontSize='0.8em' colorScheme={info.getValue() === 1 ? 'red' : 'green'} padding='0 10px'>
      {trans(info.getValue() === 0 ? 'in_active' : 'active')}
    </Badge>
  ),
  typeFilter: 'text',
  haveCustomFilter: false,
  noTooltip: true,
});

const columnHistoryInterviewLog = {
  date,
  esManager,
  nextDate,
  category,
  content,
  createdDatetime,
  createdUser,
  updatedDatetime,
  updatedUser,
  status,
};
export { columnHistoryInterviewLog };
