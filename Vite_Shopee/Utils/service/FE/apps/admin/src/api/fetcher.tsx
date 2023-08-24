import axios from 'axios'
import baseApi from './base-api';

// export const fetcher = url => axios.get(url).then(res => res.data)
// export const postFetcher = (url, data) => axios.post(url, data).then(res => res.data)


export const fetcher = async (url, method = 'GET', body = {}) => await baseApi(url, method, body)
