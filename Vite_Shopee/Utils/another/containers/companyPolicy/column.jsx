import { createColumnHelper } from '@tanstack/react-table';
import { transOutHook } from 'dhm/contexts/TranslateContext';
import { formatDateJP } from 'dhm/utils/helpers/format';
import i18n from 'dhm/translate/index';

const isEng = i18n.language === 'en';

const columnHelper = createColumnHelper();

const trans = (value) => transOutHook(value, 'table');

const compPolicyClassCode = columnHelper.accessor('compPolicyClassCode', {
  header: trans('company_policy_classification_code'),
  cell: (info) => <>{info.getValue()}</>,
  typeFilter: 'text',
  haveCustomFilter: true,
  minSize: isEng ? 350 : 200,
});

const compPolicyClassName = columnHelper.accessor('compPolicyClassName', {
  header: trans('company_policy_classification_name'),
  cell: (info) => <>{info.getValue()}</>,
  typeFilter: 'text',
  haveCustomFilter: true,
  minSize: isEng ? 350 : 200,
});

const effectStartDate = columnHelper.accessor('effectStartDate', {
  header: trans('effective_start_date'),
  cell: (info) => formatDateJP(info.getValue()),
  typeFilter: 'date',
  haveCustomFilter: true,
  minSize: isEng ? 215 : 200,
});
const effectEndDate = columnHelper.accessor('effectEndDate', {
  header: trans('effective_completion_date'),
  typeFilter: 'date',
  cell: (info) => formatDateJP(info.getValue()),
  haveCustomFilter: true,
  minSize: isEng ? 265 : 200,
});

export const columnKeys = {
  compPolicyClassCode,
  compPolicyClassName,
  effectStartDate,
  effectEndDate,
};
