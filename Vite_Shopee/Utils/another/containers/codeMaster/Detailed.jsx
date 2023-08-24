import { Flex, HStack, Text } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import { AddForm } from 'dhm/containers/codeMaster/AddForm.jsx';
import { DForm } from 'dhm/containers/codeMaster/DForm.jsx';
import { HistoryTable } from 'dhm/containers/codeMaster/HistoryTable.jsx';
import { AbilityContext } from 'dhm/contexts/AbilityContext';
import LanguageContext from 'dhm/contexts/TranslateContext';
import { columnKeys } from 'dhm/services/table/columnKeysBE';
import { getDropdownCodeListID, resetDataDetail, searchDetailDisplay } from 'dhm/store/codeMaster/action.js';
import { useContext, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactSelect from 'react-select';
import { CommonTable } from '../table/tableContainer';

export function TableDetailed() {
  const { ID_KEY, canEdit } = useContext(AbilityContext);
  const dispatch = useDispatch();
  const { codeMaster, dropdownListCodeID } = useSelector((state) => state.codeMaster);
  const { data, pagination } = codeMaster;
  const [dataSelect, setDataSelect] = useState([]);
  const [params, setParams] = useState();
  const [codeId, setCodeId] = useState({});
  const [selectedValue, setSelectedValue] = useState(null);
  const { tTable, tTabs } = useContext(LanguageContext);

  const columnHelper = createColumnHelper();

  const { codeName, codeValue, codeNameEn, sortOrder } = columnKeys;
  const columns = useMemo(
    () => [
      codeValue({
        haveCustomFilter: false,
      }),
      codeName({
        haveCustomFilter: false,
      }),
      codeNameEn({
        haveCustomFilter: false,
      }),
      sortOrder({
        haveCustomFilter: false,
      }),
      ...(canEdit(ID_KEY[19])
        ? [
            columnHelper.accessor('action', {
              header: tTable('action'),
              noTooltip: true,
              stylesHeader: {
                justifyContent: 'flex-end',
              },
              cell: (info) => {
                const dataRow = info.row.original;
                const originData = {
                  codeValue: dataRow.codeValue,
                  codeName: dataRow.codeName,
                  codeNameEn: dataRow.codeNameEn,
                  sortOrder: dataRow.sortOrder,
                  codeListId: dataRow.codeListId,
                  codeListName: dataRow.codeListName,
                  version: dataRow.version || 0,
                };
                const methodsTable = {
                  callbackDelete: () => info.table.options.meta.funcResetDelete(),
                };
                return (
                  <Flex justifyContent='end'>
                    <AddForm type='edit' originData={{ ...originData, deleteFlg: dataRow.deleteFlg, id: dataRow.id }} />
                    <DForm
                      type='delete'
                      idRow={{
                        codeListId: originData.codeListId,
                        codeValue: originData.codeValue,
                      }}
                      methodsTable={methodsTable}
                    />
                  </Flex>
                );
              },
            }),
          ]
        : []),
    ],
    [data],
  );

  useEffect(() => {
    if (dropdownListCodeID.length) {
      setDataSelect(
        dropdownListCodeID.map((item) => ({
          label: item.codeListName,
          value: item.codeListId,
        })),
      );
    }
  }, [dropdownListCodeID]);
  useEffect(() => {
    dispatch(resetDataDetail());
    const paramsDropdown = {
      isHistory: true,
      sortType: 'desc',
      codeListIds: null,
    };
    dispatch(getDropdownCodeListID({ params: paramsDropdown }));
  }, []);

  const getSelect = (e) => {
    const paramsFilter = {
      params: {
        codeListIds: [e.value],
        sortType: 'asc',
        sortColumn: 'codeValue',
        limit: 10,
        page: 1,
      },
    };
    setParams(paramsFilter.params);
    setSelectedValue(e);

    setCodeId({ grID: e.value, grName: e.label });
    dispatch(searchDetailDisplay(paramsFilter));
  };
  const payloadParams = {
    params,
  };
  const propsCommonTable = {
    columns,
    data,
    pagination,

    payloadParams,
    action: searchDetailDisplay,
    rowIdKey: 'id',
    isFetchBegin: false,
    componentUnderSearch: () => (
      <Flex w='100%' alignItems='center' justify='space-between' gap='3px'>
        <Flex align='center' marginLeft='20px'>
          <Text width='125px'>{tTable('codeListId')}:</Text>
          {dataSelect && dataSelect.length > 0 && (
            <ReactSelect
              placeholder={tTabs('select_code')}
              styles={{ container: (provided) => ({ ...provided, width: '160px', zIndex: 1 }) }}
              options={dataSelect}
              onChange={getSelect}
              value={selectedValue}
            />
          )}
        </Flex>
        <HStack mr='10px' spacing='10px'>
          {!codeId.grID ? null : (
            <>
              <HistoryTable codeListIds={codeId} />
              {canEdit(ID_KEY[19]) && (
                <AddForm
                  type='create'
                  originData={{
                    codeListId: codeId.grID,
                    codeListName: codeId.grName,
                  }}
                />
              )}
            </>
          )}
        </HStack>
      </Flex>
    ),
  };

  return <CommonTable {...propsCommonTable} />;
}
