/* eslint-disable no-restricted-syntax */
const combineArray = (originData, dataToCombine) => {
  const combinedArray = [];
  for (const data of originData) {
    const matchingData = dataToCombine.find(
      (item) =>
        item.permissionLevel1 === data.permissionLevel1 &&
        (item.permissionLevel2 || '') === (data.permissionLevel2 || ''),
    );
    const combinedData = {
      ...data,
      ...(matchingData || { actionId: 3 }),
    };
    combinedArray.push(combinedData);
  }
  return combinedArray;
};

function combineResult(dataOrigin, dataToCombine) {
  const result = [];
  dataOrigin.forEach((origin) => {
    const combined = dataToCombine.find(
      (combine) =>
        combine.permissionLevel1 === origin.permissionLevel1 &&
        (combine.permissionLevel2 || '') === (origin.permissionLevel2 || ''),
    );

    if (combined) {
      result.push({
        permissionLevel1: origin.permissionLevel1,
        permissionLevel2: origin.permissionLevel2,
        actionId: +origin.actionId,
        versionPermission: combined.version,
      });
    }
  });
  return result;
}

export { combineArray, combineResult };
