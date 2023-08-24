import { formatDateJP } from 'dhm/utils/helpers/format';

const getDataCreateInterviewLog = ({ data, employeeId }) => ({
  employeeId,
  date: formatDateJP(data.date),
  nextDate: formatDateJP(data.nextDate),
  category: data.category,
  esManagerCode: data.esManagerCode === '' ? null : data.esManagerCode,
  content: data.content,
  serialNumber: 0,
  version: 0,
});

const getDataEditInterviewLog = ({ data, employeeId, originData }) => ({
  employeeId,
  date: formatDateJP(data.date),
  nextDate: formatDateJP(data.nextDate),
  category: data.category,
  esManagerCode: data.esManagerCode === '' ? null : data.esManagerCode,
  content: data.content,
  serialNumber: originData.serialNumber,
  version: originData.version,
});
export { getDataCreateInterviewLog, getDataEditInterviewLog };
