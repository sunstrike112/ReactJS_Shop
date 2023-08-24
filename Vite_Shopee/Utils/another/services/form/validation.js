import * as yup from 'yup';
import { messages } from './messages';
import { regex } from './regex';

const MAX = 50;

const formatMultiName = (key, name, validate = null, max = 1) => {
  const obj = {};
  for (let i = 0; i <= max - 1; i += 1) {
    obj[`${key}.${i}.${name}`] = validate;
  }
  return obj;
};

const validateFunc = (key, max = MAX, regexType = 'fullWidthHalfWidth') => ({
  [key]: yup
    .string()
    .required(messages[key].required)
    .max(max, messages[key].length)
    .matches(regex[regexType], messages[key].invalid),
});
const validateFuncDontRequired = (key, max = MAX, regexType = 'fullWidthHalfWidth') => ({
  [key]: yup
    .string()
    .max(max, messages[key].length)
    .when(`$${key}`, (keyName, schema) =>
      regexType ? schema.matches(regex[regexType], messages[key].invalid) : schema,
    ),
});
const validateIfHaveData = (key, max = MAX, regexType = 'fullWidthHalfWidth') => ({
  [key]: yup
    .string()
    .nullable()
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .trim()
    .max(max, messages[key].length)
    .when(`$${key}`, (keyName, schema) =>
      regexType ? schema.matches(regex[regexType], messages[key].invalid) : schema,
    ),
});
// const formatLoopName = (name, validate = null, max = 1) => {
//   const obj = {};
//   for (let i = 1; i <= max - 1; i += 1) {
//     obj[`${name}${i}`] = validate;
//   }
//   return obj;
// };
// eslint-disable-next-line no-unused-vars
const validateMultiName = (name, maxKey = 1, max = MAX, regexType = 'fullWidthHalfWidth') => {
  const obj = {};
  for (let i = 1; i <= maxKey; i += 1) {
    obj[`${name}${i}`] = yup
      .string()
      .nullable()
      .transform((value, originalValue) => (originalValue === '' ? null : value))
      .trim()
      // .max(max, messages[name].length)
      .when(`$${name}${i}`, (keyName, schema) =>
        keyName ? schema.matches(regex[regexType], messages[name].invalid) : schema,
      );
  }
  return obj;
};
const validation = {
  email: yup
    .string()
    .required(messages.email.required)
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, messages.email.invalid)
    .min(3, messages.email.minLength),
  password: yup.string().trim().required(messages.password.required).min(3, messages.password.minLength),
  address: yup.string().trim().required(messages.address.required).min(3, messages.address.minLength),
  name: yup.string().trim().required(messages.name.required).min(3, messages.name.minLength),
  oldPassword: yup.string().trim().required(messages.oldPassword.required).min(3, messages.oldPassword.minLength),
  newPassword: yup.string().trim().required(messages.newPassword.required).min(3, messages.newPassword.minLength),
  confirmPassword: yup
    .string()
    .trim()
    .required(messages.confirmPassword.required)
    .min(3, messages.confirmPassword.minLength),
  departmentId: yup.string().trim().required(messages.departmentId.required),
  departmentName: yup.string().trim().required(messages.departmentName.required).nullable(),
  departmentLevel: yup.string().required(messages.departmentLevel.required),
  establishmentDate: yup.string().required(messages.establishmentDate.required),
  // message chưa define lại
  codeValue: yup
    .string()
    .required(messages.codeValueEn.required)
    .nullable()
    .max(10)
    .matches(regex.halfWidthAlphanumeric, messages.codeValueEn.invalid),
  codeName: yup.string().required(messages.codeName.required).nullable().max(100, messages.codeName.maxLength),
  codeNameEn: yup.string().required(messages.codeNameEn.required).max(100, messages.codeNameEn.maxLength),
  ...formatMultiName('account', 'name', yup.string().required(messages.name.required), 5),
  sortOrder: yup
    .string()
    .nullable(true)
    .max(2, messages.sortOrder.maxLength)
    .matches(regex.halfWidthNumber, messages.sortOrder.invalid),
  ...validateFunc('employeeId', 10, 'halfWidthAlphanumeric'),
  ...validateFunc('position', 10),
  ...validateFunc('employeeName'),
  ...validateFunc('employeeNameKana', 50, 'kana'),
  sex: yup.string().required(messages.sex.required),
  birthday: yup.string().required(messages.birthday.required),
  joiningCompany: yup.string().required(messages.joiningCompany.required),
  ...validateFunc('formerJob', MAX, null),
  ...validateFunc('retirement'),
  ...validateFunc('eduBackground'),
  ...validateIfHaveData('joiningPathChargePerson'),
  ...validateIfHaveData('joiningPathDescription', 200, null),
  ...validateMultiName('can', 2, 150, null),
  ...validateMultiName('will', 2, 150, null),
  ...validateMultiName('joiningCompanyReason', 4, 75, null),
  ...validateFunc('royaltiesDescription', 300, null),
  // Traning Master
  ...validateFunc('trainingCode', 10, 'halfWidthAlphanumeric'),
  ...validateFunc('trainingType', 5, 'halfWidthAlphanumeric'),
  ...validateFunc('trainingName', 100),
  effectStartDate: yup.string().required(messages.effectStartDate.required),
  effectEndDate: yup.string().required(messages.effectEndDate.required),
  // Company Policy
  ...validateFunc('compPolicyClassCode', 10, 'halfWidthAlphanumeric'),
  ...validateFunc('compPolicyClassName', 5, 'halfWidthAlphanumeric'),
  ...validateFunc('userCode', 10, 'halfWidthAlphanumeric'),
  role: yup.string().required(messages.role.required),
  ...validateFunc('esMngPred', 30),
  esMngPredDescription: yup.string().max(100, messages.esMngPredDescription.length),
  policyProgress: yup.string().required(messages.policyProgress.required).max(300, messages.policyProgress.length),
  asis: yup.string().required(messages.asis.required).max(200, messages.asis.length),
  riskDescription: yup.string().required(messages.riskDescription.required).max(300, messages.riskDescription.length),
  assignDescription: yup
    .string()
    .required(messages.assignDescription.required)
    .max(300, messages.assignDescription.length),

  // ProjectInfo
  projectId: yup
    .string()
    .required(messages.projectId.required)
    .max(20, messages.projectId.length)
    .matches(regex.fullWidthHalfWidthAccept, messages.projectId.invalid),
  projectName: yup.string().required(messages.projectName.required).max(100, messages.projectName.length),
  client: yup
    .string()
    .trim()
    .required(messages.client.required)
    .max(50, messages.client.length)
    .matches(regex.fullWidthHalfWidthDashJP, messages.client.invalid),
  counter: yup
    .string()
    .trim()
    .required(messages.counter.required)
    .max(50, messages.counter.length)
    .matches(regex.fullWidthHalfWidthDashJP, messages.counter.invalid),
  start: yup.string().required(messages.start.required),
  salesInCharge: yup
    .string()
    .trim()
    .required(messages.salesInCharge.required)
    .max(50, messages.salesInCharge.length)
    .matches(regex.fullWidthHalfWidthDashJP, messages.salesInCharge.invalid),
  unitPrice: yup
    .string()
    .required(messages.unitPrice.required)
    .max(15, messages.unitPrice.length)
    .matches(regex.numberCurrency, messages.unitPrice.invalid),
  sellTeam: yup
    .string()
    .required(messages.sellTeam.required)
    .max(15, messages.sellTeam.length)
    .matches(regex.numberCurrency, messages.sellTeam.invalid),
  evaluation: yup
    .string()
    .required(messages.evaluation.required)
    .matches(regex.decimalTwoNumbers, messages.evaluation.invalid)
    .test('rangeValue', messages.evaluation.range, (number) => !(Number(number) > 5 || Number(number) < 1))
    .test('maxDigits', messages.evaluation.invalid, (number) => {
      if (String(number).includes('.')) return String(number).length === 3;
      return String(number).length === 1;
    }),
  rater: yup
    .string()
    .trim()
    .required(messages.rater.required)
    .max(50, messages.rater.length)
    .matches(regex.fullWidthHalfWidthDashJP, messages.rater.invalid),
  recognitionOfPerson: yup.string().required(messages.recognitionOfPerson.required),
  businessContent: yup
    .string()
    .trim()
    .required(messages.businessContent.required)
    .max(200, messages.businessContent.length),
  qualEvalHrBrain: yup.string().max(3000, messages.qualEvalHrBrain.length).nullable(),
  qualEvalOthers: yup.string().max(3000, messages.qualEvalOthers.length).nullable(),

  // InterviewLog
  date: yup.string().required(messages.date.required),
  esManagerCode: yup.string().required(messages.esManagerCode.required),
  category: yup.string().required(messages.category.required),
  content: yup.string().trim().required(messages.content.required).max(500, messages.content.length),

  // Overtime setting
  fiscalYearOvertime: yup.string().required(messages.fiscalYearOvertime.required),
  year: yup.string().required(messages.year.required),
  monthlyOtLimit: yup
    .string()
    .required(messages.monthlyOtLimit.required)
    .max(5, messages.monthlyOtLimit.length)
    .matches(regex.hourMinuteFormat, messages.monthlyOtLimit.invalid)
    .test('limitMinute', messages.monthlyOtLimit.range, (number) => {
      if (String(number).includes(':')) return String(number).split(':')[1] <= 59;
      return false;
    }),

  royaltiesOptional: yup.string().required(messages.royaltiesOptional.required),
  midCareerNewGraduate: yup.string().required(messages.midCareerNewGraduate.required),
  ...validateFuncDontRequired('hobby', 30, null),
  ...validateFuncDontRequired('goodFriends', 30, null),
  ...validateFuncDontRequired('coachMentor', 20, null),
  kof: yup.string().max(300, messages.kof.length),
  otherSuccessDescription: yup.string().max(300, messages.otherSuccessDescription.length),
  otherKof: yup.string().max(300, messages.otherKof.length),
  mailAddress: yup
    .string()
    .required(messages.mailAddress.required)
    .max(100, messages.mailAddress.length)
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, messages.mailAddress.invalid),
  userName: yup
    .string()
    .required(messages.userName.required)
    .max(30, messages.userName.length)
    .matches(regex.preventSpecialCharHaveSpace, messages.userName.invalid),
  roleId: yup
    .string()
    .required(messages.roleId.required)
    .max(50, messages.roleId.length)
    .test('not-invalid-role', messages.roleId.invalidRole, (value) => {
      // Convert the input to lowercase for comparison
      const lowercaseValue = value ? value.toLowerCase() : '';
      return lowercaseValue !== 'sysadmin';
    })
    .matches(regex.fullWidthHalfWidthAccept, messages.roleId.invalid)
    .trim(),
  roleName: yup.string().required(messages.roleName.required).max(50, messages.roleName.length).trim(),
  roleDescription: yup.string().max(100, messages.roleDescription.length).trim(),
  esMngBelong: yup.string().required(messages.esMngBelong.required),
  salesEvaluation: yup.string().required(messages.salesEvaluation.required),
  salesComment: yup.string(),
  policy: yup.string().required(messages.policy.required),
  canSelCatUpStream: yup.string().required(messages.canSelCatUpStream.required),
  canSelCatPmoCus: yup.string().required(messages.canSelCatPmoCus.required),
  canSelCatPmoSi: yup.string().required(messages.canSelCatPmoSi.required),
  canSelCatSi: yup.string().required(messages.canSelCatSi.required),
  canSelTerriroryApp: yup.string().required(messages.canSelTerriroryApp.required),
  canSelTerriroryInfra: yup.string().required(messages.canSelTerriroryInfra.required),
  canSelEnglishReadAndWrite: yup.string().required(messages.canSelEnglishReadAndWrite.required),
  canSelEnglishListenToSpeak: yup.string().required(messages.canSelEnglishListenToSpeak.required),
  approverRequest: yup.string().required(messages.approverRequest.required),
  matterName: yup.string().required(messages.matterName.required),

  // Workflow
  wfStatusId: yup.string().required(messages.wfStatusId.required),
  processComment: yup.string().max(100, messages.processComment.length),

  esManager: yup.string().required(messages.esManager.required),
  relationship: yup
    .string()
    .required(messages.relationship.required)
    .test('is-not-zero', messages.relationship.required, (value) => value !== '0'),
  comprehension: yup
    .string()
    .required(messages.comprehension.required)
    .test('is-not-zero', messages.comprehension.required, (value) => value !== '0'),
  whatTodo: yup.string().max(300, messages.whatTodo.length),
  esManagerStartDate: yup.string().required(messages.esManagerStartDate.required),
  applyComment: yup.string().max(100, messages.applyComment.length),
};
const specialValidation = {};

export { validation, specialValidation };
