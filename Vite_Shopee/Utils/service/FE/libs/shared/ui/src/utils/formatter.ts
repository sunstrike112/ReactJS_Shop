import currency from 'currency.js'
import numeral from 'numeral'

export const USD = (value: number | string) => currency(value);
export const AUD = (value: number | string) => currency(value, { symbol: '$', decimal: '.', separator: ',' });
export const JPY = (value: number | string) => currency(value, { precision: 0, symbol: '¥' });
export const EURO = (value: number | string) => currency(value, { symbol: '€', decimal: ',', separator: '.' });

export const numberFormat = (value: number | string, formatter = '0,0') => numeral(value).format(formatter);
