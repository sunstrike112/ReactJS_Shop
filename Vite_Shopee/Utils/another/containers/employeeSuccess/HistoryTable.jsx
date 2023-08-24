import { Flex, Img, Tooltip, useDisclosure } from '@chakra-ui/react';
import { DHMAssets } from 'dhm/assets/index';
import { InputDebounceForm } from 'dhm/components/Form/elements/DebounceInput';
import { WrapperSubForm } from 'dhm/components/Form/WrapperSubForm';
import DHMModal from 'dhm/components/Modal';
import { columnKeys } from 'dhm/services/table/columnKeysBE';
import { useContext, useMemo } from 'react';
// import { columnFunc } from 'dhm/services/table/columnKeysFunc';
import LanguageContext from 'dhm/contexts/TranslateContext';
import { ServiceEmployeeSuccess } from 'dhm/store/employeeSuccess/services';
import { BORDERS, COLORS } from 'dhm/utils/constants/style';
import { CommonTable } from '../table/tableContainer';
import { columnKof, columnMotivation, columnRadar } from './column';

const { updatedUser, updatedDatetime, deleteFlgText, historyCreatedDatetime, historyCreatedUser } = columnKeys;

export function HistoryEmployeeSuccess({ handleOpen, ids, employeeName, modeView = 'radar', ...props }) {
  const { tForm } = useContext(LanguageContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { action, state } = ServiceEmployeeSuccess();
  const dataTable = {
    radar: {
      db: state.stateHistoryRada,
      fetch: action.historyRada,
      view: (
        <Tooltip label='レーダーチャートデータ 履歴'>
          <Img src={DHMAssets.ICON_HISTORY} onClick={onOpen} {...props} />
        </Tooltip>
      ),
      columns: [...columnRadar],
      title: 'レーダーチャートデータ 履歴',
    },
    kof: {
      db: state.stateHistoryKof,
      fetch: action.historyKof,
      view: (
        <Tooltip label='KOF/ES ステータス 履歴'>
          <Img src={DHMAssets.ICON_HISTORY} onClick={onOpen} {...props} />
        </Tooltip>
      ),
      columns: [...columnKof],
      title: 'KOF/ES ステータス 履歴',
    },
    motivation: {
      db: state.stateHistoryMotivation,
      fetch: action.historyMotivation,
      view: (
        <Tooltip label='モチベーションフラグ履歴'>
          <Img src={DHMAssets.ICON_HISTORY} onClick={onOpen} {...props} />
        </Tooltip>
      ),
      columns: [...columnMotivation],
      title: 'モチベーションフラグ履歴',
    },
  };
  const chooseData = dataTable[modeView].db;
  const { data, pagination } = chooseData;
  const propsModal = {
    title: dataTable[modeView].title,
    isOpen,
    typeHeader: 'gradient',
    onCancel: onClose,
  };

  const params = {
    isHistory: true,
    sortType: 'desc',
    // employeeIds: [ids],
    keyWord: ids,
  };
  const columns = useMemo(
    () => [
      // columnFunc.keyIndexTable,
      ...dataTable[modeView].columns,
      historyCreatedUser,
      historyCreatedDatetime,
      updatedUser({ haveCustomFilter: false }),
      updatedDatetime({ haveCustomFilter: false }),
      deleteFlgText,
    ],
    [data],
  );

  const payloadParams = {
    params,
  };

  const propsCommonTable = {
    columns,
    data,
    action: dataTable[modeView].fetch,
    payloadParams,
    modeTable: 'gradient',
    rowIdKey: 'id',
    componentUnderSearch: () => (
      <>
        <WrapperSubForm title={tForm('employee')}>
          <Flex gap='20px'>
            <InputDebounceForm
              label='ID'
              width='220px'
              placeholder='ID'
              readOnly
              value={ids}
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
    pagination,
  };
  return (
    <>
      {dataTable[modeView].view}
      <DHMModal {...propsModal} size='6xl' isShowClose>
        <CommonTable {...propsCommonTable} />
      </DHMModal>
    </>
  );
}
