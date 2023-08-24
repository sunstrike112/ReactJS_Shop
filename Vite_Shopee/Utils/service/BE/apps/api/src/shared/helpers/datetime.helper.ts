import { DateTime, Settings } from "luxon";

export const defaultLocale = process.env.LOCALE || 'en';

export const convertDateTime = (
  currentDateTime: DateTime,
  convertTimeZone: string,
  convertLocale: string = defaultLocale
) => {
  return currentDateTime
    .setLocale(convertLocale)
    .setZone(convertTimeZone);
}