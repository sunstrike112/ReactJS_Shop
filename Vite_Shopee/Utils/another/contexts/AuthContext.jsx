/* eslint-disable no-restricted-syntax */
import { useDisclosure } from '@chakra-ui/react';
import { getRefreshTokenNoCode } from 'dhm/components/Auth0Simple/method';
import { ConfirmModal } from 'dhm/components/Modal/elements/confirmModal';
import {
  getDetailPermission,
  getDetailPermissionRefresh,
  signOut as logout,
  profileMe,
  profileMeRefresh,
} from 'dhm/store/auth/action';
import { ROUTES } from 'dhm/utils/constants/routes';
import { authChannel, broadcastApp, broadcastAuth } from 'dhm/utils/helpers/broadcast';
import { createContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { LocalStore } from '../utils/helpers/local';

const AuthContext = createContext({
  signOut: () => {},
});
const AccountAdmin = {
  account: 'admin',
  password: 'admin',
};

const { isExits, get, set, clearAll } = LocalStore;

function AuthContextProvider({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isVerifyLogin, user } = useSelector((state) => state.auth);
  const [listPermissionRefresh, setListPermissionRefresh] = useState(null);
  const [loadingRefresh, setLoadingRefresh] = useState(false);
  const data = get('user_profile');
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(isExits('access_token'));
  const dispatch = useDispatch();
  const refreshToken = data?.refresh_token || null;

  const methodGetPermission = (res) => {
    const payloadDetail = {
      onSuccess: () => {},
      data: {
        id: res?.role,
      },
    };
    dispatch(getDetailPermission(payloadDetail));
  };
  const methodGetPermissionRefresh = (res) => {
    const payloadDetail = {
      onSuccess: (response) => {
        const getData = response.map((item) => ({
          id: item.id,
          permissionLevel1Name: item.permissionLevel1Name,
          permissionLevel2Name: item.permissionLevel2Name || '',
          permissionLevel1: item.permissionLevel1,
          permissionLevel2: item.permissionLevel2 || '',
          versionPermission: item.version,
          actionId: +item.actionId,
        }));
        const level1Permissions = getData.filter((item) => item.permissionLevel2 === '');
        const level2Permissions = getData.filter((item) => item.permissionLevel2 !== '');
        let listPermission = {};
        const handlePermissionChange = (key, actionId) => {
          listPermission = { ...listPermission, [key]: actionId };
        };
        const getListPermission = () => {
          level1Permissions.forEach((level1) => {
            handlePermissionChange(level1.permissionLevel1, level1.actionId);
            level1.children = level2Permissions.filter((level2) => {
              handlePermissionChange(`${level2.permissionLevel1}-${level2.permissionLevel2}`, level2.actionId);
              return level2.permissionLevel1 === level1.permissionLevel1;
            });
          });
        };
        getListPermission();
        setListPermissionRefresh(listPermission);
        setLoadingRefresh(false);
      },
      data: {
        id: res?.role,
      },
    };
    dispatch(getDetailPermissionRefresh(payloadDetail));
  };

  // Manage broadcast
  broadcastAuth.onmessage = (e) => {
    switch (e.data) {
      case 'login':
        window.location.assign(ROUTES.basic_info);
        break;
      case 'logout':
        window.location.reload();
        break;
      default:
        break;
    }
  };
  broadcastApp.onmessage = (e) => {
    switch (e.data) {
      case 'changeLanguage':
        window.location.reload();
        break;
      default:
        break;
    }
  };

  const handleSignIn = () => {
    authChannel.login();
    setIsLogin(true);
    navigate(ROUTES.basic_info);
    dispatch(
      profileMe({
        onSuccess: methodGetPermission,
      }),
    );
  };

  const logoutSSO = () => {
    const params = new URLSearchParams({
      token: data?.token,
      // TODO: Add config param for token type
      token_type_hint: 'refresh_token',
      client_id: import.meta.env.VITE_CLIENT_ID,
      post_logout_redirect_uri: import.meta.env.VITE_DOMAIN,
      ui_locales: window.navigator.languages.reduce((a, b) => `${a} ${b}`),
    });

    window.location.replace(`${import.meta.env.VITE_ENDPOINT_LOGOUT}?${params.toString()}`);
  };

  const refreshTokenAuth = () => {
    const callbackRefreshToken = (res) => {
      if (res?.error) {
        localStorage.clear();
        window.location.href = '/login';
        return;
      }
      set('user_profile', res);
      set('access_token', res?.access_token);
      setIsLogin(true);
      dispatch(
        profileMe({
          onSuccess: methodGetPermission,
        }),
      );
    };
    getRefreshTokenNoCode(callbackRefreshToken, refreshToken);
  };
  const setTimeVerifyExpired = () => {
    const timeExpired = +data.expires_in * 1000 - 10000;
    return timeExpired;
  };
  useEffect(() => {
    if (isExits('access_token') && isExits('user_profile') && isLogin) {
      refreshTokenAuth();
    }
  }, []);
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (isExits('access_token') && isExits('user_profile') && isLogin && data.expires_in) {
      const timeExpired = setTimeVerifyExpired();
      const interval = setInterval(() => {
        refreshTokenAuth();
      }, timeExpired);
      return () => clearInterval(interval);
    }
  }, []);
  const location = useLocation();

  useEffect(() => {
    if (isExits('access_token') && isExits('user_profile') && isLogin && isVerifyLogin) {
      setLoadingRefresh(true);
      const onSuccess = (res) => {
        if (res?.role === user?.role && res?.isActive === 0) {
          methodGetPermissionRefresh(user);
        } else {
          setLoadingRefresh(false);
          onOpen();
        }
      };
      const payload = {
        onSuccess,
      };
      dispatch(profileMeRefresh(payload));
    }
  }, [location]);
  const signOut = () => {
    clearAll();
    authChannel.logout();
    dispatch(logout());
    setIsLogin(false);
    navigate(ROUTES.login);
    logoutSSO();
  };
  const valueProps = {
    handleSignIn,
    signOut,
    isLogin,
    listPermissionRefresh,
    loadingRefresh,
  };
  return (
    <AuthContext.Provider value={valueProps}>
      {children}
      <ConfirmModal
        isOpen={isOpen}
        onConfirm={() => {
          onClose();
          if (user?.isActive === 0) {
            window.location.reload();
          } else {
            signOut();
          }
        }}
        onCancel={() => {
          onClose();
          if (user?.isActive === 0) {
            window.location.reload();
          } else {
            signOut();
          }
        }}
        type='confirmRole'
      />
    </AuthContext.Provider>
  );
}
export { AccountAdmin, AuthContext, AuthContextProvider };
