import { Flex, Img, Tooltip, useDisclosure } from '@chakra-ui/react';
import { DHMAssets } from 'dhm/assets/index';
import { WrapperSubForm } from 'dhm/components/Form/WrapperSubForm';
import { InputDebounceForm } from 'dhm/components/Form/elements/DebounceInput';
import DHMModal from 'dhm/components/Modal';
import { CommonTable } from 'dhm/containers/table/tableContainer.jsx';
import LanguageContext from 'dhm/contexts/TranslateContext';
import { ServicesInterviewLog } from 'dhm/store/interviewLog/services';
import { BORDERS, COLORS } from 'dhm/utils/constants/style';
import { useContext, useMemo } from 'react';
import { columnHistoryInterviewLog } from './columnHistoryInterviewLog';

const {
  date,
  esManager,
  nextDate,
  category,
  content,
  createdDatetime,
  createdUser,
  updatedDatetime,
  updatedUser,
  status,
} = columnHistoryInterviewLog;

export function TableHistoryInterviewLog({ employeeId, employeeName, ...props }) {
  const { historyInterviewLog, getHistoryInterviewLog } = ServicesInterviewLog();
  const { data, pagination } = historyInterviewLog;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { tInterviewLog, tForm } = useContext(LanguageContext);
  const columns = useMemo(
    () => [
      date,
      esManager,
      nextDate,
      category,
      content,
      createdDatetime,
      createdUser,
      updatedDatetime,
      updatedUser,
      status,
    ],
    [data],
  );

  const propsModal = {
    title: tInterviewLog('interviewLogHistory'),
    isOpen,
    typeHeader: 'gradient',
    onCancel: onClose,
  };

  const params = {
    isHistory: true,
    sortType: 'desc',
    sortColumn: 'updatedDatetime',
    employeeId,
  };

  const payloadParams = {
    params,
  };

  const propsCommonTable = {
    columns,
    data,
    action: getHistoryInterviewLog,
    modeTable: 'gradient',
    payloadParams,
    rowIdKey: 'id',
    pagination,
    componentUnderSearch: () => (
      <>
        <WrapperSubForm title={tForm('employee')}>
          <Flex gap='20px'>
            <InputDebounceForm
              label='ID'
              width='220px'
              placeholder='ID'
              readOnly
              value={employeeId}
              border={BORDERS.border_1(COLORS.gray_700)}
              pointerEvents='none'
              bg={COLORS.gray_400}
            />
            <InputDebounceForm
              label={tForm('name')}
              width='220px'
              placeholder={tForm('name')}
              readOnly
              value={employeeName}
              border={BORDERS.border_1(COLORS.gray_700)}
              pointerEvents='none'
              bg={COLORS.gray_400}
            />
          </Flex>
        </WrapperSubForm>
      </>
    ),
  };

  return (
    <>
      <Tooltip label={tInterviewLog('interviewLogHistory')}>
        <Img src={DHMAssets.ICON_HISTORY} onClick={onOpen} {...props} />
      </Tooltip>
      <DHMModal {...propsModal} size='6xl' isShowClose>
        <CommonTable {...propsCommonTable} />
      </DHMModal>
    </>
  );
}
