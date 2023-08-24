import { transOutHook } from 'dhm/contexts/TranslateContext';

const t = (key, params) => transOutHook(key, 'validatorDefine', params);
const tKey = (key) => transOutHook(key, 'keyValidatorDefine');

const messages = {
  email: {
    required: t('required', { fieldName: tKey('email') }),
    minLength: t('min_length', { minLength: '3' }),
    invalid: t('email'),
  },
  password: {
    required: t('required', { fieldName: tKey('password') }),
    minLength: t('min_length', { minLength: '3' }),
  },
  address: {
    required: t('required', { fieldName: tKey('address') }),
    minLength: t('min_length', { minLength: '3' }),
  },
  name: {
    required: t('required', { fieldName: tKey('name') }),
    minLength: t('min_length', { minLength: '3' }),
  },
  confirmPassword: {
    required: t('required', { fieldName: tKey('confirmPassword') }),
    minLength: t('min_length', { minLength: '3' }),
    equalTo: t('confirm_password'),
  },
  oldPassword: {
    required: t('required', { fieldName: tKey('oldPassword') }),
    minLength: t('min_length', { minLength: '3' }),
  },
  newPassword: {
    required: t('required', { fieldName: tKey('newPassword') }),
    minLength: t('min_length', { minLength: '3' }),
  },
  departmentId: {
    required: t('required', { fieldName: tKey('departmentId') }),
  },
  departmentName: {
    required: t('required', { fieldName: tKey('departmentName') }),
  },
  departmentLevel: {
    required: t('required', { fieldName: tKey('departmentLevel') }),
  },
  establishmentDate: {
    required: t('required', { fieldName: tKey('establishmentDate') }),
  },
  endDate: {
    required: t('required', { fieldName: tKey('endDate') }),
  },
  codeName: {
    required: t('required', { fieldName: tKey('codeName') }),
    maxLength: t('max_length', { maxLength: '100' }),
    invalid: t('invalid', { fieldName: tKey('codeName') }),
  },
  codeNameEn: {
    required: t('required', { fieldName: tKey('codeNameEn') }),
    maxLength: t('max_length', { maxLength: '100' }),
  },
  sortOrder: {
    maxLength: t('max_length', { maxLength: '2' }),
    minLength: t('min_length', { minLength: '1' }),
    invalid: t('invalid', { fieldName: tKey('sortOrder') }),
  },
  codeValueEn: {
    required: t('required', { fieldName: tKey('codeValueEn') }),
    invalid: t('invalid', { fieldName: tKey('codeValueEn') }),
    length: t('max_length', { maxLength: '10' }),
  },
  codeValue: {
    required: t('required', { fieldName: tKey('codeValue') }),
    invalid: t('invalid', { fieldName: tKey('codeValue') }),
    length: t('max_length', { maxLength: '10' }),
  },
  employeeId: {
    required: t('required', { fieldName: tKey('employeeId') }),
    invalid: t('invalid', { fieldName: tKey('employeeId') }),
    length: t('max_length', { maxLength: '10' }),
  },
  position: {
    required: t('required', { fieldName: tKey('position') }),
    invalid: t('invalid', { fieldName: tKey('position') }),
    length: t('max_length', { maxLength: '10' }),
  },
  employeeName: {
    required: t('required', { fieldName: tKey('employeeName') }),
    invalid: t('invalid', { fieldName: tKey('employeeName') }),
    length: t('max_length', { maxLength: '50' }),
  },
  employeeNameKana: {
    required: t('required', { fieldName: tKey('employeeNameKana') }),
    invalid: t('invalid', { fieldName: tKey('employeeNameKana') }),
    length: t('max_length', { maxLength: '50' }),
  },
  sex: {
    required: t('required', { fieldName: tKey('sex') }),
  },
  royaltiesOptional: {
    required: t('required', { fieldName: tKey('royaltiesOptional') }),
  },
  midCareerNewGraduate: {
    required: t('required', { fieldName: tKey('midCareerNewGraduate') }),
  },
  birthday: {
    required: t('required', { fieldName: tKey('birthday') }),
  },
  joiningCompany: {
    required: t('required', { fieldName: tKey('joiningCompany') }),
  },
  formerJob: {
    required: t('required', { fieldName: tKey('formerJob') }),
    invalid: t('invalid', { fieldName: tKey('formerJob') }),
    length: t('max_length', { maxLength: '50' }),
  },
  retirement: {
    required: t('required', { fieldName: tKey('retirement') }),
    invalid: t('invalid', { fieldName: tKey('retirement') }),
    length: t('max_length', { maxLength: '50' }),
  },
  retirementDate: {
    required: t('required', { fieldName: tKey('retirementDate') }),
  },
  eduBackground: {
    required: t('required', { fieldName: tKey('eduBackground') }),
    invalid: t('invalid', { fieldName: tKey('eduBackground') }),
    length: t('max_length', { maxLength: '50' }),
  },
  joiningPathChargePerson: {
    invalid: t('invalid', { fieldName: tKey('joiningPathChargePerson') }),
    length: t('max_length', { maxLength: '50' }),
  },
  joiningPathDescription: {
    invalid: t('invalid', { fieldName: tKey('joiningPathDescription') }),
    length: t('max_length', { maxLength: '200' }),
    required: t('required', { fieldName: tKey('joiningPathDescription') }),
  },
  joiningCompanyReason: {
    invalid: t('invalid', { fieldName: tKey('joiningCompanyReason') }),
    length: t('max_length', { maxLength: '75' }),
    required: t('required', { fieldName: tKey('joiningCompanyReason') }),
  },
  can: {
    invalid: t('invalid', { fieldName: tKey('can') }),
    length: t('max_length', { maxLength: '150' }),
    required: t('required', { fieldName: tKey('can') }),
  },
  will: {
    invalid: t('invalid', { fieldName: tKey('will') }),
    length: t('max_length', { maxLength: '150' }),
    required: t('required', { fieldName: tKey('will') }),
  },
  royaltiesDescription: {
    invalid: t('invalid', { fieldName: tKey('royaltiesDescription') }),
    length: t('max_length', { maxLength: '300' }),
    required: t('required', { fieldName: tKey('royaltiesDescription') }),
  },
  // Traning Master
  trainingCode: {
    required: t('required', { fieldName: tKey('trainingCode') }),
    invalid: t('invalid', { fieldName: tKey('trainingCode') }),
    length: t('max_length', { maxLength: '10' }),
  },
  trainingType: {
    required: t('required', { fieldName: tKey('trainingType') }),
    invalid: t('invalid', { fieldName: tKey('trainingType') }),
    length: t('max_length', { maxLength: '5' }),
  },
  trainingName: {
    required: t('required', { fieldName: tKey('trainingName') }),
    length: t('max_length', { maxLength: '100' }),
    invalid: t('invalid', { fieldName: tKey('trainingName') }),
  },
  effectStartDate: {
    required: t('required', { fieldName: tKey('effectStartDate') }),
  },
  effectEndDate: {
    required: t('required', { fieldName: tKey('effectEndDate') }),
  },

  // Company Policy
  compPolicyClassCode: {
    required: t('required', { fieldName: tKey('compPolicyClassCode') }),
    invalid: t('invalid', { fieldName: tKey('compPolicyClassCode') }),
    length: t('max_length', { maxLength: '10' }),
  },
  compPolicyClassName: {
    required: t('required', { fieldName: tKey('compPolicyClassName') }),
    invalid: t('invalid', { fieldName: tKey('compPolicyClassName') }),
    length: t('max_length', { maxLength: '5' }),
  },
  userCode: {
    required: t('required', { fieldName: tKey('userCode') }),
    invalid: t('invalid', { fieldName: tKey('userCode') }),
    length: t('max_length', { maxLength: '10' }),
  },
  role: {
    required: t('required', { fieldName: tKey('role') }),
  },
  esMngPred: {
    required: t('required', { fieldName: tKey('esMngPred') }),
    invalid: t('invalid', { fieldName: tKey('esMngPred') }),
    length: t('max_length', { maxLength: '30' }),
  },
  esMngPredDescription: {
    length: t('max_length', { maxLength: '100' }),
  },
  whatTodo: {
    length: t('max_length', { maxLength: '300' }),
  },
  policyProgress: {
    required: t('required', { fieldName: tKey('policyProgress') }),
    length: t('max_length', { maxLength: '300' }),
  },
  asis: {
    required: t('required', { fieldName: tKey('asis') }),
    length: t('max_length', { maxLength: '200' }),
  },
  riskDescription: {
    required: t('required', { fieldName: tKey('riskDescription') }),
    length: t('max_length', { maxLength: '300' }),
  },
  assignDescription: {
    required: t('required', { fieldName: tKey('assignDescription') }),
    length: t('max_length', { maxLength: '300' }),
  },

  // ProjectInfo
  projectId: {
    required: t('required', { fieldName: tKey('projectId') }),
    length: t('max_length', { maxLength: '20' }),
    invalid: t('invalid', { fieldName: tKey('projectId') }),
  },
  projectName: {
    required: t('required', { fieldName: tKey('projectName') }),
    length: t('max_length', { maxLength: '100' }),
  },
  client: {
    required: t('required', { fieldName: tKey('client') }),
    length: t('max_length', { maxLength: '50' }),
    invalid: t('invalid', { fieldName: tKey('client') }),
  },
  counter: {
    required: t('required', { fieldName: tKey('counter') }),
    length: t('max_length', { maxLength: '50' }),
    invalid: t('invalid', { fieldName: tKey('counter') }),
  },
  start: {
    required: t('required', { fieldName: tKey('start') }),
  },
  salesInCharge: {
    required: t('required', { fieldName: tKey('salesInCharge') }),
    length: t('max_length', { maxLength: '50' }),
    invalid: t('invalid', { fieldName: tKey('salesInCharge') }),
  },
  unitPrice: {
    required: t('required', { fieldName: tKey('unitPrice') }),
    invalid: t('invalid', { fieldName: tKey('unitPrice') }),
    length: t('max_length', { maxLength: '12' }),
  },
  sellTeam: {
    required: t('required', { fieldName: tKey('sellTeam') }),
    invalid: t('invalid', { fieldName: tKey('sellTeam') }),
    length: t('max_length', { maxLength: '12' }),
  },
  evaluation: {
    required: t('required', { fieldName: tKey('evaluation') }),
    invalid: t('invalid', { fieldName: tKey('evaluation') }),
    range: t('rangeEvaluation'),
  },
  rater: {
    required: t('required', { fieldName: tKey('rater') }),
    length: t('max_length', { maxLength: '50' }),
    invalid: t('invalid', { fieldName: tKey('rater') }),
  },
  recognitionOfPerson: {
    required: t('required', { fieldName: tKey('recognitionOfPerson') }),
  },
  businessContent: {
    required: t('required', { fieldName: tKey('businessContent') }),
    length: t('max_length', { maxLength: '200' }),
  },
  qualEvalHrBrain: {
    length: t('max_length', { maxLength: '3000' }),
  },
  qualEvalOthers: {
    length: t('max_length', { maxLength: '3000' }),
  },

  // InterviewLog
  date: {
    required: t('required', { fieldName: tKey('date') }),
  },
  content: {
    required: t('required', { fieldName: tKey('content') }),
    length: t('max_length', { maxLength: '500' }),
  },
  category: {
    required: t('required', { fieldName: tKey('category') }),
  },
  esManagerCode: {
    required: t('required', { fieldName: tKey('esManagerCode') }),
  },
  hobby: {
    invalid: t('invalid', { fieldName: tKey('hobby') }),
    length: t('max_length', { maxLength: '30' }),
  },
  goodFriends: {
    invalid: t('invalid', { fieldName: tKey('goodFriends') }),
    length: t('max_length', { maxLength: '30' }),
  },
  coachMentor: {
    invalid: t('invalid', { fieldName: tKey('coachMentor') }),
    length: t('max_length', { maxLength: '20' }),
  },
  kof: {
    length: t('max_length', { maxLength: '300' }),
  },
  otherSuccessDescription: {
    length: t('max_length', { maxLength: '300' }),
  },
  otherKof: {
    length: t('max_length', { maxLength: '300' }),
  },

  // Overtime setting
  fiscalYearOvertime: {
    required: t('required', { fieldName: tKey('year') }),
  },
  year: {
    required: t('required', { fieldName: tKey('year') }),
  },
  monthlyOtLimit: {
    required: t('required', { fieldName: tKey('overtime_setting') }),
    invalid: t('invalid', { fieldName: tKey('overtime_setting') }),
    length: t('max_length', { maxLength: '5' }),
    range: t('limitMinuteOvertime'),
  },
  mailAddress: {
    required: t('required', { fieldName: tKey('mailAddress') }),
    invalid: t('invalid', { fieldName: tKey('mailAddress') }),
    length: t('max_length', { maxLength: '100' }),
  },
  userName: {
    required: t('required', { fieldName: tKey('userName') }),
    invalid: t('invalid', { fieldName: tKey('userName') }),
    length: t('max_length', { maxLength: '30' }),
  },
  roleId: {
    required: t('required', { fieldName: tKey('roleId') }),
    length: t('max_length', { maxLength: '50' }),
    invalidRole: t('invalid_role'),
    invalid: t('invalid', { fieldName: tKey('roleId') }),
  },
  roleName: {
    required: t('required', { fieldName: tKey('roleName') }),
    length: t('max_length', { maxLength: '50' }),
  },
  roleDescription: {
    length: t('max_length', { maxLength: '100' }),
  },
  esMngBelong: {
    required: t('required', { fieldName: tKey('esMngBelong') }),
  },
  salesEvaluation: {
    required: t('required', { fieldName: tKey('salesEvaluation') }),
  },
  policy: {
    required: t('required', { fieldName: tKey('policy') }),
  },
  canSelCatUpStream: {
    required: t('required', { fieldName: tKey('canSelCatUpStream') }),
  },
  canSelCatPmoCus: {
    required: t('required', { fieldName: tKey('canSelCatPmoCus') }),
  },
  canSelCatPmoSi: {
    required: t('required', { fieldName: tKey('canSelCatPmoSi') }),
  },
  canSelCatSi: {
    required: t('required', { fieldName: tKey('canSelCatSi') }),
  },
  canSelTerriroryApp: {
    required: t('required', { fieldName: tKey('canSelTerriroryApp') }),
  },
  canSelTerriroryInfra: {
    required: t('required', { fieldName: tKey('canSelTerriroryInfra') }),
  },
  canSelEnglishReadAndWrite: {
    required: t('required', { fieldName: tKey('canSelEnglishReadAndWrite') }),
  },
  canSelEnglishListenToSpeak: {
    required: t('required', { fieldName: tKey('canSelEnglishListenToSpeak') }),
  },
  approverRequest: {
    required: t('required', { fieldName: tKey('approverRequest') }),
  },
  matterName: {
    required: t('required', { fieldName: tKey('matterName') }),
  },
  esManagerStartDate: {
    required: t('required', { fieldName: tKey('esManagerStartDate') }),
  },
  // Workflow
  wfStatusId: {
    required: t('required', { fieldName: tKey('wfStatusId') }),
  },
  esManager: {
    required: t('required', { fieldName: tKey('esManager') }),
  },
  relationship: {
    required: t('required', { fieldName: tKey('relationship') }),
  },
  comprehension: {
    required: t('required', { fieldName: tKey('comprehension') }),
  },
  applyComment: {
    length: t('max_length', { maxLength: '100' }),
  },
  processComment: {
    length: t('max_length', { maxLength: '100' }),
  },
};
export { messages };
