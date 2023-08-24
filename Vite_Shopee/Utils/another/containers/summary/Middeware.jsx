import { AppContext } from 'dhm/contexts/AppContext';
import { ServiceEmployeeSuccess } from 'dhm/store/employeeSuccess/services';
import { ServicesInterviewLog } from 'dhm/store/interviewLog/services';
import { ServicesOverviewInfo } from 'dhm/store/overviewInfo/services';
import { ServicePolicyProgress } from 'dhm/store/policyProgress/services';
import { ServiceProjectInfo } from 'dhm/store/projectInfo/services';
import { getSummaryStaff } from 'dhm/store/summary/action';
import { TYPE_SELECT } from 'dhm/utils/constants/select';
import { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

export function Middleware() {
  const dispatch = useDispatch();
  const { employeeId } = useParams();
  const { getOverviewInfoAction, getEsMngPredAction } = ServicesOverviewInfo();
  const { getPolicyProgressAction, getTobeFYAction } = ServicePolicyProgress();
  const { getInterviewLogAction } = ServicesInterviewLog();
  const { getProjectInfoAction } = ServiceProjectInfo();
  const { refreshCodeMaster } = useContext(AppContext);
  const {
    event: { getDetailEmployeeSuccess },
  } = ServiceEmployeeSuccess();
  const onSuccess = () => {
    getOverviewInfoAction({ employeeId });
    getEsMngPredAction({
      params: {
        deleteFlg: 0,
        isHistory: false,
        sortType: 'desc',
        isAll: true,
      },
    });
    getPolicyProgressAction({ employeeId });
    getTobeFYAction({
      params: {
        isHistory: false,
        sortType: 'asc',
        sortColumn: 'codeValue',
        codeListIds: [
          TYPE_SELECT.TOBE_FY,
          TYPE_SELECT.T_RISK,
          TYPE_SELECT.INTERVIEW_CATEGORY,
          TYPE_SELECT.BUSINESS_CATEGORY,
          TYPE_SELECT.RECOGNIZE_PERSON,
        ],
        isAll: true,
      },
    });
    getProjectInfoAction({
      params: {
        employeeId,
        isHistory: false,
        sortColumn: 'start,updatedDatetime',
        sortType: 'desc,desc',
        isAll: false,
        limit: 10,
        page: 1,
      },
    });
    getInterviewLogAction({
      params: {
        employeeId,
        isHistory: false,
        sortColumn: 'date',
        sortType: 'desc',
        isAll: false,
        limit: 10,
        page: 1,
      },
    });
    getDetailEmployeeSuccess({ id: employeeId });
  };
  const payloadSummaryStaff = {
    id: employeeId,
    onSuccess,
  };
  useEffect(() => {
    refreshCodeMaster();
    if (!employeeId?.includes('coming-soon')) {
      dispatch(getSummaryStaff(payloadSummaryStaff));
    }
  }, []);
  return <></>;
}
