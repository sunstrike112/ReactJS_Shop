import { transOutHook } from 'dhm/contexts/TranslateContext';

const trans = (key) => transOutHook(key, 'message');
const t = (key, params) => transOutHook(key, 'validatorDefine', params);
const tKey = (key) => transOutHook(key, 'keyValidatorDefine');

const VALIDATOR = () => ({
  DHM_VAD_REQUIRED: trans('field_required'),
  DHM_VAD_MAX_LENGTH: trans('max_length_error'),
  DHM_VAD_MIN_LENGTH: trans('min_length_error'),
  DHM_VAD_MAX: trans('max_value_error'),
  DHM_VAD_MIN: trans('min_value_error'),
  DHM_VAD_EMAIL: trans('email_format_error'),
  DHM_VAD_PHONE: trans('phone_format_error'),
  DHM_VAD_RANGE: trans('range_error'),
  DHM_VAD_DATE_YYYY_MM_DD: trans('date_yyyy_mm_dd_error'),
  DHM_VAD_DATE_DD_MM_YYYY: trans('date_dd_mm_yyyy_error'),
  DHM_VAD_DATE_YYYY_MM: trans('date_yyyy_mm_error'),
  DHM_VAD_DATE_MM_YYYY: trans('date_mm_yyyy_error'),
  DHM_VAD_BANK: trans('bank_number_format_error'),
  DHM_VAD_NUMBER: trans('number_format_error'),
  DHM_VAD_TEXT: trans('text_format_error'),
  DHM_VAD_CONFIRM_PASSWORD: trans('confirm_password_error'),
  DHM_VAD_DATE_GREATER_THAN: trans('date_greater_than_error'),
  DHM_VAD_DATE_SMALLER_THAN: trans('date_smaller_than_error'),
  DHM_VAD_BREAK_TIME: trans('break_time_error'),
  DHM_VAD_SAME_TIME: trans('same_time_error'),
  DHM_VAD_DATE_GREATER_THAN_7_DAYS: trans('date_greater_than_7_days_error'),
  DHM_VAD_LEAST_CHARACTERS: trans('least_characters_error'),
  DHM_VAD_MAXIMUM_CHARACTERS: trans('maximum_characters_error'),
  DHM_VAD_FORMAT: trans('format_error'),
  DHM_VAD_BLANK_CHARACTERS: trans('blank_characters_error'),
  DHM_VAD_PASSWORD: trans('password_format_error'),
  DHM_VAD_DIGIT: trans('digit_format_error'),
  DHM_VAD_DHM_VAD_DATE_FUTURE: trans('future_date_error'),
  DHM_VAD_POSTAL_CODE: trans('postal_code_format_error'),
  DHM_VALIDATOR_ERROR: trans('validator_error'),
  DHM_VAD_FORMAT_NUMERIC: trans('vad_format_numeric'),
});

const COMMON_BUSINESS = () => ({
  // Error
  DHM_COM_E_LOGIN_ERROR: 'Invalid username or password.',
  DHM_COM_E_DELETE_NOT_AVAILABLE: '',
  DHM_COM_E_DHM_COM_S_NOT_EXIST: 'Data not found.',
  // DHM_COM_E_ALREADY_EXISTS: trans('email_already_exits'),
  DHM_COM_E_NO_DATA_CHANGE: 'No data change.',

  // Success
  DHM_COM_S_001: '',
  DHM_COM_S_002: '',
  DHM_COM_S_003: '',

  // Warning
  DHM_COM_W_001: 'Please select records.',
  DHM_COM_W_002: '',
  DHM_COM_W_003: '',

  // Info
  DHM_COM_I_001: '',
  DHM_COM_I_002: '',
  DHM_COM_I_003: '',
  DHM_COM_E_DHM_COM_S_INCORRECT_FORMAT_FILE: trans('s_incorrect_format_file'),
  DHM_COM_E_ACCESS_DENIED: trans('access_denied'),
});

const MASTER = () => ({
  // Error
  DHM_MST_E_RECORD_DUPLICATED: trans('e_record_duplicated'),
  DHM_MST_E_002: '',
  DHM_MST_E_003: '',
  DHM_MST_E_004: '',
  DHM_COM_E_DATA_CHANGED: trans('e_data_changed'),

  // Success
  DHM_MST_S_001: '',
  DHM_MST_S_002: '',

  // Warning
  DHM_MST_W_001: '',
  DHM_MST_W_002: '',

  // Info
  DHM_MST_I_001: '',
  DHM_MST_I_002: '',
});

const STAFF = () => ({
  // Error
  DHM_STA_E_001: '',
  DHM_STA_E_002: '',
  DHM_STA_E_003: '',
  DHM_STA_E_004: '',

  // Success
  DHM_STA_S_001: '',
  DHM_STA_S_002: '',

  // Warning
  DHM_STA_W_001: '',
  DHM_STA_W_002: '',

  // Info
  DHM_STA_I_001: '',
  DHM_STA_I_002: '',
});

const SUMMARY = () => ({
  // Error
  DHM_SUM_E_001: '',
  DHM_SUM_E_002: '',
  DHM_SUM_E_003: '',
  DHM_SUM_E_004: '',

  // Success
  DHM_SUM_S_001: '',
  DHM_STA_S_002: '',

  // Warning
  DHM_SUM_W_001: '',
  DHM_SUM_W_002: '',

  // Info
  DHM_SUM_I_001: '',
  DHM_SUM_I_002: '',
});

const MESS_SUCCESS = {
  LOGIN_SUCCESS: trans('login_success'),
  CREATED_SUCCESS: trans('created_success'),
  DELETED_SUCCESS: trans('deleted_success'),
  UPDATED_SUCCESS: trans('updated_success'),
  IMPORT_SUCCESS: trans('import_success'),
  EXPORT_SUCCESS: trans('export_success'),
  UPLOAD_SUCCESS: trans('upload_success'),
  SEND_MAIL_SUCCESS: trans('send_mail_success'),
  RESET_PASSWORD_SUCCESS: trans('reset_password_success'),
  CHANGE_PASSWORD_SUCCESS: trans('change_password_success'),
  INVITE_SUCCESS: trans('invite_success'),
};

const MESS_ERROR = {
  BASIC_INFO: {
    joiningPath: '入社経路の（選択・記述）は同時に記入してください。',
    joiningCompanyReason: t('required', { fieldName: tKey('joiningCompanyReason') }),
    can: t('required', { fieldName: tKey('can') }),
    will: t('required', { fieldName: tKey('will') }),
    canLength: t('max_length', { maxLength: '300' }),
    willLength: t('max_length', { maxLength: '300' }),
    joiningCompanyReasonLength: t('max_length', { maxLength: '300' }),
    retirementDate: t('required', { fieldName: tKey('retirementDate') }),
    retirement: '退職を選択する必要があります',
  },
  OVERVIEW_INFO: {
    status: trans('status'),
    whatTodo: t('required', { fieldName: tKey('whatToDo') }),
    whenEnd: t('required', { fieldName: tKey('whenEnd') }),
  },
  POLICY_PROGRESS: {
    status: trans('statusTRisk'),
    tobe_required: trans('tobe_required'),
  },
  INTERVIEW_LOG: {
    nextDate: trans('nextDate'),
  },
};

export { VALIDATOR, COMMON_BUSINESS, MASTER, STAFF, SUMMARY, MESS_SUCCESS, MESS_ERROR };
