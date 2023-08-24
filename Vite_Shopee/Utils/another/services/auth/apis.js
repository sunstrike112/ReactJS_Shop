import axiosInstance from 'dhm/apis/index';
import showToast from 'dhm/components/Toast';
import { TOAST_STATUS } from 'dhm/components/Toast/dataToast';
import { TYPE_NOT_TOAST } from 'dhm/utils/constants/type';
import { verifyDataPost } from 'dhm/utils/helpers/format';
import { ListMessError, ListMessSuccess } from 'dhm/utils/index';
import PropTypes from 'prop-types';

const listErrCSV = [
  'DHM_MST_E_RECORD_IMPORT_RUNNING',
  'DHM_COM_E_DHM_COM_S_NOT_EXIST',
  'DHM_MST_E_RECORD_DUPLICATED_CODE_VALUE',
  'DHM_COM_E_DHM_COM_S_INCORRECT_NAME_FILE',
  'DHM_COM_E_DHM_COM_S_LIMIT',
  'DHM_COM_E_DHM_COM_S_IMPORT_FILE_FAIL',
  'DHM_COM_E_DHM_COM_S_HEADER_IS_INVALID',
  'DHM_COM_E_DHM_COM_S_INCORRECT_FORMAT_FILE',
  'DHM_ERROR_PARSE_CSV',
  'DHM_COM_E_ACTION_REQUIRED',
  'DHM_INTER_LOG_E_DATE_INVALID',
  'DHM_INTER_LOG_E_NEXT_DATE_INVALID',
  'DHM_INTER_LOG_E_DATE_DUPLICATED',
  'DHM_PRO_INFO_E_ASSIGN_EMP_PRO_DUPLICATED',
  'DHM_OVERTIME_LIMIT_MINUTE',
  'DHM_VAD_LIMIT',
  'DHM_VAD_FORMAT',
  'DHM_OVERTIME_LIMIT_OT_NOT_FOUND',
  'DHM_COM_E_DHM_COM_S_HEADER_IS_EMPTY',
  'undefine',
  'DHM_COM_E_DHM_COM_S_TYPE_FIELD_IS_INVALID',
  'DHM_COM_E_DHM_COM_S_FORMAT_ROW_DATA_IS_INVALID',
  'DHM_COM_E_DHM_COM_S_FORMAT_DATA_IS_INVALID',
  'DHM_COM_E_INCORRECT_FORMAT_FILE_NAME',
  'DHM_COM_E_UPLOAD',
  'DHM_COM_E_FILE_NOT_FOUND',
  'DHM_COM_E_EMPLOYEE_NOT_FOUND',
  'DHM_WORKFLOW_APPLY_EXIST',
  'DHM_COM_E_DHM_COM_S_RECORD_LIMIT',
  'DHM_COM_E_ALREADY_EXISTS',
  'DHM_COM_E_ACCOUNT_NOT_ACTIVE',
  // Special case
  'DHM_WORKFLOW_ASSIGNED',
];

const TYPE_CONFIRM = ['confirm', 'confirm/overtime-setting'];

const methods = {
  get: (url) => axiosInstance.get(url),
  post: (url, data) => axiosInstance.post(url, data),
  postArray: (url, data) => axiosInstance.post(url, data.data),
  postForm: (url, data) =>
    axiosInstance.post(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
  putForm: (url, data) =>
    axiosInstance.put(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
  put: (url, data) => axiosInstance.put(url, data),
  delete: (url, data) =>
    axiosInstance.delete(url, {
      data,
    }),
  postFile: (url, file, key = 'file') => {
    const formData = new FormData();
    formData.append(key, file);
    return axiosInstance.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  postMultiFile: (url, files) => {
    const formData = new FormData();
    /** 
     * files = {"basic_info": {},
    "basic_info_his": null,
    "": null}
     */
    Object.keys(files).forEach((key) => {
      if (files[key]) {
        formData.append(key, files[key]);
      }
    });
    return axiosInstance.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

const callApi = async ({
  method,
  data,
  url,
  type = '',
  onRequest = () => {},
  onSuccess = () => {},
  onFailed = () => {},
  onFinally = () => {},
  textSuccess = '',
  noVerifyPost = false,
  keyPostfile,
}) => {
  onRequest();
  try {
    const response = await methods[method](
      url,
      method === 'delete' ||
        method === 'postFile' ||
        method === 'postMultiFile' ||
        method === 'postForm' ||
        method === 'putForm' ||
        noVerifyPost
        ? data
        : verifyDataPost(data),
      keyPostfile,
    );
    if (!TYPE_CONFIRM.includes(response?.type)) {
      onSuccess(response);
      // eslint-disable-next-line no-unused-expressions
      textSuccess && showToast(ListMessSuccess[textSuccess] || 'Success', TOAST_STATUS.success);
    }
    return response;
  } catch (error) {
    if (error.code === 'ERR_NETWORK') {
      showToast('Network error', TOAST_STATUS.error);
      throw new Error('Network error');
    }
    const dataError = error.response.data;
    onFailed(dataError);
    if (
      type !== TYPE_NOT_TOAST.GET_OVERVIEWINFO &&
      dataError?.errors[0].code !== 'DHM_OVERTIME_CONFIRM' &&
      dataError?.errors[0].code !== 'DHM_OVERTIME_LIMIT_OT_NOT_FOUND'
    ) {
      // eslint-disable-next-line no-unused-expressions
      listErrCSV.includes(dataError?.errors[0]?.code)
        ? showToast(dataError?.errors[0]?.message, TOAST_STATUS.error)
        : showToast(ListMessError[dataError?.errors[0].code] || dataError?.errors[0].code, TOAST_STATUS.error);
    }
    const codeError = dataError?.errors[0]?.code;

    if (codeError === '401' || codeError === '401 UNAUTHORIZED') {
      localStorage.clear();
      window.location.href = '/login';
    }
    if (dataError?.errors[0].code === 'DHM_COM_E_ACCESS_DENIED') {
      // setTimeout(() => {
      //   window.location.reload();
      // }, 1500);
    }
    if (
      dataError?.errors[0].code === 'DHM_OVERTIME_CONFIRM' ||
      dataError?.errors[0].code === 'DHM_OVERTIME_LIMIT_OT_NOT_FOUND'
    )
      return dataError?.errors[0];
    throw new Error(dataError.message || 'Unknown error occurred');
  } finally {
    onFinally();
  }
};

callApi.propTypes = {
  method: PropTypes.oneOf(['get', 'post', 'put', 'delete', 'postFile', 'postMultiFile', 'postArray', 'putForm'])
    .isRequired,
  url: PropTypes.string.isRequired,
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.instanceOf(FormData)]),
  onRequest: PropTypes.func,
  onSuccess: PropTypes.func,
  onFailed: PropTypes.func,
  onFinally: PropTypes.func,
  textSuccess: PropTypes.string,
};

export { callApi };
