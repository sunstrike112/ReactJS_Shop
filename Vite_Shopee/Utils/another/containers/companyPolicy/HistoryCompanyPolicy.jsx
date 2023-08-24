import DHMModal from 'dhm/components/Modal';
import { ServicesCompanyPolicy } from 'dhm/store/companyPolicy/services';
import { historyCompanyPolicy } from 'dhm/store/companyPolicy/action';
import { useMemo } from 'react';
import { columnKeys as columnKeyCommon } from 'dhm/services/table/columnKeysBE';
import { CommonTable } from '../table/tableContainer';
import { columnKeys } from './columnHistory';

export function TableHistoryCompanyPolicy({ propsModal }) {
  const { histCompanyPolicy } = ServicesCompanyPolicy();
  const { data, pagination } = histCompanyPolicy;
  const { compPolicyClassCode, compPolicyClassName, effectStartDate, effectEndDate, updatedDatetime, updatedUser } =
    columnKeys;
  const { deleteFlgText } = columnKeyCommon;
  const columns = useMemo(
    () => [
      compPolicyClassCode,
      compPolicyClassName,
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
    action: historyCompanyPolicy,
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
