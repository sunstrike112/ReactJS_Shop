/* eslint-disable no-restricted-syntax */
import i18n from 'dhm/translate/index';
import {
  nameColumnEn,
  nameColumnsJP,
  nameColumnSub2JP,
  nameColumnSub2En,
  CHANGE_KEYS_FILTER,
  KEY_FILTER_LV2,
  KEY_CHECKED_LV3,
  KEY_FIlTER_LV1,
  nameColumnSub3En,
  nameColumnSub3Jp,
} from './config';

const isEng = i18n.language === 'en';

function convertData(data) {
  return data.map((table) => {
    const tableObj = {
      value: table.tableName,
      label: isEng ? nameColumnEn[table.tableName] : nameColumnsJP[table.tableName],
      children: table.columns.map((column) => {
        const uniqueValues = new Set();
        const children = column.data.reduce((acc, item) => {
          const value = `${column.columnName}${KEY_FILTER_LV2}:${item}`;
          if (!uniqueValues.has(value)) {
            uniqueValues.add(value);
            acc.push({
              value,
              label: item,
            });
          }
          return acc;
        }, []);

        const columnObj = {
          value: column.columnName,
          label: isEng ? nameColumnSub2En[column.columnName] : nameColumnSub2JP[column.columnName],
          children,
        };

        if (children.length === 0) {
          // columnObj.showCheckbox = false;
          columnObj.className = 'disabled_collapse_treeview';
        }
        return columnObj;
      }),
    };
    return tableObj;
  });
}

const renderNewListData = (list = [], filter = []) => {
  const newData = [];

  list.forEach((item) => {
    const newItem = { ...item };

    if (newItem.children) {
      newItem.children = renderNewListData(newItem.children, filter);
    }

    if (filter && (filter.includes(newItem.value) || (newItem.children && newItem.children.length > 0))) {
      newData.push(newItem);
    }
  });

  return newData;
};

function handleDataPayloadChecked(params) {
  const result = params.reduce((acc, item) => {
    const [key, value] = item.split(KEY_FIlTER_LV1)[1].split(KEY_FILTER_LV2);
    acc[key] = acc[key] || [];
    acc[key].push(value);
    return acc;
  }, {});
  return result;
}

const getAllValues = (data) => {
  const values = [];

  const traverse = (node) => {
    if (node.children) {
      node.children.forEach((child) => {
        if (child.value.includes(KEY_FILTER_LV2)) {
          values.push(child.value);
        }
        traverse(child);
      });
    }
  };

  data.forEach((item) => {
    traverse(item);
  });

  return values;
};

const verifyCombineArray = (parentArray, filterArray) => {
  const result = [];

  for (const filterItem of filterArray) {
    if (parentArray.includes(filterItem)) {
      result.push(filterItem);
    }
  }

  return result;
};
function combineArraysRC(listA, listB) {
  return listA.filter((element) => listB.includes(element));
}

function getLevel2Length(arr) {
  const result = {};

  arr.forEach((item) => {
    if (item.children && Array.isArray(item.children)) {
      item.children.forEach((child) => {
        if (child.value && Array.isArray(child.children)) {
          result[child.value] = child.children.length;
        }
      });
    }
  });

  return result;
}

function countKeyOccurrences(arr) {
  const result = {};

  arr.forEach((item) => {
    const key = item.split(KEY_FILTER_LV2)[0].split(KEY_FIlTER_LV1)[1];
    if (result[key]) {
      result[key] += 1;
    } else {
      result[key] = 1;
    }
  });
  return result;
}
const compareObjectsFilter = (obj1, obj2) => {
  const result = {};
  // Iterate over keys in obj1
  for (const key in obj1) {
    if (Reflect.has(obj1, key)) {
      result[key] = key in obj2 ? obj1[key] === obj2[key] : false;
    }
  }

  // Iterate over keys in obj2
  for (const key in obj2) {
    if (Reflect.has(obj2, key) && !(key in obj1)) {
      result[key] = false;
    }
  }

  return result;
};
const handleChangeParams = (obj) => {
  const converted_obj = {};

  for (const key in obj) {
    if (Reflect.has(obj, key)) {
      if (Reflect.has(CHANGE_KEYS_FILTER, key)) {
        converted_obj[CHANGE_KEYS_FILTER[key]] = obj[key];
      } else {
        converted_obj[key] = obj[key];
      }
    }
  }

  return converted_obj;
};
function verifyParams(obj1, obj2) {
  const result = {};

  for (const key in obj1) {
    if (Object.hasOwnProperty.call(obj1, key) && obj1[key] === false && Object.hasOwnProperty.call(obj2, key)) {
      result[key] = obj2[key];
    }
  }

  return result;
}

// Filter RC-Tree
function convertDataRC(data) {
  return data.map((table) => {
    const tableObj = {
      key: table.tableName,
      title: isEng ? nameColumnEn[table.tableName] : nameColumnsJP[table.tableName],
      children: table.columns.map((column) => {
        const uniqueValues = new Set();
        const children = (column.data || []).reduce((acc, item) => {
          const key = `${table.tableName}${KEY_FIlTER_LV1}${column.columnName}${KEY_FILTER_LV2}${item}`;
          if (!uniqueValues.has(key)) {
            uniqueValues.add(key);
            const chooseeTitle = isEng
              ? nameColumnSub3En[`${column.columnName}${KEY_FILTER_LV2}${item}`]
              : nameColumnSub3Jp[`${column.columnName}${KEY_FILTER_LV2}${item}`];
            const chooseeTitleWithValue = isEng ? nameColumnSub3En[item] : nameColumnSub3Jp[item];
            acc.push({
              key,
              title: chooseeTitle || chooseeTitleWithValue || item,
            });
          }
          return acc;
        }, []);

        const columnObj = {
          key: column.columnName,
          title: isEng ? nameColumnSub2En[column.columnName] : nameColumnSub2JP[column.columnName],
          children,
        };

        return columnObj;
      }),
    };
    return tableObj;
  });
}
function revertDataRC(arr) {
  const result = [];

  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    const [keyStr, valueStr] = item.split(KEY_FIlTER_LV1);
    const [key] = keyStr.split(KEY_FILTER_LV2);
    const [childKey, childTitle] = valueStr.split(KEY_FILTER_LV2);

    let existingItem = result.find((obj) => obj.key === key);

    if (!existingItem) {
      existingItem = {
        key,
        title: isEng ? nameColumnEn[key] : nameColumnsJP[key],
        children: [],
      };
      result.push(existingItem);
    }

    let childItem = existingItem.children.find((obj) => obj.key === childKey);

    if (!childItem) {
      childItem = {
        key: childKey,
        title: isEng ? nameColumnSub2En[childKey] : nameColumnSub2JP[childKey],
        children: [],
      };
      existingItem.children.push(childItem);
    }
    const chooseeTitle = isEng
      ? nameColumnSub3En[`${childKey}${KEY_FILTER_LV2}${childTitle}`]
      : nameColumnSub3Jp[`${childKey}${KEY_FILTER_LV2}${childTitle}`];
    const chooseeTitleWithValue = isEng ? nameColumnSub3En[childTitle] : nameColumnSub3Jp[childTitle];
    const grandChildItem = {
      key: item,
      title: chooseeTitle || chooseeTitleWithValue || childTitle,
    };
    childItem.children.push(grandChildItem);
  }

  return result;
}
function convertListSubDataRC(data) {
  return data.map((table) => {
    const tableObj = {
      key: table.key,
      title: isEng ? nameColumnEn[table.key] : nameColumnsJP[table.key],
      children: table.children.map((column) => {
        const uniqueValues = new Set();
        const children = column.children.reduce((acc, item) => {
          const { title } = item;
          const key = item.key.split(KEY_CHECKED_LV3);
          if (!uniqueValues.has(key[0])) {
            uniqueValues.add(key[0]);
            acc.push({
              key: key[0],
              title,
              className: key[1],
            });
          }
          return acc;
        }, []);

        const columnObj = {
          key: column.key,
          title: isEng ? nameColumnSub2En[column.key] : nameColumnSub2JP[column.key],
          children,
        };

        return columnObj;
      }),
    };
    return tableObj;
  });
}
const getAllValuesRC = (data) => {
  const values = [];

  const traverse = (node) => {
    if (node.children) {
      node.children.forEach((child) => {
        if (child.key.includes(KEY_FILTER_LV2)) {
          values.push(child.key);
        }
        traverse(child);
      });
    }
  };

  data.forEach((item) => {
    traverse(item);
  });

  return values;
};
function getLevel2LengthRC(arr) {
  const result = {};

  arr.forEach((item) => {
    if (item.children && Array.isArray(item.children)) {
      item.children.forEach((child) => {
        if (child.key && Array.isArray(child.children)) {
          result[child.key] = child.children.length;
        }
      });
    }
  });

  return result;
}
function combineSort(arrayOrigin, arrayB) {
  const mapOrigin = new Map();
  arrayOrigin.forEach((element, index) => {
    mapOrigin.set(element, index);
  });

  const result = arrayB.filter((element) => mapOrigin.has(element));
  result.sort((a, b) => {
    const indexA = mapOrigin.get(a);
    const indexB = mapOrigin.get(b);
    return indexA - indexB;
  });

  return result;
}
export {
  convertData,
  renderNewListData,
  handleDataPayloadChecked,
  getAllValues,
  verifyCombineArray,
  getLevel2Length,
  countKeyOccurrences,
  compareObjectsFilter,
  handleChangeParams,
  verifyParams,
  convertDataRC,
  getAllValuesRC,
  getLevel2LengthRC,
  convertListSubDataRC,
  revertDataRC,
  combineArraysRC,
  combineSort,
};
