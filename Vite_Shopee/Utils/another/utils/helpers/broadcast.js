/* eslint-disable no-return-assign */
const broadcastError = new BroadcastChannel('dhm-channel_error');
const broadcastAuth = new BroadcastChannel('dhm-channel_auth');
const broadcastApp = new BroadcastChannel('dhm-channel_app');

const authChannel = {
  login: () => broadcastAuth.postMessage('login'),
  logout: () => broadcastAuth.postMessage('logout'),
};
const appChannel = {
  changeLanguage: () => broadcastApp.postMessage('changeLanguage'),
};

export { broadcastError, authChannel, broadcastAuth, appChannel, broadcastApp };
