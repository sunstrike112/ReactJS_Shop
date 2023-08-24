import { createColumnHelper } from '@tanstack/react-table';
import { transOutHook } from 'dhm/contexts/TranslateContext';
import { formatDateJP } from 'dhm/utils/helpers/format';
import { Badge } from '@chakra-ui/react';
import { convertToCurrentTime } from 'dhm/utils/helpers/convert';

const columnHelper = createColumnHelper();
const tPolicyProgress = (value) => transOutHook(value, 'policyProgress');
const trans = (value) => transOutHook(value, 'table');

const policyProgress = columnHelper.accessor('policyProgress', {
  header: tPolicyProgress('description'),
  cell: (info) => <>{info.getValue()}</>,
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

const columnHistoryPolicyProgress = {
  policyProgress,
  createdDatetime,
  createdUser,
  updatedDatetime,
  updatedUser,
  status,
};
export { columnHistoryPolicyProgress };
