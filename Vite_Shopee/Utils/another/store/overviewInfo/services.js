import { useDispatch, useSelector } from 'react-redux';
import { getOverviewInfo, getHistoryOVerviewInfo, updateOverviewInfo, getEsMngPred } from './action';

export const ServicesOverviewInfo = () => {
  const { overviewInfo, historyOverviewInfo, listEsMngPred, loadingListEsManger, loadingListEsMangerDashboard } =
    useSelector((state) => state.overviewInfo);
  const { staffSummary } = useSelector((state) => state.summary);
  const dispatch = useDispatch();
  const getOverviewInfoAction = (payload) => dispatch(getOverviewInfo(payload));
  const getHistoryOVerviewInfoAction = (payload) => dispatch(getHistoryOVerviewInfo(payload));
  const updateOverviewInfoAction = (payload) => dispatch(updateOverviewInfo(payload));
  const getEsMngPredAction = (payload) => dispatch(getEsMngPred(payload));

  return {
    staffSummary,
    overviewInfo,
    historyOverviewInfo,
    listEsMngPred,
    loadingListEsManger,
    loadingListEsMangerDashboard,
    getHistoryOVerviewInfo,
    getOverviewInfoAction,
    getHistoryOVerviewInfoAction,
    updateOverviewInfoAction,
    getEsMngPredAction,
  };
};
