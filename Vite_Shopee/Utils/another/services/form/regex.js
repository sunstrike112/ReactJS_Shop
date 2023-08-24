/* eslint-disable no-useless-escape */
/* eslint-disable no-irregular-whitespace */
// const kana = /^[ぁ-んァ-ヶー]+$/;
// /^[a-zA-Z0-9ａ-ｚＡ-Ｚ０-９ぁ-んァ-ヶー一-龠]+(\s+[a-zA-Z0-9ａ-ｚＡ-Ｚ０-９ぁ-んァ-ヶー一-龠]+)*$/; // 全角／半角混在
const kana = /^[\u30A0-\u30FF\s]+$/; // Kanatana
const halfWidthAlphanumeric = /^[a-zA-Z0-9]+([_-]?[a-zA-Z0-9]+)*$/; // 半角英数
const fullWidth = /^[Ａ-Ｚａ-ｚ０-９]+$/; // 全角
const fullWidthHalfWidth =
  /^(?![-_])(?!.*[-_]{2}$)(?!.*_$)[\w０-９ａ-ｚＡ-Ｚぁ-んァ-ヶ一-龠々〆〤\s　－ー＿-]*[\w０-９ａ-ｚＡ-Ｚぁ-んァ-ヶ一-龠々〆〤０-９a-zA-Z]$/;

//  allow hyphen(-) and underscore(_)
const fullWidthHalfWidthAccept =
  /^[\w０-９ａ-ｚＡ-Ｚぁ-んァ-ヶ一-龠々〆〤－ー＿-]*[-_]?[\w０-９ａ-ｚＡ-Ｚぁ-んァ-ヶ一-龠々〆〤０-９a-zA-Z-_]$/;

// allow JP dash (ー), not allow hyphen(-) and underscore(_)
const fullWidthHalfWidthDashJP =
  /^(?!.*[-_])[ー\w０-９ａ-ｚＡ-Ｚぁ-んァ-ヶー一-龠々〆〤\s　＿]*[\w０-９ａ-ｚＡ-Ｚぁ-んァ-ヶー一-龠々〆〤０-９a-zA-Z]$/;

const halfWidthNumber = /^[0-9]+$/; // 半角数字
const numberCurrency = /^([0-9,]+)$/; // ###,###,###,###
const decimalTwoNumbers = /^[0-9.]+$/;
const hourMinuteFormat = /^(?=.*\d.*\d.*\d.*\d)[0-9:]+$/; // HH:mm
const preventSpecialCharHaveSpace = /^[\p{L}\p{N}\s\u3000]*$/u;
export const regex = {
  kana,
  halfWidthAlphanumeric,
  fullWidth,
  fullWidthHalfWidth,
  halfWidthNumber,
  numberCurrency,
  decimalTwoNumbers,
  fullWidthHalfWidthAccept,
  fullWidthHalfWidthDashJP,
  hourMinuteFormat,
  preventSpecialCharHaveSpace,
};
