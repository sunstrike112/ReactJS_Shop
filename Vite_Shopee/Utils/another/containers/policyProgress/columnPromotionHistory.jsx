import { createColumnHelper } from '@tanstack/react-table';
import { transOutHook } from 'dhm/contexts/TranslateContext';
import { formatDateJP } from 'dhm/utils/helpers/format';
import { Badge } from '@chakra-ui/react';
import { convertToCurrentTime } from 'dhm/utils/helpers/convert';

const columnHelper = createColumnHelper();
const tPolicyProgress = (value) => transOutHook(value, 'policyProgress');
const trans = (value) => transOutHook(value, 'table');

const fiscalYear = columnHelper.accessor('fiscalYear', {
  header: tPolicyProgress('year'),
  cell: (info) => <>{info.getValue().slice(2, 4)}</>,
});

const tobeFyFiscal = columnHelper.accessor('tobeFyFiscal', {
  header: tPolicyProgress('tobe_fy'),
  cell: (info) => <>{info.getValue()}</>,
});

const tobeFyFiscalPlus1 = columnHelper.accessor('tobeFyFiscalPlus1', {
  header: tPolicyProgress('tobe_fy1'),
  cell: (info) => <>{info.getValue()}</>,
});
const tobeFyFiscalPlus2 = columnHelper.accessor('tobeFyFiscalPlus2', {
  header: tPolicyProgress('tobe_fy2'),
  cell: (info) => <>{info.getValue()}</>,
});
const tobeFyFiscalPlus3 = columnHelper.accessor('tobeFyFiscalPlus3', {
  header: tPolicyProgress('tobe_fy3'),
  cell: (info) => <>{info.getValue()}</>,
});
const asis = columnHelper.accessor('asis', {
  header: tPolicyProgress('asis'),
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

const columnPromotionHistory = {
  fiscalYear,
  tobeFyFiscal,
  tobeFyFiscalPlus1,
  tobeFyFiscalPlus2,
  tobeFyFiscalPlus3,
  asis,
  createdDatetime,
  createdUser,
  updatedDatetime,
  updatedUser,
  status,
};
export { columnPromotionHistory };
