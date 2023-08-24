/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unreachable-loop */
/* eslint-disable consistent-return */
import { LocalStore } from 'dhm/utils/helpers/local';

const { get } = LocalStore;
const ERROR_CODE_BE = {};

const API_ERROR = 2;
const MAX_TOAST = 1;
const toastList = new Set();

class ApiError extends Error {
  constructor(message, error, type) {
    super(message);
    this.errors = error;
    this.type = type;
  }
}

function logError(error) {
  if (error instanceof ApiError) {
    if (get('notice') !== 'auth-401') {
      if (toastList.size < MAX_TOAST) {
        console.log(error.errors);
      }
    }
  }
  toastList.add(error);
  throw error;
}

/**
 * Error: {name, code, message}
 * @param response
 * @returns {{ok}|*}
 */
async function validateResponse(response) {
  if (!response.ok) {
    let error = {};
    const type = API_ERROR;
    const err = await response.json();
    const errAddLesson = [];

    switch (response.status) {
      case 400:
      case 417:
        if (ERROR_CODE_BE[err.message]) {
          error = {
            messageId: ERROR_CODE_BE[err.message].code,
            message: ERROR_CODE_BE[err.message].message,
          };
        } else {
          error = {
            messageId: err.message,
            message: err.message,
          };
        }
        break;
      case 500:
        if (err.error === 'Internal Server Error') {
          error = {
            messageId: ERROR_CODE_BE.INTERNAL_SERVER_ERROR.code,
            message: ERROR_CODE_BE.INTERNAL_SERVER_ERROR.message,
          };
        } else {
          error = {
            messageId: ERROR_CODE_BE[err.message].code,
            message: ERROR_CODE_BE[err.message].message,
          };
        }
        break;
      default:
        if (ERROR_CODE_BE[err.message]) {
          const checkErrAddLesson = () => {
            for (const mess of errAddLesson) {
              if (mess === err.message && err.data[0].data) {
                return true;
              }
              return false;
            }
          };
          error = {
            messageId: ERROR_CODE_BE[err.message].code,
            message: `${ERROR_CODE_BE[err.message].message}\n
            ${checkErrAddLesson() && err.data[0].data}`,
          };
        } else {
          error = {
            messageId: err.message,
            message: err.message,
          };
        }
        break;
    }
    if (error && type !== 1) {
      throw new ApiError(response.statusText, error, type);
    } else {
      throw Error(error.message);
    }
  }
  return response;
}

function readResponseAsJSON(response) {
  return response.json();
}

function getAuthHeader() {
  const token = get('access_token');
  return {
    Authorization: `Bearer ${encodeURIComponent(token)}`,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
}

export async function fetchJSON(pathToResource) {
  try {
    const response = await fetch(pathToResource, { headers: getAuthHeader() });
    const response_1 = await validateResponse(response);
    return readResponseAsJSON(response_1);
  } catch (error) {
    return logError(error);
  }
}

export async function postJSON(pathToResource, body) {
  try {
    const response = await fetch(pathToResource, {
      method: 'POST',
      headers: getAuthHeader(),
      body: JSON.stringify(body),
    });
    const response_1 = await validateResponse(response);
    return readResponseAsJSON(response_1);
  } catch (error) {
    return logError(error);
  }
}

function getAuthHeaderImport() {
  const token = get('access_token');
  return {
    Authorization: `Bearer ${encodeURIComponent(token)}`,
  };
}

export async function postImportJSON(pathToResource, body) {
  try {
    const response = await fetch(pathToResource, {
      method: 'POST',
      headers: getAuthHeaderImport(),
      body,
    });
    const response_1 = await validateResponse(response);
    return response_1;
  } catch (error) {
    return logError(error);
  }
}

export async function putJSON(pathToResource, body) {
  try {
    const response = await fetch(pathToResource, {
      method: 'PUT',
      headers: getAuthHeader(),
      body: JSON.stringify(body),
    });
    const response_1 = await validateResponse(response);
    return readResponseAsJSON(response_1);
  } catch (error) {
    return logError(error);
  }
}

export async function deleteRequest(pathToResource) {
  try {
    const response = await fetch(pathToResource, {
      method: 'DELETE',
      headers: getAuthHeader(),
    });
    const response_1 = await validateResponse(response);
    return readResponseAsJSON(response_1);
  } catch (error) {
    return logError(error);
  }
}

export async function removeMulti(pathToResource, body) {
  try {
    const response = await fetch(pathToResource, {
      method: 'DELETE',
      headers: getAuthHeader(),
      body: JSON.stringify(body),
    });
    const response_1 = await validateResponse(response);
    return readResponseAsJSON(response_1);
  } catch (error) {
    return logError(error);
  }
}

export async function putImportJSON(pathToResource, body) {
  try {
    const response = await fetch(pathToResource, {
      method: 'PUT',
      headers: getAuthHeaderImport(),
      body,
    });
    const response_1 = await validateResponse(response);
    return readResponseAsJSON(response_1);
  } catch (error) {
    return logError(error);
  }
}
