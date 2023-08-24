import { Img, useDisclosure } from '@chakra-ui/react';
import DHMModal from 'dhm/components/Modal';
import { useMemo } from 'react';
// import { columnFunc } from 'dhm/services/table/columnKeysFunc';
// import { LoadingCommon } from 'dhm/components/Loading';
import { DHMAssets } from 'dhm/assets/index';
import { CommonTable } from 'dhm/containers/table/tableContainer';
import { ServiceUser } from 'dhm/store/manageUser/user/services';
import { columnsUserHistory } from './column';

export function HistoryTable({ handleOpen, ids, modeView = 'userAll', ...props }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { state, action } = ServiceUser();
  const dataTable = {
    userAll: {
      db: state.userHistory,
      fetch: action.historyUser,
      view: <Img cursor='pointer' src={DHMAssets.ICON_HISTORY} onClick={onOpen} {...props} />,
      columns: [...columnsUserHistory],
      title: 'ユーザーリスト参照',
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
