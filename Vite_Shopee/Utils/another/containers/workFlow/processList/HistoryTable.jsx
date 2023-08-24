import { Img, Tooltip, useDisclosure } from '@chakra-ui/react';
import { DHMAssets } from 'dhm/assets/index';
import DHMModal from 'dhm/components/Modal';
import { CommonTable } from 'dhm/containers/table/tableContainer.jsx';
import LanguageContext from 'dhm/contexts/TranslateContext';
import { ServiceWorkflow } from 'dhm/store/workflow/services';
import { useContext, useMemo } from 'react';
import { columnHistoryTable } from './columnHistoryTable';

const {
  matterNo,
  matterName,
  careerId,
  wfStatusId,
  applicant,
  applyDate,
  applyComment,
  approverRequest,
  agentRequest,
  approver,
  processComment,
  approvedDate,
  createdDatetime,
  createdUser,
  updatedDatetime,
  updatedUser,
} = columnHistoryTable;

export function HistoryTable({ originData }) {
  const { listHistoryProcess, getHistoryProcess } = ServiceWorkflow();
  const { data, pagination } = listHistoryProcess;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { tWorkflow } = useContext(LanguageContext);
  const columns = useMemo(
    () => [
      matterNo,
      matterName,
      careerId,
      wfStatusId,
      applicant,
      applyDate,
      applyComment,
      approverRequest,
      agentRequest,
      approver,
      processComment,
      approvedDate,
      createdDatetime,
      createdUser,
      updatedDatetime,
      updatedUser,
    ],
    [data],
  );

  const propsModal = {
    title: tWorkflow('processHistory'),
    isOpen,
    typeHeader: 'master',
    onCancel: onClose,
  };

  const params = {
    deleteFlg: 0,
    isHistory: false,
    isAll: false,
    sortType: 'desc',
    sortColumn: 'updatedDatetime',
    matterNo: originData.matterNo,
  };

  const payloadParams = {
    params,
  };

  const propsCommonTable = {
    columns,
    data,
    action: getHistoryProcess,
    payloadParams,
    rowIdKey: 'id',
    pagination,
  };

  return (
    <>
      <Tooltip label={tWorkflow('processHistory')}>
        <Img src={DHMAssets.ICON_HISTORY} onClick={onOpen} />
      </Tooltip>
      <DHMModal {...propsModal} size='6xl' isShowClose>
        <CommonTable customPadding='0px 0px 0px 30px' {...propsCommonTable} />
      </DHMModal>
    </>
  );
}
