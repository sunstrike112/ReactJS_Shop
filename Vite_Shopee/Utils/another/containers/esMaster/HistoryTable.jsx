import { ViewIcon } from '@chakra-ui/icons';
import { IconButton, useDisclosure } from '@chakra-ui/react';
import DHMModal from 'dhm/components/Modal';
import { columnKeys } from 'dhm/services/table/columnKeysBE';
import { useContext, useMemo } from 'react';
// import { columnFunc } from 'dhm/services/table/columnKeysFunc';
import { DHMButton } from 'dhm/components/Button';
// import { LoadingCommon } from 'dhm/components/Loading';
import LanguageContext from 'dhm/contexts/TranslateContext';
import { ServiceEsMaster } from 'dhm/store/esMaster/services';
import { CommonTable } from '../table/tableContainer';
import { columnsEsMasterHistory } from './column';

const { updatedUser, updatedDatetime, deleteFlg, createdDatetime, createdUserHistorySort } = columnKeys;

export function HistoryTable({ handleOpen, ids, modeView = 'esMaster', ...props }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { tTable } = useContext(LanguageContext);
  const { state, action } = ServiceEsMaster();
  const dataTable = {
    esMaster: {
      db: state.esMasterHistory,
      fetch: action.historyEsMaster,
      view: <IconButton icon={<ViewIcon />} size='sm' mr='10px' onClick={onOpen} {...props} />,
      columns: [...columnsEsMasterHistory],
      title: 'ES担当マスタ履歴',
    },
    esMasterAll: {
      db: state.esMasterHistory,
      fetch: action.historyEsMaster,
      view: <DHMButton buttonType='create' text={tTable('history')} onClick={onOpen} {...props} />,
      columns: [...columnsEsMasterHistory],
      title: 'ES担当マスタ履歴',
    },
  };
  const chooseData = dataTable[modeView].db;
  const { data, pagination } = chooseData;
  const propsModal = {
    title: dataTable[modeView].title,
    isOpen,
    onCancel: onClose,
  };

  const params = {
    isHistory: true,
    deleteFlg: 'null',
    sortType: 'desc',
    sortColumn: 'updatedDatetime',
    ...(ids
      ? {
          employeeId: [ids],
        }
      : {}),
  };
  const columns = useMemo(
    () => [
      // columnFunc.keyIndexTable,
      ...dataTable[modeView].columns,
      createdDatetime({ haveCustomFilter: false }),
      createdUserHistorySort,
      updatedDatetime({ haveCustomFilter: false }),
      updatedUser({ haveCustomFilter: false }),
      deleteFlg,
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
    rowIdKey: 'id',
    pagination,
  };
  return (
    <>
      {dataTable[modeView].view}
      <DHMModal {...propsModal} size='6xl' typeHeader='master' isShowClose>
        <CommonTable {...propsCommonTable} />
      </DHMModal>
    </>
  );
}
