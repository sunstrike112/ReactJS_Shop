import { transOutHook } from 'dhm/contexts/TranslateContext';
import { ROUTES } from 'dhm/utils/constants/routes';
import { lazy } from 'react';
import { Outlet } from 'react-router-dom';

const DumpPage = lazy(() => import('dhm/pages/dumpPage').then((module) => ({ default: module.DumpPage })));
const ESMasterPage = lazy(() => import('dhm/pages/master/esMaster'));
const CreateAccountPage = lazy(() => import('dhm/pages/setting/account'));
const CodeMasterPage = lazy(() => import('dhm/pages/master/codeMaster'));
const TrainingMasterPage = lazy(() => import('dhm/pages/master/trainingMaster'));
const CompanyPolicyPage = lazy(() => import('dhm/pages/master/companyPolicy'));
const ProcessListPage = lazy(() => import('dhm/pages/workFlow/processList'));
const ImportProcessListPage = lazy(() => import('dhm/pages/workFlow/importProcessList'));
const SummaryPage = lazy(() => import('dhm/pages/summary'));
const DashboardAlertConfirmPage = lazy(() =>
  import('dhm/pages/dashboard/alertConfirm').then((module) => ({ default: module.DashboardAlertConfirmPage })),
);
const DashboardESInterviewPage = lazy(() =>
  import('dhm/pages/dashboard/esInterview').then((module) => ({ default: module.DashboardESInterviewPage })),
);
const DashboardInteviewRecordPage = lazy(() =>
  import('dhm/pages/dashboard/interviewRecord').then((module) => ({ default: module.DashboardInteviewRecordPage })),
);
const FileUploadPage = lazy(() =>
  import('dhm/pages/fileUpload').then((module) => ({ default: module.FileUploadPage })),
);
const ViewPdfPage = lazy(() => import('dhm/pages/viewPdf').then((module) => ({ default: module.ViewPdfPage })));
const BasicInfoPage = lazy(() =>
  import('dhm/pages/basicInfo').then((module) => ({
    default: module.BasicInfoPage,
  })),
);
const ImportBasicInfoPage = lazy(() =>
  import('dhm/pages/import').then((module) => ({ default: module.ImportPageBasicInfo })),
);
const ImportPageOvertimePage = lazy(() =>
  import('dhm/pages/import_overtime').then((module) => ({ default: module.ImportPageOvertime })),
);
const UserManage = lazy(() => import('dhm/pages/manageUser').then((module) => ({ default: module.UserManage })));
const RoleManage = lazy(() => import('dhm/pages/manageUser').then((module) => ({ default: module.RoleManage })));
// const SSOSignin = lazy(() => import('dhm/pages/testSSO').then((module) => ({ default: module.SSOSignin })));
const trans = (value) => transOutHook(value, 'sidebar');

const routes = [
  {
    path: ROUTES.dashboard,
    element: <Outlet />,
    typePage: '',
    titlePage: trans('dashboard'),
    children: [
      {
        path: ROUTES.alert_confirmation,
        element: <DashboardAlertConfirmPage />,
        typePage: 'other',
        titlePage: trans('dashboard1_alert_confirm'),
      },
      {
        path: ROUTES.es_interview,
        element: <DashboardESInterviewPage />,
        typePage: 'other',
        titlePage: trans('dashboard2_es_interview'),
      },
      {
        path: ROUTES.interview_record,
        element: <DashboardInteviewRecordPage />,
        typePage: 'other',
        titlePage: trans('dashboard3_interview_record'),
      },
    ],
  },
  {
    path: `${ROUTES.summary}/:employeeId`,
    element: <SummaryPage />,
    typePage: '',
    titlePage: trans('summary'),
  },
  {
    path: `${ROUTES.viewPDF}/:employeeId/resume`,
    element: <ViewPdfPage />,
    typePage: '',
    titlePage: trans('resume'),
  },
  {
    path: `${ROUTES.viewPDF}/:employeeId/workHistory`,
    element: <ViewPdfPage />,
    typePage: '',
    titlePage: trans('workHistory'),
  },
  {
    path: ROUTES.basic_info,
    element: <BasicInfoPage />,
    typePage: 'info',
    titlePage: trans('basic_info'),
  },
  {
    path: ROUTES.user_management,
    element: <DumpPage />,
    typePage: 'normal',
    titlePage: trans('user_management'),
  },
  {
    path: ROUTES.master,
    element: <Outlet />,
    children: [
      {
        path: `${ROUTES.code_master}/history`,
        element: <CodeMasterPage />,
        typePage: 'master',
        titlePage: trans('code_master'),
      },
      {
        path: `${ROUTES.code_master}/detailed`,
        element: <CodeMasterPage />,
        typePage: 'master',
        titlePage: trans('code_master'),
      },
      {
        path: ROUTES.training_master,
        element: <TrainingMasterPage />,
        typePage: 'master',
        titlePage: trans('training_master'),
      },
      {
        path: ROUTES.company_policy,
        element: <CompanyPolicyPage />,
        typePage: 'master',
        titlePage: trans('company_policy'),
      },
      {
        path: ROUTES.esMaster,
        element: <ESMasterPage />,
        typePage: 'master',
        titlePage: trans('es_manager'),
      },
      { path: ROUTES.company_policy, element: <DumpPage />, typePage: 'master', titlePage: trans('company_policy') },
    ],
  },
  {
    path: ROUTES.setting,
    element: <Outlet />,
    children: [
      {
        path: ROUTES.create_account,
        element: <CreateAccountPage />,
        typePage: 'info',
        titlePage: trans('create_account'),
      },
      {
        path: ROUTES.user,
        element: <UserManage />,
        typePage: 'info',
        titlePage: trans('user_manage'),
      },
      {
        path: ROUTES.roles,
        element: <RoleManage />,
        typePage: 'info',
        titlePage: trans('role_settings'),
      },
    ],
  },
  {
    path: ROUTES.import,
    element: <Outlet />,
    children: [
      {
        path: `all`,
        element: <ImportBasicInfoPage />,
        typePage: 'other',
        titlePage: trans('import1'),
      },
      {
        path: `overtime`,
        element: <ImportPageOvertimePage />,
        typePage: 'other',
        titlePage: trans('import2'),
      },
    ],
  },
  {
    path: ROUTES.file_upload,
    element: <FileUploadPage />,
    typePage: 'info',
    titlePage: trans('file_upload'),
  },
  {
    path: ROUTES.work_flow,
    element: <Outlet />,
    children: [
      {
        path: `process_list`,
        element: <ProcessListPage />,
        typePage: 'other',
        titlePage: trans('process_list'),
      },
      {
        path: `import_process_list`,
        element: <ImportProcessListPage />,
        typePage: 'other',
        titlePage: trans('import_process_list'),
      },
    ],
  },
  // {
  //   path: ROUTES.testSSO,
  //   element: <SSOSignin />,
  //   typePage: 'normal',
  //   titlePage: 'test SSO',
  // },
];

export { routes };
