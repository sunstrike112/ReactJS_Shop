import { createColumnHelper } from '@tanstack/react-table';
import { formatDateJP } from 'dhm/utils/helpers/format';

const columnHelper = createColumnHelper();

const royaltiesDescription = columnHelper.accessor('royaltiesDescription', {
  header: '記述',
  cell: (info) => <>{info.getValue()}</>,
  styles: {
    maxWidth: '200px',
  },
});

const royaltiesOptional = columnHelper.accessor('royaltiesOptional', {
  header: 'ロイヤリティ選択',
  cell: (info) => <>{info.getValue()}</>,
});
const employeeId = columnHelper.accessor('employeeId', {
  header: '社員ID',
  cell: (info) => <>{info.getValue()}</>,
});

const position = columnHelper.accessor('position', {
  header: '職位',
  cell: (info) => <>{info.table.options.meta.getValueDropdown('POSITION', info.getValue())}</>,
});
const employeeName = columnHelper.accessor('employeeName', {
  header: '氏名',
  cell: (info) => <>{info.getValue()}</>,
});
const employeeNameKana = columnHelper.accessor('employeeNameKana', {
  header: '氏名（カタカナ）',
  cell: (info) => <>{info.getValue()}</>,
});
const sex = columnHelper.accessor('sex', {
  header: '性別',
  cell: (info) => <>{info.table.options.meta.getValueDropdown('GENDER', info.getValue())}</>,
});
const birthday = columnHelper.accessor('birthday', {
  header: '生年月日',
  cell: (info) => <>{formatDateJP(info.getValue())}</>,
});
const joiningCompany = columnHelper.accessor('joiningCompany', {
  header: '入社',
  cell: (info) => <>{formatDateJP(info.getValue(), 'month')}</>,
});
const formerJob = columnHelper.accessor('formerJob', {
  header: '前職',
  cell: (info) => <>{info.getValue()}</>,
});
const retirement = columnHelper.accessor('retirement', {
  header: '退職',
  cell: (info) => <>{info.table.options.meta.getValueDropdown('RETIREMENT', info.getValue())}</>,
});
const eduBackground = columnHelper.accessor('eduBackground', {
  header: '学歴',
  cell: (info) => <>{info.getValue()}</>,
});
const age = columnHelper.accessor('age', {
  header: '年齢',
  cell: (info) => <>{info.getValue() || 0}才</>,
});
const midCareerNewGraduate = columnHelper.accessor('midCareerNewGraduate', {
  header: '中途/新卒',
  cell: (info) => <>{info.table.options.meta.getValueDropdown('MID_CAREER_NEW_GRADUATE', info.getValue())}</>,
});
const coachMentor = columnHelper.accessor('coachMentor', {
  header: 'コーチ/メンター',
  cell: (info) => <>{info.getValue()}</>,
});
const hobby = columnHelper.accessor('hobby', {
  header: '趣味',
  cell: (info) => <>{info.getValue()}</>,
});
const goodFriends = columnHelper.accessor('goodFriends', {
  header: '仲がいい人',
  cell: (info) => <>{info.getValue()}</>,
});
const joiningPathOptional = columnHelper.accessor('joiningPathOptional', {
  header: '入社経路（選択）',
  cell: (info) => <>{info.table.options.meta.getValueDropdown('COMP_JOINED_ROUTE', info.getValue())}</>,
});
const retirementDate = columnHelper.accessor('retirementDate', {
  header: '退職年月',
  cell: (info) => <>{formatDateJP(info.getValue(), 'month')}</>,
});
const esResponsibility = columnHelper.accessor('esResponsibility', {
  header: 'ES責',
  cell: (info) => <>{info.getValue() ? '有' : '無'}</>,
});

const joiningPathDescription = columnHelper.accessor('joiningPathDescription', {
  header: '入社経路（記述）',
  cell: (info) => <>{info.getValue()}</>,
});

const joiningCompanyReason = columnHelper.accessor('joiningCompanyReason', {
  header: '入社経路（理由）',
  cell: (info) => <>{info.getValue()}</>,
});
const can = columnHelper.accessor('can', {
  header: 'Can',
  cell: (info) => <>{info.getValue()}</>,
});
const will = columnHelper.accessor('will', {
  header: 'Will',
  cell: (info) => <>{info.getValue()}</>,
});
const columnsBasicSub = { royaltiesDescription, royaltiesOptional, can, will };
const columnHistoryBasicInfo = {
  employeeId,
  employeeName,
  employeeNameKana,
  sex,
  birthday,
  joiningCompany,
  formerJob,
  retirement,
  eduBackground,
  position,
  age,
  midCareerNewGraduate,
  coachMentor,
  hobby,
  goodFriends,
  joiningPathOptional,
  retirementDate,
  esResponsibility,
  joiningPathDescription,
  joiningCompanyReason,
};
export { columnsBasicSub, columnHistoryBasicInfo };
