import { createSlice } from '@reduxjs/toolkit';
import { LocalStore } from 'dhm/utils/helpers/local';
import {
  signIn,
  signUp,
  setUser,
  profileMe,
  signOut,
  signInSSO,
  signInSSORefresh,
  getDetailPermission,
} from './action';

const { set, get } = LocalStore;
const DEFAULT_USER = 'VIEWER';
const initialState = {
  user: {
    token: null,
    role: DEFAULT_USER,
    userName: '',
    mail: '',
    isActive: 0,
  },
  isLoading: false,
  isVerifyLogin: false,
  permissionUser: [],
};
const resetUser = {
  token: null,
  role: DEFAULT_USER,
  userName: '',
  mail: '',
  isActive: 0,
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: ({ addCase }) => {
    addCase(signIn.pending, (state) => ({
      ...state,
      user: resetUser,
      isLoading: true,
    }));
    addCase(signIn.fulfilled, (state, action) => {
      set('access_token', action.payload.accessToken);
      return {
        ...state,
        user: {
          token: action.payload.accessToken,
          role: action.payload.role || DEFAULT_USER,
        },
        isLoading: false,
      };
    });
    addCase(signIn.rejected, (state) => ({
      ...state,
      user: resetUser,
      isLoading: false,
    }));
    addCase(signUp.pending);
    addCase(signUp.fulfilled);
    addCase(signUp.rejected);
    addCase(setUser, (state, action) => ({
      ...state,
      user: {
        token: action.payload.token,
        role: action.payload.role,
      },
    }));
    addCase(profileMe.pending, (state) => ({
      ...state,
      isLoading: true,
      isVerifyLogin: false,
    }));
    addCase(profileMe.fulfilled, (state, action) => ({
      ...state,
      user: {
        token: get('access_token', true),
        role: action.payload.role || DEFAULT_USER,
        userName: action.payload.userName || '',
        mail: action.payload.mail || '',
        isActive: action.payload?.isActive,
      },
      isLoading: false,
      isVerifyLogin: true,
    }));
    addCase(profileMe.rejected, (state) => ({
      ...state,
      isLoading: false,
      isVerifyLogin: true,
    }));
    addCase(signOut, (state) => ({
      ...state,
      user: resetUser,
    }));
    addCase(signInSSO.pending, (state) => ({
      ...state,
      user: resetUser,
      isLoading: true,
    }));
    addCase(signInSSO.fulfilled, (state, action) => {
      const token = action.meta.arg.data.accessToken;
      set('access_token', token);
      return {
        ...state,
        user: {
          token,
          role: action.payload.role || DEFAULT_USER,
        },
        isLoading: false,
      };
    });
    addCase(signInSSO.rejected, (state) => ({
      ...state,
      user: resetUser,
      isLoading: false,
    }));
    addCase(signInSSORefresh.pending, (state) => ({
      ...state,
      user: resetUser,
    }));
    addCase(signInSSORefresh.fulfilled, (state, action) => {
      const token = action.payload.accessToken;
      set('access_token', token);
      return {
        ...state,
        user: {
          token,
          role: action.payload.role || DEFAULT_USER,
        },
      };
    });
    addCase(signInSSORefresh.rejected, (state) => ({
      ...state,
      user: resetUser,
    }));

    addCase(getDetailPermission.pending, (state) => ({ ...state, permissionUser: [] }));
    addCase(getDetailPermission.fulfilled, (state, { payload }) => {
      const getData = payload.map((item) => ({
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
      return {
        ...state,
        permissionUser: listPermission,
      };
    });
    addCase(getDetailPermission.rejected, (state) => ({ ...state, permissionUser: [] }));
  },
});
const action = authSlice.actions;

export { action };
export default authSlice.reducer;
