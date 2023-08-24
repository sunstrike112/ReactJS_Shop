/* eslint-disable consistent-return */
/* eslint-disable no-nested-ternary */
import { Box } from '@chakra-ui/react';
import { ID_KEY } from 'dhm/services/permission/listKeyWeb';
import { createContext, useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AuthContext } from './AuthContext';

const AbilityContext = createContext({
  can: false,
  user: {},
  canEdit: false,
  canView: false,
  canNotView: false,
  PermissionWrapper: () => {},
  ID_KEY,
});

const getPermission = (permissionList) => {
  const permissions = Object.entries(permissionList).reduce(
    (acc, [key, value]) => {
      switch (value) {
        case 1:
          acc.edit.push(key);
          break;
        case 2:
          acc.view.push(key);
          break;
        case 3:
          acc.notView.push(key);
          break;
        default:
          acc.notView.push(key);
          break;
      }
      return acc;
    },
    { edit: [], view: [], notView: [ID_KEY[100]] },
  );

  return permissions;
};

function AbilityProvider({ children }) {
  const { user, permissionUser } = useSelector((state) => state.auth);
  const { listPermissionRefresh, loadingRefresh } = useContext(AuthContext);
  const can = (action, path) => {
    const userPermissions = getPermission(listPermissionRefresh || permissionUser);
    return userPermissions[action].includes(path);
  };
  const canEdit = (path) => can('edit', path);
  const canView = (path) => can('view', path);
  const canNotView = (path) => can('notView', path);

  function PermissionWrapper({ path, children: child, haveNoti = true, otherShow = () => {}, styleOtherShow = {} }) {
    const [waiting, setWating] = useState(false);
    useEffect(() => {
      setTimeout(() => {
        setWating(true);
      }, 200);
    }, []);
    if (!waiting) return;
    const renderView = () => {
      let UI = '';
      if (canEdit(path)) {
        UI = child;
      } else if (canView(path)) {
        UI = <Box>{child}</Box>;
      } else {
        UI = (
          <>
            <Box display={haveNoti ? 'block' : 'none'}>{haveNoti ? 'アクセス権限がありませんでした。' : ''}</Box>
            <Box {...styleOtherShow}>{otherShow()}</Box>
          </>
        );
      }
      return UI;
    };
    if (waiting && !loadingRefresh) return renderView();
  }
  return (
    <AbilityContext.Provider value={{ can, user, canEdit, canView, canNotView, PermissionWrapper, ID_KEY }}>
      {children}
    </AbilityContext.Provider>
  );
}

export { AbilityContext, AbilityProvider };
