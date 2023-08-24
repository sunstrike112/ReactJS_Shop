const isCanParse = (str) => {
  try {
    return JSON.parse(str); // Parsing succeeded, the string is valid JSON
  } catch (error) {
    return str; // Parsing failed, the string is not valid JSON
  }
};

function isHaveValueInArray(array, value) {
  for (let i = 0; i < array.length; i++) {
    if (`${array[i].value}` === `${value}`) {
      return true;
    }
  }

  return false;
}

const isSameObj = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  return keys1.every((key) => obj1[key] === obj2[key]);
};

export { isCanParse, isHaveValueInArray, isSameObj };
