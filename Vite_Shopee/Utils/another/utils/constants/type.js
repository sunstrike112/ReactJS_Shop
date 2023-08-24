import { currentLanguage } from 'dhm/contexts/TranslateContext';
import { COLORS } from './style';

const COLORS_TYPE = {
  master: COLORS.master_primary,
  normal: COLORS.prime_shade_8,
  info: COLORS.info,
  default: COLORS.white,
  card: COLORS.prime_shade_5,
  other: COLORS.primary_25,
  gradient: COLORS.brand_1,
};

const STATUS = {
  NO_CONCERN: '青',
  LOW_URGENT: '黄',
  HIGH_URGENT: '赤',
};

const STATUS_EMPLOYEE = {
  [STATUS.NO_CONCERN]: COLORS.noConcern,
  [STATUS.LOW_URGENT]: COLORS.lowUrgent,
  [STATUS.HIGH_URGENT]: COLORS.highUrgent,
};

const STATUS_SVG = {
  [STATUS.NO_CONCERN]: 'NO_CONCERN',
  [STATUS.LOW_URGENT]: 'LOW_URGENT',
  [STATUS.HIGH_URGENT]: 'HIGH_URGENT',
};

const TYPE_NOT_TOAST = {
  GET_OVERVIEWINFO: 'getOverviewInfo',
};

const FILE_UPLOAD_JP = {
  EMPLOYEE_PIC: '社員PIC',
  EMPLOYEE_PIC_PREFIX: '社員PIC_',
  RESUME: '履歴書',
  RESUME_PREFIX: '履歴書_',
  WORK_HISTORY: '職歴書',
  WORK_HISTORY_PREFIX: '職歴書_',
  JPG_FILE: '.jpg',
  PDF_FILE: '.pdf',
};

const MODE_UPLOAD = {
  ALL: 'all',
  INDIVIDUAL: 'individual',
};

const TYPE_FILE_UPLOAD = {
  EMPLOYEE_PIC: 'employeePic',
  RESUME: 'resume',
  WORK_HISTORY: 'workHistory',
};

const TYPE_RETIREMENT = {
  ENROLLED: {
    CODE: '01',
    NAME: currentLanguage('jp') ? '在籍​' : 'enrolled',
    NAME_EN: 'enrolled',
  },
  RETIREMENT: {
    CODE: '02',
    NAME: currentLanguage('jp') ? '退職' : 'retirement',
    NAME_JP: '退職',
  },
};

export {
  COLORS_TYPE,
  STATUS,
  STATUS_EMPLOYEE,
  STATUS_SVG,
  TYPE_NOT_TOAST,
  FILE_UPLOAD_JP,
  MODE_UPLOAD,
  TYPE_FILE_UPLOAD,
  TYPE_RETIREMENT,
};
