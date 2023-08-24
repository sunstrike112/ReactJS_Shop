import { formatDateJP } from 'dhm/utils/helpers/format';

const getDataOverview = ({ employeeId, data, actionRequiredWatch, originData, avatar, esManagerWatch }) => ({
  employeeId,
  status: data.status,
  relationship: esManagerWatch === '' || esManagerWatch === null ? 0 : data.relationship,
  comprehension: esManagerWatch === '' || esManagerWatch === null ? 0 : data.comprehension,
  esManager: data.esManager === '' ? null : data.esManager,
  predecessor: data.predecessor === '' ? null : data.predecessor,
  actionRequired: data.actionRequired ? 1 : 0,
  whenEnd: actionRequiredWatch ? formatDateJP(data.whenEnd) : null,
  predecessorEndDate: formatDateJP(data.predecessorEndDate),
  esManagerEndDate: '',
  predecessorStartDate: '',
  esManagerStartDate: formatDateJP(data.esManagerStartDate),
  whatTodo: actionRequiredWatch ? data.whatTodo : null,
  pinasaFlag: data.pinasaFlag ? 1 : 0,
  overtimeFlag: data.overtimeFlag ? 1 : 0,
  leaveOff: data.leaveOff ? 1 : 0,
  childcareMaternityLeave: data.childcareMaternityLeave ? 1 : 0,
  notInOperation: data.notInOperation ? 1 : 0,
  bossThin: data.bossThin ? 1 : 0,
  avatar,
  version: originData.version || 0,
});

export { getDataOverview };
