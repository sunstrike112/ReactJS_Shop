import { transOutHook } from 'dhm/contexts/TranslateContext';

const trans = (value) => transOutHook(value, 'form');

const LEVEL_DEPARTMENT = [
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
  { value: 4, label: '4' },
  { value: 5, label: '5' },
];

const LEVEL_EMPLOYEE = [
  { value: 0, label: '0' },
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
  { value: 4, label: '4' },
];

const LEVEL_RELATION = [
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
  { value: 4, label: '4' },
];

const ROYALTIES_OPTIONAL = Array.from({ length: 4 }, (_, i) => ({
  value: i + 1,
  label: i + 1,
}));

const ES_ROLE = [
  { value: 1, label: 'Admin' },
  { value: 2, label: 'ES' },
  { value: 3, label: 'Guest' },
];

const TYPE_SELECT = {
  TOBE_FY: 'TOBE_FY',
  T_RISK: 'T_RISK',
  INTERVIEW_CATEGORY: 'INTERVIEW_CATEGORY',
  BUSINESS_CATEGORY: 'BUSINESS_CATEGORY',
  RECOGNIZE_PERSON: 'RECOGNIZE_PERSON',
};

const BUSINESS_CATEGORY_CODE = {
  UPSTREAM: '01',
  PMO_CTM: '02',
  PMO_SI: '03',
  SI: '04',
  APP: '05',
  IFR: '06',
};

const YEAR_RANGE = {
  MAX: '12-31-2099',
  MIN: '01-01-2000',
  FISCAL_YEAR: '2099',
};

const LIST_MONTH_FISCAL_YEAR = [
  { month: '4', value: 'april', labelEN: 'Apr', labelJP: '4月' },
  { month: '5', value: 'may', labelEN: 'May', labelJP: '5月' },
  { month: '6', value: 'june', labelEN: 'Jun', labelJP: '6月' },
  { month: '7', value: 'july', labelEN: 'Jul', labelJP: '7月' },
  { month: '8', value: 'aug', labelEN: 'Aug', labelJP: '8月' },
  { month: '9', value: 'sept', labelEN: 'Sep', labelJP: '9月' },
  { month: '10', value: 'oct', labelEN: 'Oct', labelJP: '10月' },
  { month: '11', value: 'nov', labelEN: 'Nov', labelJP: '11月' },
  { month: '12', value: 'dec', labelEN: 'Dec', labelJP: '12月' },
  { month: '1', value: 'jan', labelEN: 'Jan', labelJP: '1月' },
  { month: '2', value: 'feb', labelEN: 'Feb', labelJP: '2月' },
  { month: '3', value: 'mar', labelEN: 'Mar', labelJP: '3月' },
];

const OPTION_YEAR_OVERTIME = [
  {
    value: new Date().getFullYear(),
    label: new Date().getFullYear(),
  },
  {
    value: new Date().getFullYear() - 1,
    label: new Date().getFullYear() - 1,
  },
  {
    value: new Date().getFullYear() - 2,
    label: new Date().getFullYear() - 2,
  },
];

const DASHBOARD_ALERT_CONFIRM = {
  PROMOTION: ['03', '04'],
  T_RISK: ['03', '04'],
  ES_STATUS: ['03'],
  RECOGNIZE_PERSON: ['03'],
};

const MODE_COLOR = {
  GRAY: 'gray',
  RED: 'red',
};

const CODE_ID = {
  PROMOTION: 'TOBE_FY',
  T_RISK: 'T_RISK',
  ES_STATUS: 'ES_STATUS',
  RECOGNIZE_PERSON: 'RECOGNIZE_PERSON',
};

const STATUS = {
  SELF_APPLY: 'selfApply',
  SELF_PENDING: 'selfPending',
  AGENT_APPLY: 'agentApply',
  SELF_PROCESSED: 'selfProcessed',
  SELF_CANCEL: 'selfCancel',
  SELF_APPROVED: 'selfApproved',
  SELF_REJECTED: 'selfRejected',
  AGENT_APPROVED: 'agentApproved',
  AGENT_REJECTED: 'agentRejected',
  COMPLETED: 'completed',
  REQUEST: 'request',
  RESPOND: 'respond',
  DONE: 'done',
  ACTION_REQUIRED: 'action',
};

const PROCESS_TYPE = {
  CANCEL: [{ value: 4, label: 'cancel' }],
  APPROVAL_DENIAL: [
    { value: 2, label: 'approval' },
    { value: 3, label: 'denial' },
  ],
  ALL: [
    { value: 2, label: 'approval' },
    { value: 3, label: 'denial' },
    { value: 4, label: 'cancel' },
  ],
};

const WF_STATUS = {
  1: 'applying',
  2: 'approved',
  3: 'denial',
  4: 'cancel',
  APPLYING: 1,
  APPROVAL: 2,
  DENIAL: 3,
  CANCEL: 4,
};

const MODE_PROCESS = {
  APPROVAL: 'approval',
  DENIAL: 'denial',
  APPLICANT: 'applicant',
  REQUEST: 'request',
};

const TYPE_RECORD = {
  BASIC_INFO: 'basicInfo',
  EMP_SUCCESS_AXIS: 'employeeSuccess',
  INTERVIEW_LOG: 'interviewLog',
  OVERVIEW: 'overview',
  POLICY_PROGRESS: 'policyProgress',
  PROJECT_INFO: 'projectInfo',
};

const NO_SELECT_OPTION = {
  value: '',
  label: trans('notSelect'),
};
export {
  LEVEL_DEPARTMENT,
  ROYALTIES_OPTIONAL,
  ES_ROLE,
  LEVEL_EMPLOYEE,
  LEVEL_RELATION,
  TYPE_SELECT,
  BUSINESS_CATEGORY_CODE,
  YEAR_RANGE,
  LIST_MONTH_FISCAL_YEAR,
  OPTION_YEAR_OVERTIME,
  DASHBOARD_ALERT_CONFIRM,
  MODE_COLOR,
  CODE_ID,
  STATUS,
  PROCESS_TYPE,
  WF_STATUS,
  MODE_PROCESS,
  TYPE_RECORD,
  NO_SELECT_OPTION,
};
