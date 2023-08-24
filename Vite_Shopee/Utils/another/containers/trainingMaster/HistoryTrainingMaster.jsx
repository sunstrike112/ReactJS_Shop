import DHMModal from 'dhm/components/Modal';
import { ServicesTrainingMaster } from 'dhm/store/trainingMaster/services';
import { historyTrainingMaster } from 'dhm/store/trainingMaster/action';
import { useMemo } from 'react';
import { columnKeys as columnKeyCommon } from 'dhm/services/table/columnKeysBE';
import { CommonTable } from '../table/tableContainer';
import { columnKeys } from './columnHistory';

export function TableHistoryTrainingMaster({ propsModal }) {
  const { histTrainingMaster } = ServicesTrainingMaster();
  const { data, pagination } = histTrainingMaster;
  const { trainingCode, trainingType, trainingName, effectStartDate, effectEndDate, updatedDatetime, updatedUser } =
    columnKeys;
  const { deleteFlgText } = columnKeyCommon;
  const columns = useMemo(
    () => [
      trainingCode,
      trainingType,
      trainingName,
      effectStartDate,
      effectEndDate,
      updatedDatetime,
      updatedUser,
      deleteFlgText,
    ],
    [data],
  );

  const params = {
    isHistory: true,
    sortType: 'desc',
    sortColumn: 'updatedDatetime',
  };

  const paramsFilter = {
    isHistory: true,
    isAll: true,
  };
  const payloadParams = {
    params,
  };

  const propsCommonTable = {
    columns,
    data,
    action: historyTrainingMaster,
    payloadParams,
    rowIdKey: 'id',
    pagination,
    moreParamsFilter: paramsFilter,
  };

  return (
    <>
      <DHMModal {...propsModal} size='6xl' typeHeader='master' isShowClose>
        <CommonTable {...propsCommonTable} />
      </DHMModal>
    </>
  );
}
