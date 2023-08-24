import { useDispatch, useSelector } from 'react-redux';
import { importAll } from './action';

export function ServiceImport() {
  const dispatch = useDispatch();
  const { loadingImport } = useSelector((state) => state.esMaster);

  const state = { loadingImport };
  const event = {
    importAll: (payload) => dispatch(importAll(payload)),
  };
  const action = {};
  return { state, action, event };
}
