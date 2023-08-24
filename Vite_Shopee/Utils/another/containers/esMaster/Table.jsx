import { Flex } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import { BoxMiniFeat } from 'dhm/components/Box/BoxMiniFeat';
import { DHMContainer } from 'dhm/containers';
import { AbilityContext } from 'dhm/contexts/AbilityContext';
import LanguageContext from 'dhm/contexts/TranslateContext';
import { columnFunc } from 'dhm/services/table/columnKeysFunc';
import { ServiceEsMaster } from 'dhm/store/esMaster/services';
import { useContext, useMemo } from 'react';
import { CommonTable } from '../table/tableContainer';
import { CRUForm } from './CRUForm';
import { HistoryTable } from './HistoryTable';
import { columnsEsMaster } from './column';

const { DeleteModal } = DHMContainer.Modal;

function ListButtonFunc({ table, rowSelection }) {
  const { action } = ServiceEsMaster();
  const { ID_KEY, canEdit } = useContext(AbilityContext);

  const conditionShowDelete = Boolean(table.getIsSomeRowsSelected() || table.getIsAllRowsSelected());
  return (
    <Flex justify='start' gap='10px'>
      {canEdit(ID_KEY[20]) && (
        <>
          <CRUForm table={table} />
          <DeleteModal
            display={conditionShowDelete ? 'block' : 'none'}
            rowSelection={rowSelection}
            action={action.deleteEsMaster}
            callbackSuccess={() => table.options.meta.funcResetDelete()}
          />
        </>
      )}
    </Flex>
  );
}

export function TableESMaster() {
  const { ID_KEY, canEdit } = useContext(AbilityContext);

  const { state, action } = ServiceEsMaster();
  const { tTable } = useContext(LanguageContext);
  const { data, pagination } = state.esMaster;
  const columnHelper = createColumnHelper();
  const columns = useMemo(
    () => [
      ...(canEdit(ID_KEY[20]) ? [columnFunc.checkbox()] : []),
      ...columnsEsMaster,
      ...(canEdit(ID_KEY[20])
        ? [
            columnHelper.accessor('action', {
              header: tTable('action'),
              noTooltip: true,
              cell: (info) => {
                const dataRow = info.row.original;
                const originData = {
                  userCode: dataRow.userCode,
                  // role: dataRow.roleValue,
                  esMngPred: dataRow.esMngPred,
                  esMngPredDescription: dataRow.esMngPredDescription || '',
                  esMngBelong: dataRow.esMngBelong,
                  esMngTeamLeader: dataRow.esMngTeamLeader || '',
                  version: dataRow.version || 0,
                };
                const callbackSuccess = {
                  callbackDelete: () => info.table.options.meta.funcResetDelete(),
                };
                return (
                  <BoxMiniFeat gap='20px'>
                    {/* <HistoryTable ids={dataRow.userCode} /> */}
                    <CRUForm type='edit' originData={originData} table={info.table} />
                    <DeleteModal
                      type='delete'
                      idRow={dataRow.userCode}
                      callbackSuccess={callbackSuccess.callbackDelete}
                      action={action.deleteEsMaster}
                    />
                  </BoxMiniFeat>
                );
              },
            }),
          ]
        : []),
    ],
    [data],
  );

  const params = {
    isHistory: false,
    deleteFlg: 0,
    sortType: 'desc',
    sortColumn: 'updatedDatetime',
  };

  const paramsFilter = {
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
    action: action.searchEsMaster,
    payloadParams,
    rowIdKey: 'userCode',
    componentUnderSearch: ({ table, rowSelection }) => (
      <Flex justify='space-between'>
        <ListButtonFunc table={table} rowSelection={rowSelection} />
        <HistoryTable mr={2} modeView='esMasterAll' />
      </Flex>
    ),
    pagination,
    actionFilter: action.filterEsMaster,
    moreParamsFilter: paramsFilter,
  };
  return <CommonTable {...propsCommonTable} />;
}
