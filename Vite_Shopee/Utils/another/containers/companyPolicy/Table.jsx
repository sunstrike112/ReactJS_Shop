import { Box, Flex, useDisclosure } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import { BoxMiniFeat } from 'dhm/components/Box/BoxMiniFeat';
import { DHMButton } from 'dhm/components/Button';
import { DHMContainer } from 'dhm/containers';
import { AppContext } from 'dhm/contexts/AppContext';
import LanguageContext from 'dhm/contexts/TranslateContext';
import { columnFunc } from 'dhm/services/table/columnKeysFunc';
import { filterCompanyPolicy, searchCompanyPolicy } from 'dhm/store/companyPolicy/action';
import { ServicesCompanyPolicy } from 'dhm/store/companyPolicy/services';
import { useContext, useMemo } from 'react';
import { CommonTable } from '../table/tableContainer';
import { CRUForm } from './CRUForm';
import { TableHistoryCompanyPolicy } from './HistoryCompanyPolicy';
import { columnKeys } from './column';

const { DeleteModal } = DHMContainer.Modal;

function ListButtonTableCompanyPolicy({ table, rowSelection, methodsTable, tTable, onOpen }) {
  const { deleteCompanyPolicyAction } = ServicesCompanyPolicy();
  const conditionShowDelete = Boolean(table.getIsSomeRowsSelected() || table.getIsAllRowsSelected());
  return (
    <Flex justify='space-between' mr={2} gap='10px'>
      <Flex gap='10px'>
        <CRUForm methodsTable={methodsTable} />
        <DeleteModal
          display={conditionShowDelete ? 'block' : 'none'}
          rowSelection={rowSelection}
          action={deleteCompanyPolicyAction}
          callbackSuccess={() => table.options.meta.funcResetDelete()}
        />
      </Flex>
      <DHMButton buttonType='create' text={tTable('history')} onClick={() => onOpen()} />
    </Flex>
  );
}

export function TableCompanyPolicy() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { tTable } = useContext(LanguageContext);
  const { heightApp } = useContext(AppContext);
  const propsModal = {
    title: tTable('company_policy_history'),
    isOpen,
    onCancel: onClose,
  };
  const { companyPolicy, deleteCompanyPolicyAction } = ServicesCompanyPolicy();
  const { data, pagination } = companyPolicy;
  const { compPolicyClassCode, compPolicyClassName, effectStartDate, effectEndDate } = columnKeys;
  const columnHelper = createColumnHelper();
  const columns = useMemo(
    () => [
      columnFunc.checkbox(),
      compPolicyClassCode,
      compPolicyClassName,
      effectStartDate,
      effectEndDate,
      columnHelper.accessor('action', {
        header: tTable('action'),
        noTooltip: true,
        cell: (info) => {
          const dataRow = info.row.original;
          const originData = {
            compPolicyClassCode: dataRow.compPolicyClassCode,
            compPolicyClassName: dataRow.compPolicyClassName,
            effectStartDate: dataRow.effectStartDate,
            effectEndDate: dataRow.effectEndDate,
          };
          const methodsTable = {
            callbackDelete: () => info.table.options.meta.funcResetDelete(),
          };
          return (
            <BoxMiniFeat gap='20px'>
              {/* <CRUForm type='view' originData={{ ...originData }} /> */}
              <CRUForm
                type='edit'
                originData={{ ...originData, id: dataRow.compPolicyClassCode }}
                methodsTable={methodsTable}
              />
              <DeleteModal
                type='delete'
                idRow={dataRow.compPolicyClassCode}
                callbackSuccess={methodsTable.callbackDelete}
                action={deleteCompanyPolicyAction}
              />
            </BoxMiniFeat>
          );
        },
      }),
    ],
    [data],
  );

  const params = {
    // isHistory: true,
    isHistory: false,
    deleteFlg: 0,
    sortType: 'desc',
    sortColumn: 'updatedDatetime',
  };

  const paramsFilter = {
    // isHistory: true,
    isHistory: false,
    deleteFlg: 0,
    isAll: true,
  };
  const payloadParams = {
    params,
  };

  const propsCommonTable = {
    columns,
    data,
    action: searchCompanyPolicy,
    actionFilter: filterCompanyPolicy,
    payloadParams,
    rowIdKey: 'compPolicyClassCode',
    componentUnderSearch: ({ table, rowSelection, methodsTable }) => (
      <ListButtonTableCompanyPolicy
        table={table}
        rowSelection={rowSelection}
        methodsTable={methodsTable}
        onOpen={onOpen}
        tTable={tTable}
      />
    ),
    pagination,
    moreParamsFilter: paramsFilter,
    propsTable: {
      height: `calc(${heightApp} - 200px)`,
      maxHeight: '565px',
    },
  };
  return (
    <Box px={12}>
      <TableHistoryCompanyPolicy propsModal={propsModal} />
      <CommonTable {...propsCommonTable} />
    </Box>
  );
}
