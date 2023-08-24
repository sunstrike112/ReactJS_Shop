import { createColumnHelper } from '@tanstack/react-table';
import { CheckboxTable } from 'dhm/components/Table/elements/Checkbox';
import { WF_STATUS } from 'dhm/utils/constants/select';

const columnHelper = createColumnHelper();
const checkbox = () =>
  columnHelper.accessor('checkbox_column', {
    header: ({ table }) => (
      <CheckboxTable
        {...{
          checked: table.getIsAllRowsSelected(),
          indeterminate: table.getIsSomeRowsSelected(),
          onChange: table.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <CheckboxTable
        {...{
          checked: row.getIsSelected(),
          disabled: !row.getCanSelect(),
          indeterminate: row.getIsSomeSelected(),
          onChange: row.getToggleSelectedHandler(),
        }}
      />
    ),
    enableSorting: false,
    enableColumnFilter: false,
    noTooltip: true,
    styles: {
      width: '30px',
    },
  });
const checkboxIncomplete = () =>
  columnHelper.accessor('checkbox_column', {
    header: ({ table }) => (
      <CheckboxTable
        {...{
          checked: table.getIsAllRowsSelected(),
          indeterminate: table.getIsSomeRowsSelected(),
          onChange: table.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) =>
      row.original.wfStatusId === WF_STATUS.APPLYING && (
        <CheckboxTable
          checked={row.getIsSelected()}
          disabled={!row.getCanSelect()}
          indeterminate={row.getIsSomeSelected()}
          onChange={row.getToggleSelectedHandler()}
        />
      ),
    enableSorting: false,
    enableColumnFilter: false,
    noTooltip: true,
    styles: {
      width: '30px',
    },
  });
const keyIndexTable = () =>
  columnHelper.accessor('keyIndexTable', {
    header: 'No',
    cell: ({ row }) => row.index + 1,
    noTooltip: true,
    minSize: 10,
  });
export const columnFunc = {
  checkbox,
  checkboxIncomplete,
  keyIndexTable,
};
