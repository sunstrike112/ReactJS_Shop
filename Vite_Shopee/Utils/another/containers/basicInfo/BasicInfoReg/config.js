import { formatDateJP } from 'dhm/utils/helpers/format';

const dataPayloadMain = ({ data, dataJoiningCompanyReason, esResponsibility }) => ({
  employeeId: data.employeeId,
  position: data.position,
  employeeName: data.employeeName,
  employeeNameKana: data.employeeNameKana,
  sex: data.sex,
  birthday: formatDateJP(data.birthday),
  joiningCompany: formatDateJP(data.joiningCompany),
  eduBackground: data.eduBackground,
  retirement: data.retirement,
  formerJob: data.formerJob,
  joiningPathOptional: data.joiningPathOptional || '',
  joiningPathChargePerson: data.joiningPathChargePerson || '',
  joiningPathDescription: data.joiningPathDescription || '',
  joiningCompanyReason: dataJoiningCompanyReason,
  midCareerNewGraduate: data.midCareerNewGraduate,
  hobby: data.hobby || '',
  goodFriends: data.goodFriends || '',
  coachMentor: data.coachMentor || '',
  retirementDate: formatDateJP(data.retirementDate),
  esResponsibility: esResponsibility || false,
});

const dataPayloadSub = ({ employeeId, option, description, dataCan, dataWill, data }) => ({
  employeeId,
  royaltiesOptional: +option,
  royaltiesDescription: description,
  can: dataCan,
  will: dataWill,
  canSelCatUpStream: data?.canSelCatUpStream,
  canSelCatPmoCus: data?.canSelCatPmoCus,
  canSelCatPmoSi: data?.canSelCatPmoSi,
  canSelCatSi: data?.canSelCatSi,
  canSelTerriroryApp: data?.canSelTerriroryApp,
  canSelTerriroryInfra: data?.canSelTerriroryInfra,
  canSelEnglishReadAndWrite: data?.canSelEnglishReadAndWrite,
  canSelEnglishListenToSpeak: data?.canSelEnglishListenToSpeak,
});

export { dataPayloadMain, dataPayloadSub };
