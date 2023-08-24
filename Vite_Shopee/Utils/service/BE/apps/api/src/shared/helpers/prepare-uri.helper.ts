export const prepareURI = (URI: string, replacements: any = {}) => {
  Object.entries(replacements).forEach(([key, value]: any) => {
    if (value === null || value === undefined) {
      const find = new RegExp('&' + key + '={' + key + '}');
      URI = URI.replace(find, '');
    } else {
      const find = new RegExp('{' + key + '}');
      URI = URI.replace(find, value);
    }
  })
  return URI;
}