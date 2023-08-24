import { useDispatch, useSelector } from 'react-redux';
import { createUser, updateUser, filterUser, searchUser, historyUser, importUser } from './action';

export function ServiceUser() {
  const dispatch = useDispatch();
  const { loadingUser, loadingUserHistory, user, userHistory } = useSelector((state) => state.user);

  const state = {
    loadingUser,
    user,
    userHistory,
    loadingUserHistory,
  };
  const event = {
    createUser: (payload) => dispatch(createUser(payload)),
    updateUser: (payload) => dispatch(updateUser(payload)),
    importUser: (payload) => dispatch(importUser(payload)),
  };
  const action = {
    filterUser,
    searchUser,
    historyUser,
  };
  return { state, action, event };
}
