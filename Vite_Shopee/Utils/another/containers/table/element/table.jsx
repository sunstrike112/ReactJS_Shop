import { Box, Flex, Tbody, Td, Th, Thead, Tr, Table } from '@chakra-ui/react';
import { BORDERS, COLORS } from 'dhm/utils/index';
import { FilterTable } from '../filter';
import { CustomSort } from '../sort';
import { BoxContent, BoxSizingTable, CustomTooltip, defaultSizeTable } from '../styled';

export function TableView({
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
}) {
  return (
    <Table size={size || 'lg'} minWidth='100%' width={table.getTotalSize()}>
      <Thead bg={modeTableProps.bgHeader} position='sticky' top='0' zIndex='999'>
        {table.getHeaderGroups().map((headerGroup) => (
          <Tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              const { meta } = header.column.columnDef;
              return (
                <Th
                  key={header.id}
                  isNumeric={meta?.isNumeric}
                  color={modeTableProps.colorHeader}
                  border={modeTableProps.border}
                  borderTop='none'
                  padding={defaultSizeTable.paddingHeader}
                  fontSize={defaultSizeTable.fontSize}
                  position='relative'
                  width={header.getSize()}
                  maxWidth={header.getSize()}
                  {...header.column.columnDef.styles}
                >
                  <Flex {...header.column.columnDef.stylesHeader}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {header.column.columnDef.haveCustomSort && data?.length > 1 ? (
                      <Box width='20px'>
                        <CustomSort sort={sort} handleSort={handleSort} keySort={header.column.columnDef.accessorKey} />
                      </Box>
                    ) : null}
                    {header.column.columnDef?.haveCustomFilter ? (
                      <Box ml='1' width='0'>
                        <FilterTable
                          keyValue={rowIdKey}
                          keyLabel={header.column.columnDef.accessorKey}
                          keySearch={header.column.columnDef.accessorKey}
                          moreParams={moreParamsFilter}
                          clearFilter={setParamsFilter}
                          apiFilter={actionFilter}
                          table={table}
                          paramsFilter={paramsFilter}
                          setIsNoDataFilter={setIsNoDataFilter}
                          isNoDataFilter={isNoDataFilter}
                        />
                      </Box>
                    ) : null}
                  </Flex>
                  <BoxSizingTable>
                    <Box
                      {...{
                        onMouseDown: header.getResizeHandler(),
                        onTouchStart: header.getResizeHandler(),
                        className: `resizer ${header.column.getIsResizing() ? 'isResizing' : ''}`,
                        style: {
                          transform:
                            columnResizeMode === 'onEnd' && header.column.getIsResizing()
                              ? `translateX(${table.getState().columnSizingInfo.deltaOffset}px)`
                              : '',
                        },
                      }}
                    />
                  </BoxSizingTable>
                </Th>
              );
            })}
          </Tr>
        ))}
      </Thead>
      {isShowNoData ? (
        <Tbody>
          <Tr>
            <Td />
          </Tr>
        </Tbody>
      ) : (
        <Tbody>
          {table.getRowModel().rows.map((row) => (
            <Tr
              key={row.id}
              _hover={{
                background: COLORS.prime_shade_8,
              }}
            >
              {row.getVisibleCells().map((cell) => {
                const { meta } = cell.column.columnDef;
                return (
                  <Td
                    key={cell.id}
                    isNumeric={meta?.isNumeric}
                    border={BORDERS.border_1(COLORS.gray_700)}
                    color={COLORS.blue_primary}
                    height={defaultSizeTable.heightCell}
                    padding={customPadding === 'default' ? defaultSizeTable.padding : customPadding}
                    fontSize={defaultSizeTable.fontSize}
                    width={cell.column.getSize()}
                    maxWidth={cell.column.getSize()}
                    {...cell.column.columnDef.styles}
                    {...cell.column.columnDef.stylesRows}
                  >
                    <>
                      <CustomTooltip
                        hasArrow
                        closeOnScroll
                        label={
                          cell.column.columnDef.noTooltip
                            ? ''
                            : flexRender(cell.column.columnDef.cell, cell.getContext())
                        }
                      >
                        <BoxContent>{flexRender(cell.column.columnDef.cell, cell.getContext())}</BoxContent>
                      </CustomTooltip>
                    </>
                  </Td>
                );
              })}
            </Tr>
          ))}
        </Tbody>
      )}
    </Table>
  );
}
