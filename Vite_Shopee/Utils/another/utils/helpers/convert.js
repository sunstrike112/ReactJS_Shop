/* eslint-disable no-restricted-syntax */

import moment from 'moment-timezone';

const INPUT_FORMAT = 'YYYY-MM-DD HH:mm:ss';
const OUTPUT_FORMAT = 'YYYY-MM-DD HH:mm:ss';
const TIMEZONE = moment.tz.guess();

function convertErrorsCsv(original) {
  const groupedByLine = original.errorsCsv.reduce((acc, error) => {
    if (!acc[error.line]) {
      acc[error.line] = {
        line: error.line,
        codes: [],
        messages: [],
      };
    }
    acc[error.line].codes.push(error.code);
    acc[error.line].messages.push(error.message);
    return acc;
  }, {});

  return Object.values(groupedByLine);
}

function convertToInputFormatEmployeeSuccess(obj, listKey) {
  const result = {};

  for (const mapping of listKey) {
    const { id } = mapping;
    const hopeKey = mapping.hope;
    const currentKey = mapping.current;

    const hopeValue = obj[hopeKey];
    const currentValue = obj[currentKey];

    result[id] = {
      0: hopeValue,
      1: currentValue,
    };
  }

  return result;
}

function convertToCurrentTime(dateTimeString, inputFormat = INPUT_FORMAT, outputFormat = OUTPUT_FORMAT) {
  const inputDateTime = moment.utc(dateTimeString, inputFormat).tz(TIMEZONE);
  const formattedDateTime = inputDateTime.format(outputFormat);
  return formattedDateTime;
}
function revertTimeUTC(dateTimeString, inputFormat = OUTPUT_FORMAT, outputFormat = INPUT_FORMAT) {
  const inputDateTime = moment(dateTimeString, inputFormat).utc().format(outputFormat);
  return inputDateTime;
}
export { convertErrorsCsv, convertToInputFormatEmployeeSuccess, convertToCurrentTime, revertTimeUTC };
