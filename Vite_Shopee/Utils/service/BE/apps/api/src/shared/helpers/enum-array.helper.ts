export const StringIsNumber = value => isNaN(Number(value)) === false;

export function enumToArray(enumme) {
  const transformer = Object.keys(enumme)
    .filter(StringIsNumber)
    .map(key => enumme[key]);
  
  return {
    items: transformer
  };
}