import { createColumnHelper } from '@tanstack/react-table';
import { transOutHook } from 'dhm/contexts/TranslateContext';
import { WF_STATUS } from 'dhm/utils/constants/select';
import { convertToCurrentTime } from 'dhm/utils/helpers/convert';
import { formatDateJP } from 'dhm/utils/helpers/format';

const columnHelper = createColumnHelper();
const tWorkflow = (value) => transOutHook(value, 'workflow');
const trans = (value) => transOutHook(value, 'table');

const matterNo = columnHelper.accessor('matterNo', {
  header: tWorkflow('matterNo'),
  cell: (info) => <>{info.getValue()}</>,
});
const matterName = columnHelper.accessor('matterName', {
  header: tWorkflow('matterName'),
  cell: (info) => <>{info.getValue()}</>,
});
const careerId = columnHelper.accessor('careerName', {
  header: tWorkflow('careerId'),
  cell: (info) => <>{info.getValue()}</>,
});
const wfStatusId = columnHelper.accessor('wfStatusId', {
  header: tWorkflow('wfStatus'),
  cell: (info) => <>{tWorkflow(WF_STATUS[info.getValue()])}</>,
});
const applicant = columnHelper.accessor('applicant', {
  header: tWorkflow('applicant'),
  cell: (info) => <>{info.getValue()}</>,
});
const applyDate = columnHelper.accessor('applyDate', {
  header: tWorkflow('applyDateHis'),
  cell: (info) => <>{formatDateJP(info.getValue())}</>,
});
const applyComment = columnHelper.accessor('applyComment', {
  header: tWorkflow('applyComment'),
  cell: (info) => <>{info.getValue()}</>,
});

const approverRequest = columnHelper.accessor('approverRequest', {
  header: tWorkflow('approverRequest'),
  cell: (info) => <>{info.getValue()}</>,
});
const agentRequest = columnHelper.accessor('agentRequest', {
  header: tWorkflow('agentRequest'),
  cell: (info) => <>{info.getValue()}</>,
  minSize: 350,
});
const approver = columnHelper.accessor('approver', {
  header: tWorkflow('approver'),
  cell: (info) => <>{info.getValue()}</>,
  minSize: 350,
});
const processComment = columnHelper.accessor('processComment', {
  header: tWorkflow('processComment'),
  cell: (info) => <>{info.getValue()}</>,
  minSize: 250,
});
const approvedDate = columnHelper.accessor('approvedDate', {
  header: tWorkflow('approvedDate'),
  cell: (info) => <>{formatDateJP(info.getValue())}</>,
});

const createdDatetime = columnHelper.accessor('createdDatetime', {
  header: trans('createdDatetime'),
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

const columnHistoryTable = {
  matterNo,
  matterName,
  careerId,
  wfStatusId,
  applicant,
  applyDate,
  applyComment,
  approverRequest,
  agentRequest,
  approver,
  processComment,
  approvedDate,
  createdDatetime,
  createdUser,
  updatedDatetime,
  updatedUser,
};

export { columnHistoryTable };
