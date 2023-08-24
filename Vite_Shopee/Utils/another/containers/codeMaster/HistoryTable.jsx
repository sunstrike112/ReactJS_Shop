import { Grid, GridItem, Input, useDisclosure } from '@chakra-ui/react';
import { DHMButton } from 'dhm/components/Button/index.jsx';
import { WrapperSubForm } from 'dhm/components/Form/WrapperSubForm.jsx';
import DHMModal from 'dhm/components/Modal';
import { CommonTable } from 'dhm/containers/table/tableContainer.jsx';
import LanguageContext from 'dhm/contexts/TranslateContext.jsx';
import { columnKeys } from 'dhm/services/table/columnKeysBE.jsx';
import { historyAllDisplay } from 'dhm/store/codeMaster/action.js';
import { BORDERS, COLORS, WIDTH } from 'dhm/utils/constants/style.js';
import { useContext, useMemo } from 'react';
import { useSelector } from 'react-redux';

export function HistoryTable({ codeListIds }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { tTabs, tForm } = useContext(LanguageContext);
  const { codeMasterHistory } = useSelector((state) => state.codeMaster);
  const { pagination, data } = codeMasterHistory;
  const handleClose = () => {
    onClose();
  };
  const handleOpen = () => {
    onOpen();
  };
  const propsModal = {
    title: 'コードリスト履歴',
    isOpen,
    onCancel: handleClose,
  };
  const {
    codeIdHistory,
    codeNameHistory,
    codeNameEnHistory,
    createdDatetimeHistory,
    createdUserHistory,
    updatedDatetimeHistory,
    updatedUserHistory,
    statusHistory,
    sortOrderHistory,
  } = columnKeys;
  const columns = useMemo(
    () => [
      codeIdHistory,
      codeNameHistory,
      codeNameEnHistory,
      createdDatetimeHistory,
      createdUserHistory,
      updatedDatetimeHistory,
      updatedUserHistory,
      sortOrderHistory,
      statusHistory,
    ],
    [data],
  );
  const params = {
    codeListIds: [codeListIds.grID],
    isHistory: true,
    sortType: 'asc,asc,asc',
    sortColumn: 'codeValue,createdDatetime,updatedDatetime',
  };
  const payloadParams = {
    params,
  };
  const propsCommonTable = {
    payloadParams,
    columns,
    data,
    action: historyAllDisplay,
    rowIdKey: 'id',
    pagination,
    defaultSort: {
      sortType: params.sortType,
      sortColumn: params.sortColumn,
    },
  };
  return (
    <>
      <DHMButton onClick={handleOpen} buttonType='master' text={tTabs('history')} mr='2' />
      <DHMModal {...propsModal} size={WIDTH.modal_width_6} isShowClose>
        <WrapperSubForm title={tForm('gr_code_list')} width={WIDTH.wrapper_width_60}>
          <Grid templateColumns='repeat(2, 1fr)' gap={4}>
            <GridItem w='50%'>
              {tForm('codeListId')}
              <Input
                border={BORDERS.border_1(COLORS.gray_700)}
                pointerEvents='none'
                bg={COLORS.gray_400}
                value={codeListIds.grID}
              />
            </GridItem>
            <GridItem w='50%'>
              Gr名称
              <Input
                background={COLORS.white}
                border={BORDERS.border_1(COLORS.gray_700)}
                pointerEvents='none'
                bg={COLORS.gray_400}
                value={codeListIds.grName}
              />
            </GridItem>
          </Grid>
        </WrapperSubForm>
        <CommonTable isBorder size='md' {...propsCommonTable} />
      </DHMModal>
    </>
  );
}
