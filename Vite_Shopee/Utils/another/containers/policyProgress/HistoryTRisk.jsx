import { Flex, Img, Tooltip, useDisclosure } from '@chakra-ui/react';
import { DHMAssets } from 'dhm/assets/index';
import { WrapperSubForm } from 'dhm/components/Form/WrapperSubForm';
import { InputDebounceForm } from 'dhm/components/Form/elements/DebounceInput';
import DHMModal from 'dhm/components/Modal';
import { CommonTable } from 'dhm/containers/table/tableContainer.jsx';
import LanguageContext from 'dhm/contexts/TranslateContext';
import { ServicePolicyProgress } from 'dhm/store/policyProgress/services';
import { BORDERS, COLORS } from 'dhm/utils/constants/style';
import { useContext, useMemo } from 'react';
import { columnHistoryTRisk } from './columnTTriskHistory';

const {
  tRiskSelected,
  tRiskDescription,
  whatTodoAssign,
  createdDatetime,
  createdUser,
  updatedDatetime,
  updatedUser,
  status,
} = columnHistoryTRisk;

export function TableHistoryTRisk({ employeeId, employeeName, ...props }) {
  const { historyTRiskGenerated, getHistoryTRisk } = ServicePolicyProgress();
  const { data, pagination } = historyTRiskGenerated;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { tPolicyProgress, tForm } = useContext(LanguageContext);
  const columns = useMemo(
    () => [
      tRiskSelected,
      tRiskDescription,
      whatTodoAssign,
      createdDatetime,
      createdUser,
      updatedDatetime,
      updatedUser,
      status,
    ],
    [data],
  );

  const propsModal = {
    title: tPolicyProgress('tRiskHistory'),
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
    action: getHistoryTRisk,
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
      <Tooltip label={tPolicyProgress('tRiskHistory')}>
        <Img src={DHMAssets.ICON_HISTORY} onClick={onOpen} {...props} />
      </Tooltip>
      <DHMModal {...propsModal} size='6xl' isShowClose>
        <CommonTable {...propsCommonTable} />
      </DHMModal>
    </>
  );
}
