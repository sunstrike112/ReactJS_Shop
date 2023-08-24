import { useDispatch, useSelector } from 'react-redux';
import {
  createRole,
  updateRole,
  filterRole,
  searchRole,
  deleteRole,
  historyRole,
  getListPermission,
  getDetailPermission,
} from './action';

export function ServiceRole() {
  const dispatch = useDispatch();
  const { loadingRole, loadingRoleHistory, role, roleHistory, listPermission, detailPermission } = useSelector(
    (state) => state.role,
  );

  const state = {
    loadingRole,
    role,
    roleHistory,
    loadingRoleHistory,
    listPermission,
    detailPermission,
  };
  const event = {
    createRole: (payload) => dispatch(createRole(payload)),
    updateRole: (payload) => dispatch(updateRole(payload)),
    getListPermission: (payload) => dispatch(getListPermission(payload)),
    getDetailPermission: (payload) => dispatch(getDetailPermission(payload)),
  };
  const action = {
    filterRole,
    searchRole,
    historyRole,
    deleteRole,
  };
  return { state, action, event };
}
