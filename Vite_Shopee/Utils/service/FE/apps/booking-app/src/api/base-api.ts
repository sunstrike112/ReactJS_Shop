import axios from 'axios';
import {
  BASE_API_URL,
  ORGANIZATIONS_ENDPOINT,
} from '@ss-fe-fw/booking/constants';
import { notification } from 'antd';
import {
  APP_LOGIN_URL,
  RECOIL_KEY,
  REFRESH_ENDPOINT,
} from '@ss-fe-fw/booking/constants';
import refreshTokenApi from './auth/refresh';
import Cookies from 'js-cookie';
import PubSub from 'pubsub-js';

async function baseApi(endpoint, method = 'GET', body = {}) {
  const url = `${BASE_API_URL}${endpoint}`;
  const local = JSON.parse(localStorage.getItem(RECOIL_KEY)) ?? null;
  const token = localStorage.getItem('accessToken') || null;
  const refreshToken = localStorage.getItem('refreshToken') || null;
  const xOrganizationId = local?.storeState?.id;

  try {
    let headers = {
      'Content-type': 'application/json; charset=UTF-8',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    if (xOrganizationId &&
      endpoint !== ORGANIZATIONS_ENDPOINT.BASE + ORGANIZATIONS_ENDPOINT.SEARCH
    ) {
      headers['X-Organization-Id'] = `${xOrganizationId}`;
    }

    let config: any = {
      method: method,
      headers: headers,
      withCredentials: true,
      // proxy: proxy
    };
    if (method === 'GET') config['params'] = body;
    else config['data'] = body;

    const response = await axios(url, config);
    return response.data?.data ?? response.data;
  } catch ({ err, request, response }) {
    if (response?.status == 401 && endpoint !== REFRESH_ENDPOINT) {
      const cachePrevRequest = {
        endpoint,
        method,
        body,
      };
      // Call Refresh Token
      const user = local?.userState ?? null;
      if (!user) window.location.href = APP_LOGIN_URL;

      Cookies.set('Refresh', refreshToken);
      // Cookies.set('Authentication', token)
      const result: any = await refreshTokenApi({ email: user.email });

      if (!result.status) {
        localStorage.setItem('accessToken', result.accessToken);
        localStorage.setItem('refreshToken', result.refreshToken);
        Cookies.set('Refresh', result.refreshToken);
        // Cookies.set('Authentication', result.accessToken)
        return await baseApi(
          cachePrevRequest.endpoint,
          cachePrevRequest.method,
          cachePrevRequest.body
        );
      } else {
        // window.location.href = APP_LOGIN_URL
        PubSub.publish('token_expired', null);
      }
    }

    if (!Array.isArray(response?.data?.message)) {
      notification.error({
        message: response?.data?.message ?? "API System's error",
      });
    }
    PubSub.publishSync('error_page', response?.status ?? 500);
    return {
      message: response?.data?.message ?? "API System's error",
      status: response?.status ?? 500,
    };
  }
}

export default baseApi;
