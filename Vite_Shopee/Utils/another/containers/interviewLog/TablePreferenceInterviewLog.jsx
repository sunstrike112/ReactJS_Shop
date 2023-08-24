import { Box, Flex } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import { BoxMiniFeat } from 'dhm/components/Box/BoxMiniFeat';
import { InputDebounceForm } from 'dhm/components/Form/elements/DebounceInput';
import DHMModal from 'dhm/components/Modal';
import { DrawerContainer } from 'dhm/containers/drawer';
import { CommonTable } from 'dhm/containers/table/tableContainer.jsx';
import LanguageContext from 'dhm/contexts/TranslateContext';
import { ServicesInterviewLog } from 'dhm/store/interviewLog/services';
import { BORDERS, COLORS } from 'dhm/utils/constants/style';
import { useContext, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { columnInterviewLog } from './columnInterviewLog';
import { TableHistoryInterviewLog } from './TableHistoryInterviewLog';

const { date, esManager, nextDate, category, content } = columnInterviewLog;

export function TablePreferenceInterviewLog({ isOpen, onClose }) {
  const { interviewLog, getInterviewLog } = ServicesInterviewLog();
  const { data, pagination } = interviewLog;
  const { employeeId } = useParams();
  const columnHelper = createColumnHelper();
  const { tInterviewLog, tTable } = useContext(LanguageContext);
  const columns = useMemo(
    () => [
      date,
      esManager,
      nextDate,
      category,
      content,

      columnHelper.accessor('action', {
        header: tTable('action'),
        noTooltip: true,
        maxSize: 140,
        cell: (info) => {
          const dataRow = info.row.original;
          const originData = {
            date: dataRow.date,
            esManagerCode: dataRow.esManagerCode,
            category: dataRow.category,
            content: dataRow.content,
            nextDate: dataRow.nextDate,
            serialNumber: dataRow.serialNumber,
            version: dataRow.version,
          };
          return (
            <BoxMiniFeat gap='20px' ml='20px'>
              <DrawerContainer modeForm='interviewLog' modePage='interviewLog' type='edit' originData={originData} />
            </BoxMiniFeat>
          );
        },
      }),
    ],
    [data],
  );

  const propsModal = {
    title: tInterviewLog('interviewLogRef'),
    isOpen,
    typeHeader: 'gradient',
    onCancel: onClose,
  };

  const params = {
    isHistory: false,
    sortType: 'desc',
    sortColumn: 'date',
    employeeId,
  };

  const payloadParams = {
    params,
  };

  const propsCommonTable = {
    columns,
    data,
    action: getInterviewLog,
    payloadParams,
    modeTable: 'gradient',
    rowIdKey: 'id',
    pagination,
    componentUnderSearch: () => (
      <>
        <Flex gap='20px'>
          <InputDebounceForm
            label={tTable('employeeId')}
            width='220px'
            placeholder='ID'
            readOnly
            value={employeeId}
            border={BORDERS.border_1(COLORS.gray_700)}
            pointerEvents='none'
            bg={COLORS.gray_400}
          />
        </Flex>
        <Flex alignItems='center' my={2}>
          <Box>{tInterviewLog('interviewLogList')}</Box>
          <BoxMiniFeat bg={COLORS.white}>
            <TableHistoryInterviewLog cursor='pointer' employeeId={employeeId} />
          </BoxMiniFeat>
        </Flex>
      </>
    ),
  };

  return (
    <>
      <DHMModal isOpen {...propsModal} size='6xl' isShowClose>
        <CommonTable {...propsCommonTable} />
      </DHMModal>
    </>
  );
}
