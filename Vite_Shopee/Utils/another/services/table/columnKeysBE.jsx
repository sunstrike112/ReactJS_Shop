import { Badge, Box } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import { transOutHook } from 'dhm/contexts/TranslateContext';
import i18n from 'dhm/translate/index';
import { convertToCurrentTime } from 'dhm/utils/helpers/convert';
import { formatDateJP } from '../../utils/helpers/format';

const isEng = i18n.language === 'en';
const columnHelper = createColumnHelper();

const trans = (value) => transOutHook(value, 'table');

// Department master table
const departmentId = columnHelper.accessor('departmentId', {
  header: trans('departmentId'),
  cell: (info) => <>{info.getValue()}</>,
  typeFilter: 'text',
  haveCustomFilter: true,
  haveCustomSort: true,
});

const departmentName = columnHelper.accessor('departmentName', {
  header: trans('department_name'),
  cell: (info) => <>{info.getValue()}</>,
  typeFilter: 'text',
  haveCustomFilter: true,
  haveCustomSort: true,
});

const departmentLevel = columnHelper.accessor('departmentLevel', {
  header: trans('department_level'),
  haveCustomFilter: true,
  haveCustomSort: true,
});
const establishmentDate = columnHelper.accessor('establishmentDate', {
  header: trans('establishment_date'),
  cell: (info) => formatDateJP(info.getValue()),
  haveCustomFilter: true,
  haveCustomSort: true,
});
const endDate = columnHelper.accessor('endDate', {
  header: trans('end_date'),
  typeFilter: 'date',
  cell: (info) => formatDateJP(info.getValue()),
  haveCustomFilter: true,
  haveCustomSort: true,
});

// Code master table
const codeListId = ({ haveCustomFilter = true }) =>
  columnHelper.accessor('codeListId', {
    header: trans('codeListId'),
    cell: (info) => <>{info.getValue()}</>,
    haveCustomFilter,
    haveCustomSort: true,
  });

const codeIdTable = ({ haveCustomFilter = true }) =>
  columnHelper.accessor('codeListId', {
    header: trans('codeListId'),
    cell: (info) => <>{info.getValue()}</>,
    haveCustomFilter,
    haveCustomSort: true,
  });

const codeListName = ({ haveCustomFilter = true }) =>
  columnHelper.accessor('codeListName', {
    header: trans('codeListName'),
    cell: (info) => <>{info.getValue()}</>,
    haveCustomFilter,
    haveCustomSort: true,
  });

const codeValue = ({ haveCustomFilter = true }) =>
  columnHelper.accessor('codeValue', {
    header: trans('codeValue'),
    cell: (info) => <>{info.getValue()}</>,
    typeFilter: 'text',
    haveCustomSort: true,
    haveCustomFilter,
  });

const codeName = ({ haveCustomFilter = true }) =>
  columnHelper.accessor('codeName', {
    header: trans('codeName'),
    cell: (info) => <>{info.getValue()}</>,
    typeFilter: 'text',
    haveCustomSort: true,
    haveCustomFilter,
  });

const codeNameEn = ({ haveCustomFilter = true }) =>
  columnHelper.accessor('codeNameEn', {
    header: trans('codeNameEn'),
    cell: (info) => <>{info.getValue()}</>,
    typeFilter: 'text',
    haveCustomSort: true,
    haveCustomFilter,
  });

const sortOrder = ({ haveCustomFilter = true }) =>
  columnHelper.accessor('sortOrder', {
    header: trans('sortOrder'),
    cell: (info) => <>{info.getValue()}</>,
    typeFilter: 'text',
    haveCustomFilter,
    haveCustomSort: true,
    stylesRows: {
      textAlign: 'end',
    },
  });

const createdUser = columnHelper.accessor('createdUser', {
  header: trans('registered_person'),
  cell: (info) => info.getValue(),
  haveCustomFilter: true,
  haveCustomSort: true,
  minSize: isEng ? 250 : 200,
});

const createdDatetime = ({ haveCustomFilter = true }) =>
  columnHelper.accessor('createdDatetime', {
    header: trans('created_date'),
    cell: (info) => convertToCurrentTime(info.getValue()),
    typeFilter: 'date',
    haveCustomFilter,
    haveCustomSort: true,
  });

const updatedDatetime = ({ haveCustomFilter }) =>
  columnHelper.accessor('updatedDatetime', {
    header: trans('updated_date'),
    cell: (info) => convertToCurrentTime(info.getValue()),
    haveCustomFilter,
    haveCustomSort: true,
  });

const updatedUser = ({ haveCustomFilter = true }) =>
  columnHelper.accessor('updatedUser', {
    header: trans('updated_by'),
    cell: (info) => info.getValue(),
    haveCustomFilter,
    haveCustomSort: true,
  });

const employeeId = columnHelper.accessor('employeeId', {
  header: '社員ID',
  cell: (info) => <>{info.getValue()}</>,
});
const employeeName = columnHelper.accessor('employeeName', {
  header: '氏名',
  cell: (info) => (
    <Box>
      <Box>{info.getValue()}</Box>
      <Box>{info.row.original.employeeNameKana}</Box>
    </Box>
  ),
});

// history table

const codeIdHistory = columnHelper.accessor('codeValue', {
  header: trans('codeId_History'),
  cell: (info) => <>{info.getValue()}</>,
});
const codeNameHistory = columnHelper.accessor('codeName', {
  header: trans('code_Name_History'),
  cell: (info) => <>{info.getValue()}</>,
});
const codeNameEnHistory = columnHelper.accessor('codeNameEn', {
  header: trans('code_Name_En_History'),
  cell: (info) => <>{info.getValue()}</>,
});
const createdUserHistory = columnHelper.accessor('createdUser', {
  header: trans('created_User_History'),
  cell: (info) => <>{info.getValue()}</>,
});
const createdUserHistorySort = columnHelper.accessor('createdUser', {
  header: trans('created_User_History'),
  cell: (info) => <>{info.getValue()}</>,
  haveCustomSort: true,
});
const createdDatetimeHistory = columnHelper.accessor('createdDatetime', {
  header: trans('created_Datetime_History'),
  cell: (info) => convertToCurrentTime(info.getValue()),
  haveCustomSort: true,
});
const updatedUserHistory = columnHelper.accessor('updatedUser', {
  header: trans('updated_User_History'),
  cell: (info) => <>{info.getValue()}</>,
});
const updatedDatetimeHistory = columnHelper.accessor('updatedDatetime', {
  header: trans('updated_Datetime_History'),
  cell: (info) => convertToCurrentTime(info.getValue()),
  haveCustomSort: true,
});
const statusHistory = columnHelper.accessor('deleteFlg', {
  header: trans('status_History'),
  cell: (info) => (
    <Badge ml='1' fontSize='0.8em' colorScheme={info.getValue() ? 'red' : 'green'} padding='0 10px'>
      {trans(info.getValue() ? 'in_active' : 'active')}
    </Badge>
  ),
  noTooltip: true,
});
const sortOrderHistory = columnHelper.accessor('sortOrder', {
  header: trans('sort_Order_History'),
  cell: (info) => <>{info.getValue()}</>,
});

const deleteFlg = columnHelper.accessor('deleteFlg', {
  header: trans('status_History'),
  cell: (info) => (
    <Badge ml='1' fontSize='0.8em' colorScheme={info.getValue() ? 'red' : 'green'} padding='0 10px'>
      {trans(info.getValue() ? 'in_active' : 'active')}
    </Badge>
  ),
  noTooltip: true,
});
const deleteFlgText = columnHelper.accessor('deleteFlg', {
  header: trans('status_History'),
  cell: (info) => (
    <Badge ml='1' fontSize='0.8em' colorScheme={info.getValue() === 'ACTIVE' ? 'green' : 'red'} padding='0 10px'>
      {trans(info.getValue() === 'ACTIVE' ? 'active' : 'in_active')}
    </Badge>
  ),
  noTooltip: true,
});
const historyCreatedDatetime = columnHelper.accessor('createdDatetime', {
  header: trans('registrationDate'),
  // cell: (info) => formatDateJP(info.getValue()),
  cell: (info) => <>{convertToCurrentTime(info.getValue())}</>,
});
const historyCreatedUser = columnHelper.accessor('createdUser', {
  header: trans('registered_person'),
  cell: (info) => <>{info.getValue()}</>,
  haveCustomFilter: false,
  haveCustomSort: true,
});

const createdDatetimNoFeature = columnHelper.accessor('createdDatetime', {
  header: trans('created_Datetime_History'),
  cell: (info) => convertToCurrentTime(info.getValue()),
});
const updatedDatetimeNoFeature = columnHelper.accessor('updatedDatetime', {
  header: trans('updated_Datetime_History'),
  cell: (info) => convertToCurrentTime(info.getValue()),
});
const columnKeys = {
  // Department master table
  departmentId,
  departmentName,
  departmentLevel,
  establishmentDate,
  endDate,

  // Code master table
  codeListId,
  codeIdTable,
  codeListName,
  codeValue,
  codeName,
  codeNameEn,
  sortOrder,
  createdDatetime,
  createdUser,
  updatedDatetime,
  updatedUser,
  historyCreatedDatetime,
  historyCreatedUser,

  // historyTable
  codeIdHistory,
  codeNameHistory,
  codeNameEnHistory,
  createdUserHistory,
  createdDatetimeHistory,
  updatedUserHistory,
  updatedDatetimeHistory,
  statusHistory,
  sortOrderHistory,
  createdUserHistorySort,

  // Basic info
  employeeId,
  employeeName,

  deleteFlg,
  deleteFlgText,
  createdDatetimNoFeature,
  updatedDatetimeNoFeature,
};

export { columnKeys };
