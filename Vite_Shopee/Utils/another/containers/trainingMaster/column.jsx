import { createColumnHelper } from '@tanstack/react-table';
import { transOutHook } from 'dhm/contexts/TranslateContext';
import { formatDateJP } from 'dhm/utils/helpers/format';
import i18n from 'dhm/translate/index';

const isEng = i18n.language === 'en';
const columnHelper = createColumnHelper();

const trans = (value) => transOutHook(value, 'table');

const trainingCode = columnHelper.accessor('trainingCode', {
  header: trans('training_code'),
  cell: (info) => <>{info.getValue()}</>,
  typeFilter: 'text',
  haveCustomFilter: true,
});

const trainingType = columnHelper.accessor('trainingType', {
  header: trans('training_type'),
  cell: (info) => <>{info.getValue()}</>,
  typeFilter: 'text',
  haveCustomFilter: true,
});

const trainingName = columnHelper.accessor('trainingName', {
  header: trans('training_name'),
  cell: (info) => <>{info.getValue()}</>,
  typeFilter: 'text',
  haveCustomFilter: true,
});

const effectStartDate = columnHelper.accessor('effectStartDate', {
  header: trans('effective_start_date'),
  cell: (info) => formatDateJP(info.getValue()),
  typeFilter: 'date',
  haveCustomFilter: true,
  minSize: isEng ? 215 : 200,
});
const effectEndDate = columnHelper.accessor('effectEndDate', {
  header: trans('expiration_date'),
  typeFilter: 'date',
  cell: (info) => formatDateJP(info.getValue()),
  haveCustomFilter: true,
});

export const columnKeys = {
  trainingCode,
  trainingType,
  trainingName,
  effectStartDate,
  effectEndDate,
};
