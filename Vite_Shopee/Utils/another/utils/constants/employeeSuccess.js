const keyMapping = [
  {
    id: 1,
    hope: 'jobDesptDesired',
    current: 'jobDetailsCurrentStatus',
  },
  {
    id: 2,
    hope: 'humanRelationsHope',
    current: 'humanRelationsCurrentSituation',
  },
  {
    id: 3,
    hope: 'careerPreferred',
    current: 'careerCurrent',
  },
  {
    id: 4,
    hope: 'moneyHope',
    current: 'moneyCurrent',
  },
  {
    id: 5,
    hope: 'workStyleHope',
    current: 'workStyleCurrentSituation',
  },
];
const LIST_ROLES = {
  1: '仕事内容',
  2: '人間関係',
  3: 'キャリア',
  4: 'お金',
  5: '働き方',
};
const LIST_ROLES_POSITION = {
  1: '① ',
  2: '② ',
  3: '③ ',
  4: '④ ',
  5: '⑤ ',
};

const DEFAULT_SELECTED_VALUES = () => {
  const defaultValues = {};
  Object.keys(LIST_ROLES).forEach((role) => {
    defaultValues[role] = {
      0: '0',
      1: '0',
    };
  });
  return defaultValues;
};

export { keyMapping, LIST_ROLES, LIST_ROLES_POSITION, DEFAULT_SELECTED_VALUES };
