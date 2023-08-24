/* eslint-disable react-hooks/rules-of-hooks */
import { Box, Flex, Img, Tooltip } from '@chakra-ui/react';
import { flexRender, getCoreRowModel, getExpandedRowModel, useReactTable } from '@tanstack/react-table';
import { DHMButton } from 'dhm/components/Button';
import { AppContext } from 'dhm/contexts/AppContext';
import LanguageContext from 'dhm/contexts/TranslateContext';
import { useGetValueDropdown } from 'dhm/hooks/useGetValueDropdown';
import { BORDERS, COLORS, MARGIN } from 'dhm/utils/constants/style';
import { removeFirstParentKey } from 'dhm/utils/helpers/format';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { DHMAssets } from '../../assets/index';
import { TableView } from './element/table';
import { PaginationTable } from './pagination';
import { StyledTable, propsViewHistory } from './styled';

export function CommonTable({
  data,
  columns,
  componentUnderSearch = () => {},
  componentUnderPagination = () => {},
  action = () => () => {},
  actionFilter = () => () => {},
  payloadParams = {},
  rowIdKey = 'id',
  pagination = {
    page: 1,
    pageSize: 10,
    total: 0,
    limit: 10,
  },
  moreParamsFilter = {},
  isShowPagination = true,
  size = '',
  modeTable = 'normal',
  customPropsPagination = {},
  defaultSort = null,
  isFetchBegin = true,
  propsTable = {},
  customPadding = 'default',
  getDataEdit = () => {},
  isEdit = false,
  callbackModeEdit = () => {},
  getRowSelection = () => {},
}) {
  const { getValueDropdown } = useGetValueDropdown();
  const [columnResizeMode] = React.useState('onChange');
  const { isLoadingCommom, heightApp } = useContext(AppContext);

  const modeTableProps = propsViewHistory[modeTable];
  const { tTable } = useContext(LanguageContext);
  const dispatch = useDispatch();
  const [rowSelection, setRowSelection] = useState([]);
  const [sort, setSort] = useState(
    defaultSort || {
      sortColumn: '',
      sortType: 'desc',
    },
  );
  const [paramsFilter, setParamsFilter] = useState({});
  const [isNoDataFilter, setIsNoDataFilter] = useState(false);
  useEffect(() => {
    if (isFetchBegin) {
      dispatch(action({ params: { ...payloadParams.params, page: 1, limit: pagination.limit } }));
    }
  }, []);

  const updatePagination = (newPage, newLimit, otherParams = {}) => {
    const params = {
      ...payloadParams.params,
      ...otherParams,
      page: newPage,
      limit: newLimit,
      sortColumn: otherParams?.sortColumn || payloadParams?.params?.sortColumn || '',
    };
    dispatch(action({ params }));
  };

  const handleSort = (key) => {
    const preParams = removeFirstParentKey(paramsFilter);
    const sortOrder = sort.sortColumn !== key || sort.sortType === 'desc' ? 'asc' : 'desc';
    setSort({ sortColumn: key, sortType: sortOrder });
    updatePagination(1, pagination.limit, { ...preParams, sortType: sortOrder, sortColumn: key });
  };

  const table = useReactTable({
    defaultColumn: {
      minSize: 200,
    },
    columns,
    data,
    columnResizeMode,
    getCoreRowModel: getCoreRowModel(),
    state: {
      rowSelection,
    },
    getRowId: (row) => row[rowIdKey],
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getExpandedRowModel: getExpandedRowModel(),
    meta: {
      funcReset: () => updatePagination(1, pagination.limit),
      funcResetDelete: () => {
        setRowSelection([]);
        table.setRowSelection([]);
        updatePagination(1, pagination.limit);
      },
      funcFilter: (params) => updatePagination(1, pagination.limit, params),
      getValueDropdown: (key, value) => getValueDropdown(key, value),
      funcClearParamsFilter: () => setParamsFilter({}),
      updateData: (rowIndex, columnId, value) => {
        getDataEdit((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex],
                [columnId]: value,
              };
            }
            return row;
          }),
        );
      },
    },
    enableColumnResizing: true,
  });

  const callbackDelete = () => {
    dispatch(action({ params: { ...payloadParams.params, page: 1, limit: pagination.limit } }));
  };

  const methodsTable = {
    callbackDelete,
  };
  const propsPagination = {
    ...pagination,
    handleChangePage: (page) => updatePagination(page, pagination.limit, { ...paramsFilter, ...sort }),
    handlePageSizeChange: (limit) => updatePagination(1, limit, { ...paramsFilter, ...sort }),
    totalPerPage: table.options.data.length,
  };
  const isHaveMultiFilter = useMemo(() => columns.some((item) => item?.haveCustomFilter), []);
  const isShowNoData = useMemo(
    () => Boolean(data.length === 0 && !isLoadingCommom) || isNoDataFilter,
    [data, isLoadingCommom, isNoDataFilter],
  );
  useEffect(() => {
    getRowSelection(rowSelection);
  }, [rowSelection]);
  return (
    <>
      <Flex justify='space-between' alignItems='center' mb={MARGIN.m_16}>
        <Box w='100%'>{componentUnderSearch({ table, rowSelection, methodsTable })}</Box>
        <Flex justify='end'>
          {isHaveMultiFilter && data.length > 0 ? (
            <DHMButton
              buttonType='cancel'
              text={tTable('clear')}
              onClick={() => {
                setParamsFilter({});
                updatePagination(1, pagination.limit, { ...sort });
                setIsNoDataFilter(false);
              }}
            >
              <Tooltip label='クリックしたら元  に戻ります。'>
                <Box position='absolute' top='0' right='0' w='100%' h='100%' />
              </Tooltip>
            </DHMButton>
          ) : null}
        </Flex>
      </Flex>
      <StyledTable
        maxWidth='full'
        mx='auto'
        height={`calc(${heightApp} - 335px)`}
        maxHeight='500px'
        bg={COLORS.white}
        borderRadius={BORDERS.radius_0_top}
        border={BORDERS.border_1(COLORS.gray_700)}
        position='relative'
        overflowY='auto'
        zIndex='0'
        {...propsTable}
      >
        {isShowNoData && (
          <Flex position='absolute' width={table.getTotalSize()} top='80px' justifyContent='center'>
            <Img
              position='sticky'
              width='325px'
              height='360px'
              left='200px'
              right='100px'
              src={DHMAssets.NoDataTable}
              alt=''
            />
          </Flex>
        )}

        {TableView({
          table,
          size,
          modeTableProps,
          data,
          flexRender,
          sort,
          handleSort,
          rowIdKey,
          moreParamsFilter,
          isNoDataFilter,
          paramsFilter,
          setParamsFilter,
          actionFilter,
          setIsNoDataFilter,
          columnResizeMode,
          isShowNoData,
          customPadding,
        })}
      </StyledTable>

      <PaginationTable
        {...propsPagination}
        {...customPropsPagination}
        isEdit={isEdit}
        callbackEdit={callbackModeEdit}
        opacity={
          (table.getRowModel().rows.length !== 0 || isShowPagination) && data.length !== 0 && !isShowNoData ? 1 : 0
        }
      />
      <Box w='100%'>{componentUnderPagination({ table, rowSelection, methodsTable })}</Box>
    </>
  );
}
