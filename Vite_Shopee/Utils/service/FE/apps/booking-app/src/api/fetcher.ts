import baseApi from './base-api';

export const fetcher = async (url, method = 'GET', body = {}) => await baseApi(url, method, body)
