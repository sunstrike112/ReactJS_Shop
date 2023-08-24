import { Flex } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import { BoxMiniFeat } from 'dhm/components/Box/BoxMiniFeat';
import { Modal } from 'dhm/containers/modal';
import { CommonTable } from 'dhm/containers/table/tableContainer';
import { AbilityContext } from 'dhm/contexts/AbilityContext';
import LanguageContext from 'dhm/contexts/TranslateContext';
import { ServiceRole } from 'dhm/store/manageUser/role/services';
import { useContext, useMemo } from 'react';
import { columnsRole } from './column';
import { CRUForm } from './form';

const { DeleteModal } = Modal;
function ListButtonFunc({ table }) {
  return (
    <Flex justify='end' gap='10px'>
      <CRUForm table={table} />
    </Flex>
  );
}
export function TableRole() {
  const { ID_KEY, canEdit } = useContext(AbilityContext);

  const { state, action } = ServiceRole();
  const { tTable } = useContext(LanguageContext);
  const { data, pagination } = state.role;
  const columnHelper = createColumnHelper();
  const columns = useMemo(
    () => [
      ...columnsRole,
      ...(canEdit(ID_KEY[22])
        ? [
            columnHelper.accessor('action', {
              header: tTable('action'),
              noTooltip: true,
              cell: (info) => {
                const dataRow = info.row.original;
                const originData = {
                  version: dataRow.version || 0,
                  roleName: dataRow.roleName,
                  roleDescription: dataRow.roleDescription,
                  roleId: dataRow.roleId,
                };
                const callbackSuccess = {
                  callbackDelete: () => info.table.options.meta.funcResetDelete(),
                };
                const specialCase = ['ADMIN', 'VIEWER'];
                return (
                  <BoxMiniFeat gap='20px'>
                    {/* <HistoryTable ids={dataRow.userCode} /> */}
                    <CRUForm type='edit' originData={originData} table={info.table} />
                    {!specialCase.includes(dataRow.roleId) && (
                      <DeleteModal
                        type='other'
                        callbackSuccess={callbackSuccess.callbackDelete}
                        action={action.deleteRole}
                        morePayload={{
                          id: dataRow.roleId,
                        }}
                      />
                    )}
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
    // sortType: 'desc',
    // sortColumn: 'updatedDatetime',
  };

  const payloadParams = {
    params,
  };

  const propsCommonTable = {
    columns,
    data,
    action: action.searchRole,
    payloadParams,
    rowIdKey: 'userCode',
    componentUnderSearch: ({ table }) => (
      <Flex justify='end'>{canEdit(ID_KEY[22]) && <ListButtonFunc table={table} />}</Flex>
    ),
    pagination,
    actionFilter: action.filterRole,
  };
  return <CommonTable {...propsCommonTable} />;
}
