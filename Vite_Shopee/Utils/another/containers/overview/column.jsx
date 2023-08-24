import { createColumnHelper } from '@tanstack/react-table';
import { formatDateJP } from 'dhm/utils/helpers/format';
import { transOutHook } from 'dhm/contexts/TranslateContext';
import { Img } from '@chakra-ui/react';
import { STATUS_EMPLOYEE, STATUS_SVG, STATUS } from 'dhm/utils/constants/type';
import { DHMAssets } from 'dhm/assets/index';
import { BORDERS, COLORS } from 'dhm/utils/constants/style';
import { convertToCurrentTime } from 'dhm/utils/helpers/convert';

const columnHelper = createColumnHelper();
const tOverviewInfo = (value) => transOutHook(value, 'overviewInfo');
const tTable = (value) => transOutHook(value, 'table');

const status = columnHelper.accessor('status', {
  header: tOverviewInfo('status'),
  cell: (info) => (
    <>
      {Object.values(STATUS).includes(info.getValue()) && (
        <Img
          bg={STATUS_EMPLOYEE[info.getValue()]}
          src={DHMAssets[STATUS_SVG[info.getValue()]]}
          width='40px'
          height='40px'
          borderRadius='50%'
          borderBottom={BORDERS.border_3(COLORS.black_primary)}
          borderRight={BORDERS.border_3(COLORS.black_primary)}
          borderTop={BORDERS.border_1(COLORS.black_primary)}
          borderLeft={BORDERS.border_1(COLORS.black_primary)}
          p='7px'
        />
      )}
    </>
  ),
  noTooltip: true,
});

const esManager = columnHelper.accessor('esManager', {
  header: tOverviewInfo('esManager'),
  cell: (info) => <>{info.getValue()}</>,
});
const relationship = columnHelper.accessor('relationship', {
  header: tOverviewInfo('relationship'),
  cell: (info) => <>{info.getValue()}</>,
});
const comprehension = columnHelper.accessor('comprehension', {
  header: tOverviewInfo('comprehension'),
  cell: (info) => <>{info.getValue()}</>,
});
const predecessor = columnHelper.accessor('predecessor', {
  header: tOverviewInfo('predecessor'),
  cell: (info) => <>{info.getValue()}</>,
});
const actionRequired = columnHelper.accessor('actionRequired', {
  header: tOverviewInfo('actionRequired'),
  cell: (info) => <>{info.getValue() ? tTable('yesStatus') : tTable('noStatus')}</>,
});
const whenEnd = columnHelper.accessor('whenEnd', {
  header: tOverviewInfo('whenEnd'),
  cell: (info) => formatDateJP(info.getValue()),
});
const whatToDo = columnHelper.accessor('whatTodo', {
  header: tOverviewInfo('whatToDo'),
  cell: (info) => <>{info.getValue()}</>,
});
const overtimeFlag = columnHelper.accessor('overtimeFlag', {
  header: tOverviewInfo('overtimeFlag'),
  cell: (info) => <>{info.getValue() ? tTable('yesStatus') : tTable('noStatus')}</>,
});
const leaveOff = columnHelper.accessor('leaveOff', {
  header: tOverviewInfo('leaveOff'),
  cell: (info) => <>{info.getValue() ? tTable('yesStatus') : tTable('noStatus')}</>,
});
const childcareMaternityLeave = columnHelper.accessor('childcareMaternityLeave', {
  header: tOverviewInfo('childcareMaternityLeave'),
  cell: (info) => <>{info.getValue() ? tTable('yesStatus') : tTable('noStatus')}</>,
});
const notInOperation = columnHelper.accessor('notInOperation', {
  header: tOverviewInfo('notInOperation'),
  cell: (info) => <>{info.getValue() ? tTable('yesStatus') : tTable('noStatus')}</>,
});
const createdDatetime = columnHelper.accessor('createdDatetime', {
  header: tOverviewInfo('createdDatetime'),
  cell: (info) => <>{convertToCurrentTime(info.getValue())}</>,
});
const author = columnHelper.accessor('createdUser', {
  header: tOverviewInfo('author'),
  cell: (info) => <>{info.getValue()}</>,
});
const changer = columnHelper.accessor('updatedUser', {
  header: tOverviewInfo('changer'),
  cell: (info) => <>{info.getValue()}</>,
});
const updatedDatetime = columnHelper.accessor('updatedDatetime', {
  header: tOverviewInfo('updatedDatetime'),
  cell: (info) => <>{convertToCurrentTime(info.getValue())}</>,
});
const columnOverviewInfo = {
  status,
  esManager,
  relationship,
  comprehension,
  predecessor,
  actionRequired,
  whenEnd,
  whatToDo,
  overtimeFlag,
  leaveOff,
  childcareMaternityLeave,
  notInOperation,
  createdDatetime,
  author,
  changer,
  updatedDatetime,
};
export { columnOverviewInfo };
