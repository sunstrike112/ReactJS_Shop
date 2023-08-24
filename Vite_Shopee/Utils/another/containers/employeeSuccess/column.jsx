import { createColumnHelper } from '@tanstack/react-table';

const columnHelper = createColumnHelper();

const jobDesptDesired = columnHelper.accessor('jobDesptDesired', {
  header: '仕事内容（希望）',
  cell: (info) => <>{info.getValue()}</>,
});
const jobDetailsCurrentStatus = columnHelper.accessor('jobDetailsCurrentStatus', {
  header: '仕事内容（現状）',
  cell: (info) => <>{info.getValue()}</>,
});
const humanRelationsHope = columnHelper.accessor('humanRelationsHope', {
  header: '人間関係（希望）',
  cell: (info) => <>{info.getValue()}</>,
});
const humanRelationsCurrentSituation = columnHelper.accessor('humanRelationsCurrentSituation', {
  header: '人間関係（現状）',
  cell: (info) => <>{info.getValue()}</>,
});
const careerPreferred = columnHelper.accessor('careerPreferred', {
  header: 'キャリア（希望）',
  cell: (info) => <>{info.getValue()}</>,
});
const careerCurrent = columnHelper.accessor('careerCurrent', {
  header: 'キャリア（現状）',
  cell: (info) => <>{info.getValue()}</>,
});
const moneyHope = columnHelper.accessor('moneyHope', {
  header: 'お金（希望）',
  cell: (info) => <>{info.getValue()}</>,
});
const moneyCurrent = columnHelper.accessor('moneyCurrent', {
  header: 'お金（現状）',
  cell: (info) => <>{info.getValue()}</>,
});
const workStyleHope = columnHelper.accessor('workStyleHope', {
  header: '働き方（希望）',
  cell: (info) => <>{info.getValue()}</>,
});
const workStyleCurrentSituation = columnHelper.accessor('workStyleCurrentSituation', {
  header: 'はた方（現状）',
  cell: (info) => <>{info.getValue()}</>,
});
const kof = columnHelper.accessor('kof', {
  header: 'KOF',
  cell: (info) => <>{info.getValue()}</>,
});
const othersKof = columnHelper.accessor('othersKof', {
  header: 'その他',
  cell: (info) => <>{info.getValue()}</>,
});
const esStatus = columnHelper.accessor('esStatus', {
  header: 'ES ステータス',
  cell: (info) => <>{info.getValue()}</>,
});
const jobDescription = columnHelper.accessor('jobDescription', {
  header: '仕事内容',
  cell: (info) => <>{info.getValue()}</>,
});
const relationships = columnHelper.accessor('relationships', {
  header: '人間関係',
  cell: (info) => <>{info.getValue()}</>,
});
const career = columnHelper.accessor('career', {
  header: 'キャリア',
  cell: (info) => <>{info.getValue()}</>,
});
const money = columnHelper.accessor('money', {
  header: 'お金',
  cell: (info) => <>{info.getValue()}</>,
});
const workMethod = columnHelper.accessor('workMethod', {
  header: '働き方',
  cell: (info) => <>{info.getValue()}</>,
});
const othersSuccess = columnHelper.accessor('othersSuccess', {
  header: 'その他Success',
  cell: (info) => <>{info.getValue()}</>,
});
const othersSuccessDescription = columnHelper.accessor('othersSuccessDescription', {
  header: 'その他Success記述',
  cell: (info) => <>{info.getValue()}</>,
});
const columnRadar = [
  jobDesptDesired,
  jobDetailsCurrentStatus,
  humanRelationsHope,
  humanRelationsCurrentSituation,
  careerPreferred,
  careerCurrent,
  moneyHope,
  moneyCurrent,
  workStyleHope,
  workStyleCurrentSituation,
];
const columnKof = [kof, othersKof, esStatus];
const columnMotivation = [
  jobDescription,
  relationships,
  career,
  money,
  workMethod,
  othersSuccess,
  othersSuccessDescription,
];
export { columnRadar, columnKof, columnMotivation };
