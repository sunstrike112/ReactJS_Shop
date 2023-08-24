import { Flex, Img, Tooltip, useDisclosure } from '@chakra-ui/react';
import { DHMAssets } from 'dhm/assets/index';
import { InputDebounceForm } from 'dhm/components/Form/elements/DebounceInput';
import { WrapperSubForm } from 'dhm/components/Form/WrapperSubForm';
import DHMModal from 'dhm/components/Modal';
import { CommonTable } from 'dhm/containers/table/tableContainer.jsx';
import LanguageContext from 'dhm/contexts/TranslateContext';
import { ServicesOverviewInfo } from 'dhm/store/overviewInfo/services';
import { BORDERS, COLORS } from 'dhm/utils/constants/style';
import { useContext, useMemo } from 'react';
import { columnOverviewInfo } from './column';

const {
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
} = columnOverviewInfo;

export function TableHistoryOverviewInfo({ employeeId, employeeName, ...props }) {
  const { historyOverviewInfo, getHistoryOVerviewInfo } = ServicesOverviewInfo();
  const { data, pagination } = historyOverviewInfo;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { tOverviewInfo, tForm } = useContext(LanguageContext);
  const columns = useMemo(
    () => [
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
    ],
    [data],
  );

  const propsModal = {
    title: tOverviewInfo('overviewHistory'),
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
    action: getHistoryOVerviewInfo,
    payloadParams,
    modeTable: 'gradient',
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
      <Tooltip label={tOverviewInfo('overviewHistory')}>
        <Img src={DHMAssets.ICON_HISTORY} onClick={onOpen} {...props} />
      </Tooltip>
      <DHMModal {...propsModal} size='6xl' isShowClose>
        <CommonTable {...propsCommonTable} />
      </DHMModal>
    </>
  );
}
