import { createColumnHelper } from '@tanstack/react-table';
import { transOutHook } from 'dhm/contexts/TranslateContext';
import { formatDateJP } from 'dhm/utils/helpers/format';

const columnHelper = createColumnHelper();
const t = (key) => transOutHook(key, 'workflow');

const matterNo = columnHelper.accessor('matterNo', {
  header: t('matterNo'),
  cell: (info) => <div>{info.getValue()}</div>,
  haveCustomSort: true,
  haveCustomFilter: true,
});

const matterName = columnHelper.accessor('matterName', {
  header: t('matterName'),
  cell: (info) => <div>{info.getValue()}</div>,
  haveCustomSort: true,
  haveCustomFilter: true,
});
const careerName = columnHelper.accessor('careerId', {
  header: t('businessDivision'),
  cell: (info) => <div>{info.row.original.careerName}</div>,
  haveCustomSort: true,
  haveCustomFilter: true,
});

const applicant = columnHelper.accessor('applicant', {
  header: t('applicant'),
  cell: (info) => <div>{info.getValue()}</div>,
  haveCustomSort: true,
  haveCustomFilter: true,
});

const applyDate = columnHelper.accessor('applyDate', {
  header: t('applicantDate'),
  cell: (info) => <div>{formatDateJP(info.getValue())}</div>,
  haveCustomSort: true,
  haveCustomFilter: true,
});

const approverRequest = columnHelper.accessor('approverRequest', {
  header: t('authorizer'),
  cell: (info) => <div>{info.getValue()}</div>,
});
const agentRequest = columnHelper.accessor('agentRequest', {
  header: t('agentImport'),
  cell: (info) => <div>{info.getValue() === null ? '_' : info.getValue()}</div>,
});
const columnsImportProcessList = [
  matterNo,
  matterName,
  careerName,
  applicant,
  applyDate,
  approverRequest,
  agentRequest,
];

export { columnsImportProcessList };
