import { Img, Tooltip, useDisclosure } from '@chakra-ui/react';
import { DHMAssets } from 'dhm/assets/index';
import DHMModal from 'dhm/components/Modal';
import { CommonTable } from 'dhm/containers/table/tableContainer.jsx';
import LanguageContext from 'dhm/contexts/TranslateContext';
import { ServiceOvertime } from 'dhm/store/overtime/services';
import { useContext, useMemo } from 'react';
import { columnHistoryOvertimeSetting } from './columnHistoryOvertimeSetting';

const { fiscalYear, monthlyOtLimit, createdDatetime, createdUser, updatedDatetime, updatedUser } =
  columnHistoryOvertimeSetting;

export function TableHistoryOvertimeSetting({ employeeId, employeeName, ...props }) {
  const { historyOvertimeSetting, getHistoryOvertimeSetting } = ServiceOvertime();
  const { data, pagination } = historyOvertimeSetting;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { tCsv } = useContext(LanguageContext);
  const columns = useMemo(
    () => [fiscalYear, monthlyOtLimit, createdDatetime, createdUser, updatedDatetime, updatedUser],
    [data],
  );

  const propsModal = {
    title: tCsv('overtime_setting_history'),
    isOpen,
    typeHeader: 'master',
    onCancel: onClose,
  };

  const params = {
    isHistory: true,
    sortType: 'desc',
    sortColumn: 'updatedDatetime',
  };

  const payloadParams = {
    params,
  };

  const propsCommonTable = {
    columns,
    data,
    action: getHistoryOvertimeSetting,
    modeTable: 'normal',
    payloadParams,
    rowIdKey: 'id',
    pagination,
  };

  return (
    <>
      <Tooltip label={tCsv('overtime_setting_history')}>
        <Img src={DHMAssets.ICON_HISTORY} onClick={onOpen} {...props} />
      </Tooltip>
      <DHMModal {...propsModal} size='6xl' isShowClose>
        <CommonTable {...propsCommonTable} />
      </DHMModal>
    </>
  );
}
