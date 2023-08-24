import { BUSINESS_CATEGORY_CODE } from 'dhm/utils/constants/select';
import { formatDateJP } from 'dhm/utils/helpers/format';

const arrayPayload = (array) => {
  const filteredArray = array.filter((element) => element !== null);
  const result = `[${filteredArray.join(',')}]`;
  return result;
};
const dataCreateProjectInfo = ({ data, employeeId }) => ({
  employeeId,
  projectId: data.projectId,
  projectName: data.projectName,
  client: data.client,
  counter: data.counter,
  start: formatDateJP(data.start),
  unitPrice: `${data.unitPrice}`.replace(/,/g, ''),
  salesInCharge: data.salesInCharge,
  sellTeam: `${data.sellTeam}`.replace(/,/g, ''),
  evaluation: data.evaluation,
  rater: data.rater,
  qualEvalHrBrain: data.qualEvalHrBrain,
  qualEvalOthers: data.qualEvalOthers,
  businessContent: data.businessContent,
  recognitionOfPerson: data.recognitionOfPerson,
  salesComment: data.salesComment,
  salesEvaluation: data.salesEvaluation,
  businessCategory: arrayPayload([
    data.upstream ? BUSINESS_CATEGORY_CODE.UPSTREAM : null,
    data.pmoCustomer ? BUSINESS_CATEGORY_CODE.PMO_CTM : null,
    data.pmoSI ? BUSINESS_CATEGORY_CODE.PMO_SI : null,
    data.SI ? BUSINESS_CATEGORY_CODE.SI : null,
    data.app ? BUSINESS_CATEGORY_CODE.APP : null,
    data.infrastructure ? BUSINESS_CATEGORY_CODE.IFR : null,
  ]),
  version: 0,
});

const dataConfirmProjectInfo = ({ data, employeeId, confirmProjectInfo }) => ({
  employeeId,
  projectId: data.projectId,
  projectName: data.projectName,
  client: data.client,
  counter: data.counter,
  start: formatDateJP(data.start),
  unitPrice: Number(`${data.unitPrice}`.replace(/,/g, '')),
  salesInCharge: data.salesInCharge,
  sellTeam: Number(`${data.sellTeam}`.replace(/,/g, '')),
  evaluation: data.evaluation,
  rater: data.rater,
  qualEvalHrBrain: data.qualEvalHrBrain,
  qualEvalOthers: data.qualEvalOthers,
  businessContent: data.businessContent,
  salesEvaluation: data.salesEvaluation,
  salesComment: data.salesComment,
  recognitionOfPerson: data.recognitionOfPerson,
  businessCategory: arrayPayload([
    data.upstream ? BUSINESS_CATEGORY_CODE.UPSTREAM : null,
    data.pmoCustomer ? BUSINESS_CATEGORY_CODE.PMO_CTM : null,
    data.pmoSI ? BUSINESS_CATEGORY_CODE.PMO_SI : null,
    data.SI ? BUSINESS_CATEGORY_CODE.SI : null,
    data.app ? BUSINESS_CATEGORY_CODE.APP : null,
    data.infrastructure ? BUSINESS_CATEGORY_CODE.IFR : null,
  ]),
  version: confirmProjectInfo.version,
});

const dataEditProjectInfo = ({ data, employeeId, originData }) => ({
  employeeId,
  projectId: data.projectId,
  projectName: data.projectName,
  client: data.client,
  counter: data.counter,
  start: formatDateJP(data.start),
  unitPrice: Number(`${data.unitPrice}`.replace(/,/g, '')),
  salesInCharge: data.salesInCharge,
  sellTeam: Number(`${data.sellTeam}`.replace(/,/g, '')),
  evaluation: data.evaluation,
  rater: data.rater,
  qualEvalHrBrain: data.qualEvalHrBrain,
  qualEvalOthers: data.qualEvalOthers,
  businessContent: data.businessContent,
  salesEvaluation: data.salesEvaluation,
  recognitionOfPerson: data.recognitionOfPerson,
  salesComment: data.salesComment,
  businessCategory: arrayPayload([
    data.upstream ? BUSINESS_CATEGORY_CODE.UPSTREAM : null,
    data.pmoCustomer ? BUSINESS_CATEGORY_CODE.PMO_CTM : null,
    data.pmoSI ? BUSINESS_CATEGORY_CODE.PMO_SI : null,
    data.SI ? BUSINESS_CATEGORY_CODE.SI : null,
    data.app ? BUSINESS_CATEGORY_CODE.APP : null,
    data.infrastructure ? BUSINESS_CATEGORY_CODE.IFR : null,
  ]),
  matterNo: originData.matterNo,
  version: originData.version,
});
export { dataCreateProjectInfo, dataConfirmProjectInfo, dataEditProjectInfo };
