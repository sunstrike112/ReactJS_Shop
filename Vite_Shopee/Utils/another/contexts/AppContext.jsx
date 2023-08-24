import { getDropdown, getDropdownRole } from 'dhm/store/common/action';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useBeforeUnload, useLocation } from 'react-router-dom';
import { ConstantSession, LocalStore, SessionStore } from '../utils';
import { AuthContext } from './AuthContext';

const { isExits } = LocalStore;
const { remove } = SessionStore;

const AppContext = React.createContext({
  isShowSidebar: true,
  setIsShowSidebar: () => {},
  currentUrl: '',
  isLoadingCommom: false,
  heightApp: '100vh',
  refreshCodeMaster: () => {},
});
function AppProvider({ children }) {
  const { isLogin } = useContext(AuthContext);
  const [heightApp] = useState('100vh');
  const [refreshListCodeMaster, setRefreshListCodeMaster] = useState(0);

  // Router
  const location = useLocation();
  const [currentUrl, setCurrentUrl] = useState(location.pathname);
  const { isLoading } = useSelector((state) => state.auth);
  const [isShowSidebar, setIsShowSidebar] = useState(true);

  const dispatch = useDispatch();
  useEffect(() => {
    setCurrentUrl(location.pathname);
  }, [location.pathname]);
  // Get Dropdown static
  const listDropdownStatic = [
    'COMP_JOINED_ROUTE',
    'GENDER',
    'ROLE',
    'ES_STATUS',
    'JOB_CONTENT',
    'RELATIONSHIP',
    'CAREER',
    'MONEY',
    'WORKING_WAY',
    'OTHERS',
    'RETIREMENT',
    'MID_CAREER_NEW_GRADUATE',
    'POSITION',
    'POLICY',
    'SALE_EVALUATION',
    'CATEGORY_AREA',
    'ENGLISH_LEVEL',
  ];
  useEffect(() => {
    if (isExits('access_token') && isExits('user_profile') && isLogin) {
      for (let i = 0; i < listDropdownStatic.length; i += 1) {
        const payload = {
          type: {
            codeListIds: [listDropdownStatic[i]],
          },
        };
        dispatch(getDropdown(payload));
      }
      dispatch(getDropdownRole());
    }
  }, [isLogin, refreshListCodeMaster]);
  const refreshCodeMaster = () => setRefreshListCodeMaster((prev) => prev + 1);
  // Loading common
  const { loadingSummary } = useSelector((state) => state.summary);
  const { loadingCodeMaster } = useSelector((state) => state.codeMaster);
  const { loadingEsMaster, loadingEsMasterHistory } = useSelector((state) => state.esMaster);
  const { loadingTrainingMaster } = useSelector((state) => state.trainingMaster);
  const { loadingCompanyPolicy } = useSelector((state) => state.companyPolicy);
  const { loadingBasicInfo, loadingBasicInfoSub } = useSelector((state) => state.basicInfo);
  const { loadingImport } = useSelector((state) => state.importCsv);
  const { loadingOverviewInfo } = useSelector((state) => state.overviewInfo);
  const { loadingPolicyProgress } = useSelector((state) => state.policyProgress);
  const { loadingEmployeeSuccess } = useSelector((state) => state.employeeSuccess);
  const { loadingProjectInfo } = useSelector((state) => state.projectInfo);
  const { loadingInterviewLog } = useSelector((state) => state.interviewLog);
  const { loadingOvertime } = useSelector((state) => state.overtime);
  const { loadingDashboardAlertConfirm } = useSelector((state) => state.dashboardAlertConfirm);
  const { loadingUser } = useSelector((state) => state.user);
  const { loadingRole } = useSelector((state) => state.role);
  const { loadingFileUpload, loadingListEmployeeId } = useSelector((state) => state.fileUpload);
  const { loadingWorkflow } = useSelector((state) => state.workflow);
  const listLoading = [
    loadingSummary,
    isLoading,
    loadingCodeMaster,
    loadingEsMaster,
    loadingTrainingMaster,
    loadingCompanyPolicy,
    loadingBasicInfo,
    loadingBasicInfoSub,
    loadingEsMasterHistory,
    loadingImport,
    loadingOverviewInfo,
    loadingPolicyProgress,
    loadingEmployeeSuccess,
    loadingProjectInfo,
    loadingInterviewLog,
    loadingOvertime,
    loadingDashboardAlertConfirm,
    loadingUser,
    loadingRole,
    loadingFileUpload,
    loadingListEmployeeId,
    loadingWorkflow,
  ];
  const isLoadingCommom = useMemo(() => listLoading.some((item) => item), [listLoading]);

  // Manage State - Filter
  useBeforeUnload(
    React.useCallback(() => {
      remove(ConstantSession.TABLE_FILTER_DRAFF);
    }, []),
  );
  const propsApp = {
    currentUrl,
    setIsShowSidebar,
    isShowSidebar,
    isLoadingCommom,
    heightApp,
    refreshCodeMaster,
  };
  return <AppContext.Provider value={propsApp}>{children}</AppContext.Provider>;
}

export { AppContext, AppProvider };
