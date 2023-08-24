import { createColumnHelper } from '@tanstack/react-table';
import { transOutHook } from 'dhm/contexts/TranslateContext';
import { formatDateJP } from 'dhm/utils/helpers/format';
import i18n from 'dhm/translate/index';
import { convertToCurrentTime } from 'dhm/utils/helpers/convert';

const isEng = i18n.language === 'en';

const columnHelper = createColumnHelper();

const trans = (value) => transOutHook(value, 'table');

const compPolicyClassCode = columnHelper.accessor('compPolicyClassCode', {
  header: trans('company_policy_classification_code'),
  cell: (info) => <>{info.getValue()}</>,
  typeFilter: 'text',
  haveCustomFilter: false,
  minSize: isEng ? 355 : 200,
});

const compPolicyClassName = columnHelper.accessor('compPolicyClassName', {
  header: trans('company_policy_classification_name'),
  cell: (info) => <>{info.getValue()}</>,
  typeFilter: 'text',
  haveCustomFilter: false,
  minSize: isEng ? 350 : 200,
});

const effectStartDate = columnHelper.accessor('effectStartDate', {
  header: trans('effective_start_date'),
  cell: (info) => formatDateJP(info.getValue()),
  typeFilter: 'date',
  haveCustomFilter: false,
  minSize: isEng ? 215 : 200,
});
const effectEndDate = columnHelper.accessor('effectEndDate', {
  header: trans('expiration_date'),
  typeFilter: 'date',
  cell: (info) => formatDateJP(info.getValue()),
  haveCustomFilter: false,
});

const updatedDatetime = columnHelper.accessor('updatedDatetime', {
  header: trans('updated_date_and_time'),
  cell: (info) => formatDateJP(convertToCurrentTime(info.getValue()), 'fulltime'),
  typeFilter: 'text',
  haveCustomFilter: false,
  minSize: isEng ? 250 : 200,
});

const updatedUser = columnHelper.accessor('updatedUser', {
  header: trans('changer'),
  cell: (info) => <>{info.getValue()}</>,
  typeFilter: 'text',
  haveCustomFilter: false,
});

const status = columnHelper.accessor('deleteFlg', {
  header: trans('status'),
  cell: (info) => <>{trans(info.getValue() === 'ACTIVE' ? 'valid' : 'invalid')}</>,
  typeFilter: 'text',
  haveCustomFilter: false,
});

export const columnKeys = {
  compPolicyClassCode,
  compPolicyClassName,
  effectStartDate,
  effectEndDate,
  updatedDatetime,
  updatedUser,
  status,
};
