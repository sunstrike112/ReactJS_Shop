import baseApi from '@ss-fe-fw/booking/api/base-api';
import { VEHICLES_ENDPOINT } from '@ss-fe-fw/booking/constants';

import queryString from 'query-string';

export async function getVehicleByRegoAndState(payload) {
  return await baseApi(VEHICLES_ENDPOINT.BASE, 'POST', {
    ...payload,
    includeExtendedData: true,
  });
}

export async function getVehicleManual(payload) {
  return await baseApi(
    VEHICLES_ENDPOINT.BASE + VEHICLES_ENDPOINT.MANUAL,
    'POST',
    payload
  );
}

export async function getMakesOfVehicle() {
  return await baseApi(VEHICLES_ENDPOINT.BASE + VEHICLES_ENDPOINT.MAKES, 'GET');
}

export async function getModelsOfVehicle(payload) {
  return await baseApi(
    VEHICLES_ENDPOINT.BASE +
      VEHICLES_ENDPOINT.MODELS +
      `?${queryString.stringify(payload)}`,
    'GET'
  );
}

export async function getVariantsOfVehicle(payload) {
  return await baseApi(
    VEHICLES_ENDPOINT.BASE +
      VEHICLES_ENDPOINT.VARIANTS +
      `?${queryString.stringify(payload)}`,
    'GET'
  );
}

export async function getYearsOfVehicle(payload) {
  return await baseApi(
    VEHICLES_ENDPOINT.BASE +
      VEHICLES_ENDPOINT.YEARS +
      `?${queryString.stringify(payload)}`,
    'GET'
  );
}

export async function getColorsOfVehicle(payload) {
  return await baseApi(
    VEHICLES_ENDPOINT.BASE + VEHICLES_ENDPOINT.COLORS,
    'POST',
    { ...payload, includeExtendedData: true }
  );
}
