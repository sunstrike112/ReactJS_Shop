import { useDispatch, useSelector } from 'react-redux';
import {
  createEsMaster,
  updateEsMaster,
  filterEsMaster,
  searchEsMaster,
  deleteEsMaster,
  historyEsMaster,
  getDropdown,
  getCheckLeaderEsMaster,
} from './action';

export function ServiceEsMaster() {
  const dispatch = useDispatch();
  const { loadingEsMaster, loadingEsMasterHistory, esMaster, esFilter, esMasterHistory, dropdownEs, isHaveMember } =
    useSelector((state) => state.esMaster);

  const state = {
    loadingEsMaster,
    esMaster,
    esFilter,
    esMasterHistory,
    loadingEsMasterHistory,
    dropdownEs,
    isHaveMember,
  };
  const event = {
    createEsMaster: (payload) => dispatch(createEsMaster(payload)),
    updateEsMaster: (payload) => dispatch(updateEsMaster(payload)),
    getDropdown: (payload) => dispatch(getDropdown(payload)),
    getCheckLeaderEsMaster: (payload) => dispatch(getCheckLeaderEsMaster(payload)),
  };
  const action = {
    filterEsMaster,
    searchEsMaster,
    historyEsMaster,
    deleteEsMaster,
  };
  return { state, action, event };
}
