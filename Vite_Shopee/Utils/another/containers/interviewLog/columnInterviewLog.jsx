import { createColumnHelper } from '@tanstack/react-table';
import { currentLanguage, transOutHook } from 'dhm/contexts/TranslateContext';
import { formatDateJP } from 'dhm/utils/helpers/format';

const columnHelper = createColumnHelper();
const tInterviewLog = (value) => transOutHook(value, 'interviewLog');

const date = columnHelper.accessor('date', {
  header: tInterviewLog('date'),
  maxSize: 140,
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

const columnInterviewLog = {
  date,
  esManager,
  nextDate,
  category,
  content,
};
export { columnInterviewLog };
