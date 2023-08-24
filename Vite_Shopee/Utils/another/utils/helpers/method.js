/* eslint-disable no-useless-escape */
import moment from 'moment';
import { WF_STATUS } from '../constants/select';

const handleDownloadFile = ({ response, fileName = 'dirbato.csv' }) => {
  const now = moment();
  const formattedTimestamp = now.format('YYYYMMDD_HHmmss');
  const element = document.createElement('a');
  const name = `${fileName}_${formattedTimestamp}.csv`;
  const file = new Blob([response], { type: 'text/csv' });
  element.href = URL.createObjectURL(file);
  element.download = name;
  document.body.appendChild(element);
  element.click();
};

const handleUploadFile = ({ handleFileSelect, handleError = () => {} }) => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.csv';

  let previousFileContent = '';

  input.addEventListener('change', () => {
    const file = input.files[0];
    if (file) {
      if (file.type !== 'text/csv') {
        const error = new Error('Invalid file format. Please select a CSV file.');
        handleError(error);
        return;
      }

      const reader = new FileReader();

      reader.onload = () => {
        const fileContent = reader.result;
        if (fileContent === previousFileContent) {
          const error = new Error('File content has not changed. Please select a different file.');
          handleError(error);
          return;
        }

        previousFileContent = fileContent;
        handleFileSelect(file);
      };

      reader.readAsText(file);
    } else {
      const error = new Error('No file selected.');
      handleError(error);
    }
  });

  input.addEventListener('error', () => {
    const error = new Error('File upload error.');
    handleError(error);
  });

  input.click();
};

const typeOf = (value) => Object.prototype.toString.call(value).slice(8, -1);

const addCommasCurrency = (str) => {
  const regex = /\B(?=(\d{3})+(?!\d))/g;
  return `${str}`.replace(regex, ',');
};

const addColonIntoString = (str) => {
  if (str.length < 2) {
    return str;
  }
  const lastIndex = str.length - 2;
  const modifiedStr = `${str.slice(0, lastIndex)}:${str.slice(lastIndex)}`;
  return modifiedStr;
};

const formatArray = (inputArray = Array.from(Array(100), (_, index) => index + 1)) =>
  inputArray.map((_, index) => `react-select-${index + 1}-option-2`);

const extractEmployeeId = (filename, prefix) => {
  const escapedPrefix = prefix.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
  const regex = new RegExp(`${escapedPrefix}([^./]+)(?:[ _-]\\w+)?\\.[^.]+$`);
  const match = filename.match(regex);
  if (match && match.length >= 2) {
    let employeeId = match[1];
    if (match[1].includes('_')) employeeId = match[1].slice(0, match[1].indexOf('_'));
    return employeeId;
  }

  return null;
};

const clearFileInput = (ctrl) => {
  try {
    ctrl.value = null;
  } catch (ex) {
    /* empty */
  }
  if (ctrl.value) {
    ctrl.parentNode.replaceChild(ctrl.cloneNode(true), ctrl);
  }
};

const replaceElementsInArray = (arrayA, arrayB) => {
  const mapA = new Map();
  arrayA.forEach((item) => mapA.set(item.matterNo, item));
  const updatedArrayB = arrayB.map((item) => {
    const { matterNo } = item;
    if (mapA.has(matterNo)) {
      return mapA.get(matterNo);
    }
    return item;
  });
  return updatedArrayB;
};

const hasOnlyOneTrueValue = (obj) => {
  const trueKeys = Object.keys(obj).filter((key) => obj[key] === true);
  if (trueKeys.length !== 1) {
    return false;
  }
  return true;
};

const isValidEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

const isShowButton = (userName, status, applicantName, approverRequestName, agentRequestName) => {
  switch (status) {
    case WF_STATUS.APPLYING:
      if (userName === applicantName && userName !== approverRequestName && userName !== agentRequestName)
        return {
          edit: false,
          approved: false,
          reject: false,
        };
      if (userName !== applicantName && userName === approverRequestName && userName !== agentRequestName)
        return {
          edit: true,
          approved: true,
          reject: true,
        };
      if (userName !== applicantName && userName !== approverRequestName && userName === agentRequestName)
        return {
          edit: true,
          approved: true,
          reject: true,
        };
      break;
    case WF_STATUS.APPROVAL || WF_STATUS.CANCEL:
      return {
        edit: false,
        approved: false,
        reject: false,
      };
    case WF_STATUS.CANCEL:
      return {
        edit: false,
        approved: false,
        reject: false,
      };
    default:
      if (userName === applicantName && userName !== approverRequestName && userName !== agentRequestName)
        return {
          edit: false,
          approved: false,
          reject: false,
        };
      if (userName !== applicantName && userName === approverRequestName && userName !== agentRequestName)
        return {
          edit: true,
          approved: true,
          reject: false,
        };
      if (userName !== applicantName && userName !== approverRequestName && userName === agentRequestName)
        return {
          edit: true,
          approved: true,
          reject: false,
        };
      break;
  }
  return {
    edit: true,
    approved: true,
    reject: true,
  };
};

export {
  handleDownloadFile,
  typeOf,
  addCommasCurrency,
  formatArray,
  addColonIntoString,
  handleUploadFile,
  extractEmployeeId,
  clearFileInput,
  replaceElementsInArray,
  hasOnlyOneTrueValue,
  isValidEmail,
  isShowButton,
};
