import { createColumnHelper } from '@tanstack/react-table';
import { transOutHook } from 'dhm/contexts/TranslateContext';
import { formatDateJP } from 'dhm/utils/helpers/format';
import { Badge } from '@chakra-ui/react';
import { convertToCurrentTime } from 'dhm/utils/helpers/convert';

const columnHelper = createColumnHelper();
const tPolicyProgress = (value) => transOutHook(value, 'policyProgress');
const trans = (value) => transOutHook(value, 'table');

const tRiskSelected = columnHelper.accessor('riskSelection', {
  header: tPolicyProgress('tRiskSelected'),
  cell: (info) => <>{info.getValue()}</>,
});
const tRiskDescription = columnHelper.accessor('riskDescription', {
  header: tPolicyProgress('tRiskDescription'),
  cell: (info) => <>{info.getValue()}</>,
});
const whatTodoAssign = columnHelper.accessor('assignDescription', {
  header: tPolicyProgress('whatTodoAssign'),
  cell: (info) => <>{info.getValue()}</>,
  minSize: 250,
});
const createdDatetime = columnHelper.accessor('createdDatetime', {
  header: tPolicyProgress('registrationDate'),
  cell: (info) => formatDateJP(convertToCurrentTime(info.getValue())),
});
const createdUser = columnHelper.accessor('createdUser', {
  header: tPolicyProgress('register'),
  cell: (info) => <>{info.getValue()}</>,
});
const updatedDatetime = columnHelper.accessor('updatedDatetime', {
  header: tPolicyProgress('updateDate'),
  cell: (info) => <>{convertToCurrentTime(info.getValue())}</>,
});
const updatedUser = columnHelper.accessor('updatedUser', {
  header: tPolicyProgress('updater'),
  cell: (info) => <>{info.getValue()}</>,
});
const status = columnHelper.accessor('deleteFlg', {
  header: trans('status'),
  cell: (info) => (
    <Badge ml='1' fontSize='0.8em' colorScheme={info.getValue() === 1 ? 'red' : 'green'} padding='0 10px'>
      {trans(info.getValue() === 0 ? 'in_active' : 'active')}
    </Badge>
  ),
  typeFilter: 'text',
  haveCustomFilter: false,
});

const columnHistoryTRisk = {
  tRiskSelected,
  tRiskDescription,
  whatTodoAssign,
  createdDatetime,
  createdUser,
  updatedDatetime,
  updatedUser,
  status,
};
export { columnHistoryTRisk };
