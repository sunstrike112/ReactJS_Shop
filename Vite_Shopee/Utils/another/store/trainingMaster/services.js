import { useDispatch, useSelector } from 'react-redux';
import {
  createTrainingMaster,
  deleteTrainingMaster,
  filterTrainingMaster,
  historyTrainingMaster,
  searchTrainingMaster,
  updateTrainingMaster,
} from './action';

export const ServicesTrainingMaster = () => {
  const { trainingMaster, trainingMasterFilter, histTrainingMaster } = useSelector((state) => state.trainingMaster);
  const dispatch = useDispatch();
  const searchTrainingMasterAction = (payload) => dispatch(searchTrainingMaster(payload));
  const historyTrainingMasterAction = (payload) => dispatch(historyTrainingMaster(payload));
  const filterTrainingMasterAction = (payload) => dispatch(filterTrainingMaster(payload));
  const createTrainingMasterAction = (payload) => dispatch(createTrainingMaster(payload));
  const deleteTrainingMasterAction = (payload) => dispatch(deleteTrainingMaster(payload));
  const updateTrainingMasterAction = (payload) => dispatch(updateTrainingMaster(payload));

  return {
    trainingMaster,
    trainingMasterFilter,
    histTrainingMaster,
    searchTrainingMasterAction,
    historyTrainingMasterAction,
    filterTrainingMasterAction,
    createTrainingMasterAction,
    deleteTrainingMasterAction,
    updateTrainingMasterAction,
  };
};
