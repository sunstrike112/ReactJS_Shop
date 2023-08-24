import { Box, Flex, Text } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import { transOutHook } from 'dhm/contexts/TranslateContext';
import { COLORS, BORDERS } from 'dhm/utils/constants/style';
import { formatDateJP } from 'dhm/utils/helpers/format';
import { addCommasCurrency } from 'dhm/utils/helpers/method';

const columnHelper = createColumnHelper();
const tProjectInfo = (value) => transOutHook(value, 'projectInfo');

const projectId = columnHelper.accessor('projectId', {
  header: tProjectInfo('projectID'),
  cell: (info) => <>{info.getValue()}</>,
});
const projectName = columnHelper.accessor('projectName', {
  header: tProjectInfo('projectName'),
  cell: (info) => <>{info.getValue()}</>,
});
const client = columnHelper.accessor('client', {
  header: tProjectInfo('client'),
  cell: (info) => <>{info.getValue()}</>,
});
const counter = columnHelper.accessor('counter', {
  header: tProjectInfo('counter'),
  cell: (info) => <>{info.getValue()}</>,
});
const start = columnHelper.accessor('start', {
  header: tProjectInfo('start'),
  cell: (info) => <>{formatDateJP(info.getValue(), 'month')}</>,
});
const salesInCharge = columnHelper.accessor('salesInCharge', {
  header: tProjectInfo('saleInCharge'),
  cell: (info) => <>{info.getValue()}</>,
});
const unitPrice = columnHelper.accessor('unitPrice', {
  header: tProjectInfo('unitPrice'),
  cell: (info) => (
    <Flex justify='flex-end' alignItems='center'>
      <Box mr='6px'>{addCommasCurrency(info.getValue().toString().replace(/,/g, ''))}</Box>
      <Flex
        justifyContent='center'
        alignItems='center'
        bg={COLORS.gray_400}
        color={COLORS.gray_800}
        borderLeft={BORDERS.border_1(COLORS.gray_700)}
        width='54px'
        height='54px'
      >
        万円
      </Flex>
    </Flex>
  ),
});
const sellTeam = columnHelper.accessor('sellTeam', {
  header: tProjectInfo('teamSale'),
  cell: (info) => (
    <Flex justify='flex-end' alignItems='center'>
      <Box mr='6px'>{addCommasCurrency(info.getValue().toString().replace(/,/g, ''))}</Box>
      <Flex
        justifyContent='center'
        alignItems='center'
        bg={COLORS.gray_400}
        color={COLORS.gray_800}
        borderLeft={BORDERS.border_1(COLORS.gray_700)}
        width='54px'
        height='54px'
      >
        万円
      </Flex>
    </Flex>
  ),
});

const evaluation = columnHelper.accessor('evaluation', {
  header: tProjectInfo('evaluation'),
  cell: (info) => (
    <Text mr={2} textAlign='right'>
      {info.getValue().toFixed(1)}
    </Text>
  ),
});
const rater = columnHelper.accessor('rater', {
  header: tProjectInfo('evaluator'),
  cell: (info) => <>{info.getValue()}</>,
});
const qualitativeEvaluationHrBrain = columnHelper.accessor('qualitativeEvaluationHrBrain', {
  header: tProjectInfo('qualitativeEvaluation'),
  cell: (info) => <>{info.getValue()}</>,
  minSize: 350,
});
const qualitativeEvaluationOthers = columnHelper.accessor('qualitativeEvaluationOthers', {
  header: tProjectInfo('qualitativeEvaluatioOther'),
  cell: (info) => <>{info.getValue()}</>,
  minSize: 350,
});
const businessContent = columnHelper.accessor('businessContent', {
  header: tProjectInfo('businessContent'),
  cell: (info) => <>{info.getValue()}</>,
  minSize: 250,
});

const columnProjectInfo = {
  projectId,
  projectName,
  client,
  counter,
  start,
  salesInCharge,
  unitPrice,
  sellTeam,
  evaluation,
  rater,
  qualitativeEvaluationHrBrain,
  qualitativeEvaluationOthers,
  businessContent,
};
export { columnProjectInfo };
