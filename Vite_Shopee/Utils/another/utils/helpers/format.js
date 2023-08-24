const formatDateJP = (data, type = 'full') => {
  const today = new Date(data);
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const hour = String(today.getHours()).padStart(2, '0');
  const minute = String(today.getMinutes()).padStart(2, '0');
  const second = String(today.getSeconds()).padStart(2, '0');
  const formattedDate = `${year}/${month}/${day}`;
  const formattedMonth = `${year}/${month}`;
  const formattedFullTime = `${year}/${month}/${day} ${hour}:${minute}:${second}`;

  const chooseType = {
    full: formattedDate,
    month: formattedMonth,
    fulltime: formattedFullTime,
  };
  return data ? chooseType[type] : null;
};
const formatDateISO = (data) => new Date(data).toISOString().split('T')[0];
const verifyParams = (params) => {
  if (!params || typeof params !== 'object') {
    throw new Error('Params must be a non-null object');
  }
  const paramParts = Object.entries(params).reduce((parts, [key, value]) => {
    if (value !== null && value !== '') {
      const encodedKey = encodeURIComponent(key);
      const encodedValue = encodeURIComponent(value);
      parts.push(`${encodedKey}=${encodedValue}`);
    }
    return parts;
  }, []);
  const paramString = paramParts.length > 0 ? `?${paramParts.join('&')}` : '';
  return paramString;
};

const verifyObject = (obj) => {
  if (!obj || typeof obj !== 'object') {
    throw new Error('Params must be a non-null object');
  }
  const paramParts = Object.entries(obj).reduce((parts, [key, value]) => {
    if (value !== null && value !== '' && value !== undefined) {
      parts[key] = value;
    }
    return parts;
  }, {});
  return paramParts;
};

function removeFirstParentKey(obj) {
  const keys = Object.keys(obj);
  const newObj = {};
  keys.forEach((key) => {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      const childKeys = Object.keys(obj[key]);
      if (childKeys.length === 0) {
        newObj[childKeys[0]] = obj[key][childKeys[0]];
      } else {
        newObj[key] = obj[key];
      }
    } else {
      newObj[key] = obj[key];
    }
  });
  return newObj;
}
function deleteKey(obj, keyToDelete) {
  const newObj = {};
  // eslint-disable-next-line no-restricted-syntax, prefer-const
  for (let key in obj) {
    if (key !== keyToDelete) {
      newObj[key] = obj[key];
    }
  }
  return newObj;
}

const verifyDataPost = (obj) => {
  const newObj = {};
  // eslint-disable-next-line no-restricted-syntax, prefer-const
  for (let key in obj) {
    if (obj[key] !== '' && obj[key] !== null && obj[key] !== undefined && !Number.isNaN(obj[key])) {
      newObj[key] = obj[key];
    }
  }
  return newObj;
};

const formatEmptyContent = (content) => content.replace(/ /g, '&nbsp;');

const formatYearForDatepicker = (yyyy) => new Date(yyyy, 11, 31, 17, 0, 0).toISOString();

function formatTrimMultiKeyword(data) {
  data = data.trim();
  let values = data.split(/,|、/);
  values = values.map((value) => value.trim()).filter((value) => value !== '');
  const result = values.join(',');

  return result;
}
export {
  formatDateJP,
  verifyParams,
  formatDateISO,
  verifyObject,
  removeFirstParentKey,
  deleteKey,
  verifyDataPost,
  formatEmptyContent,
  formatYearForDatepicker,
  formatTrimMultiKeyword,
};
