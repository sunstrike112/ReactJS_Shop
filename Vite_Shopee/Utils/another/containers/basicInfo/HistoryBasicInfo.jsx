import { Flex, Img, Tooltip, useDisclosure } from '@chakra-ui/react';
import { DHMAssets } from 'dhm/assets/index';
import { InputDebounceForm } from 'dhm/components/Form/elements/DebounceInput';
import { WrapperSubForm } from 'dhm/components/Form/WrapperSubForm';
import DHMModal from 'dhm/components/Modal';
import { columnKeys } from 'dhm/services/table/columnKeysBE';
import { historyBasicInfoDetail, histotyBasicInfoSub } from 'dhm/store/basicInfo/action';
import { useContext, useMemo } from 'react';
import { useSelector } from 'react-redux';
// import { columnFunc } from 'dhm/services/table/columnKeysFunc';
import LanguageContext from 'dhm/contexts/TranslateContext';
import { BORDERS, COLORS } from 'dhm/utils/constants/style';
import { CommonTable } from '../table/tableContainer';
import { columnHistoryBasicInfo, columnsBasicSub } from './column';

const { updatedUser, updatedDatetime, deleteFlgText, createdDatetime, historyCreatedUser } = columnKeys;
const {
  employeeId,
  employeeNameKana,
  sex,
  joiningCompany,
  formerJob,
  retirement,
  eduBackground,
  position,
  midCareerNewGraduate,
  coachMentor,
  hobby,
  goodFriends,
  joiningPathOptional,
  retirementDate,
  esResponsibility,
  birthday,
  joiningPathDescription,
  joiningCompanyReason,
} = columnHistoryBasicInfo;

export function HistoryBasicInfo({ handleOpen, ids, employeeName, modeView = 'basicInfo', ...props }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { tForm } = useContext(LanguageContext);
  const { historyBasicInfoDetail: dataHistory, histotyBasicInfoSub: dataHistorySub } = useSelector(
    (state) => state.basicInfo,
  );
  const dataTable = {
    basicInfo: {
      db: dataHistory,
      fetch: historyBasicInfoDetail,
      view: (
        <Tooltip label='基本Info履歴'>
          <Img src={DHMAssets.ICON_HISTORY} onClick={onOpen} {...props} />
        </Tooltip>
      ),
      columns: [
        employeeId,
        position,
        sex,
        columnHistoryBasicInfo.employeeName,
        employeeNameKana,
        formerJob,
        birthday,
        joiningCompany,
        midCareerNewGraduate,
        hobby,
        goodFriends,
        coachMentor,
        eduBackground,
        retirement,
        retirementDate,
        esResponsibility,
        joiningPathOptional,
        joiningPathDescription,
        joiningCompanyReason,
      ],
      title: '基本Info履歴',
    },
    basicSub: {
      db: dataHistorySub,
      fetch: histotyBasicInfoSub,
      view: (
        <Tooltip label='ロイヤリティ履歴'>
          <Img src={DHMAssets.ICON_USER} onClick={onOpen} {...props} />
        </Tooltip>
      ),
      columns: [
        columnsBasicSub.can,
        columnsBasicSub.will,
        columnsBasicSub.royaltiesOptional,
        columnsBasicSub.royaltiesDescription,
      ],
      title: 'ロイヤリティ履歴',
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
    employeeIds: [ids],
  };
  const columns = useMemo(
    () => [
      // columnFunc.keyIndexTable,
      ...dataTable[modeView].columns,
      createdDatetime({ haveCustomFilter: false }),
      historyCreatedUser,
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
