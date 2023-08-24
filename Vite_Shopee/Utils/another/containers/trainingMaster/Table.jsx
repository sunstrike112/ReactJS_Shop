import { Box, Flex, useDisclosure } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import { BoxMiniFeat } from 'dhm/components/Box/BoxMiniFeat';
import { DHMButton } from 'dhm/components/Button';
import { DHMContainer } from 'dhm/containers';
import { AppContext } from 'dhm/contexts/AppContext';
import LanguageContext from 'dhm/contexts/TranslateContext';
import { columnFunc } from 'dhm/services/table/columnKeysFunc';
import { filterTrainingMaster, searchTrainingMaster } from 'dhm/store/trainingMaster/action';
import { ServicesTrainingMaster } from 'dhm/store/trainingMaster/services';
import { useContext, useMemo } from 'react';
import { CommonTable } from '../table/tableContainer';
import { CRUForm } from './CRUForm';
import { TableHistoryTrainingMaster } from './HistoryTrainingMaster';
import { columnKeys } from './column';

const { DeleteModal } = DHMContainer.Modal;

function ListButtonTableTrainingMaster({ table, rowSelection, methodsTable, tTable, onOpen }) {
  const conditionShowDelete = Boolean(table.getIsSomeRowsSelected() || table.getIsAllRowsSelected());
  const { deleteTrainingMasterAction } = ServicesTrainingMaster();
  return (
    <Flex justify='space-between' mr={2} gap='10px'>
      <Flex gap='10px'>
        <CRUForm methodsTable={methodsTable} />
        <DeleteModal
          display={conditionShowDelete ? 'block' : 'none'}
          rowSelection={rowSelection}
          action={deleteTrainingMasterAction}
          callbackSuccess={() => table.options.meta.funcResetDelete()}
        />
      </Flex>
      <DHMButton buttonType='create' text={tTable('history')} onClick={() => onOpen()} />
    </Flex>
  );
}

export function TableTrainingMaster() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { tTable } = useContext(LanguageContext);
  const { heightApp } = useContext(AppContext);
  const propsModal = {
    title: tTable('training_master_history'),
    isOpen,
    onCancel: onClose,
  };
  const { trainingMaster, deleteTrainingMasterAction } = ServicesTrainingMaster();
  const { data, pagination } = trainingMaster;
  const { trainingCode, trainingType, trainingName, effectStartDate, effectEndDate } = columnKeys;
  const columnHelper = createColumnHelper();
  const columns = useMemo(
    () => [
      columnFunc.checkbox(),
      trainingCode,
      trainingType,
      trainingName,
      effectStartDate,
      effectEndDate,
      columnHelper.accessor('action', {
        header: tTable('action'),
        noTooltip: true,
        cell: (info) => {
          const dataRow = info.row.original;
          const originData = {
            trainingCode: dataRow.trainingCode,
            trainingType: dataRow.trainingType,
            trainingName: dataRow.trainingName,
            effectStartDate: dataRow.effectStartDate,
            effectEndDate: dataRow.effectEndDate,
          };
          const methodsTable = {
            callbackDelete: () => info.table.options.meta.funcResetDelete(),
          };
          return (
            <BoxMiniFeat gap='20px'>
              <CRUForm type='view' originData={{ ...originData }} />
              <CRUForm
                type='edit'
                originData={{ ...originData, id: dataRow.trainingCode }}
                methodsTable={methodsTable}
              />
              <DeleteModal
                type='delete'
                idRow={dataRow.trainingCode}
                callbackSuccess={methodsTable.callbackDelete}
                action={deleteTrainingMasterAction}
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
    action: searchTrainingMaster,
    actionFilter: filterTrainingMaster,
    payloadParams,
    rowIdKey: 'trainingCode',
    componentUnderSearch: ({ table, rowSelection, methodsTable }) => (
      <ListButtonTableTrainingMaster
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
      <TableHistoryTrainingMaster propsModal={propsModal} />
      <CommonTable {...propsCommonTable} />
    </Box>
  );
}
