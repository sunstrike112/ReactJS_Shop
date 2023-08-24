import axios from 'axios';
import { apiCodeMaster } from 'dhm/apis/codemaster.js';
import { LocalStore } from 'dhm/utils/helpers/local';
import i18n from '../translate';
import { apiOvertime } from './overtime';
import { apiAuth } from './auth';
import { apiBasicInfo } from './basicInfo';
import { apiCommon } from './common';
import { apiCompanyPolicy } from './companyPolicy';
import { apiDepartment } from './department';
import { apiEmployeeSuccess } from './employeeSuccess';
import { apiEsMaster } from './esMaster';
import { apiImport } from './import';
import { apiInterviewLog } from './interviewLog';
import { apiOverview } from './overview';
import { apiPolicyProgress } from './policyProgress';
import { apiProjectInfo } from './projectInfo';
import { apiSetting } from './setting';
import { apiSummary } from './summary';
import { apiTrainingMaster } from './trainingMaster';
import { apiAlertConfirm } from './alertConfirm';
import { apiManageUser } from './manageUser';
import { apiFileUpload } from './fileUpload';
import { apiWorkflow } from './workflow';

const { get } = LocalStore;

const chooseLanguage = {
  en: 'en',
  jp: 'ja',
};

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept-Language': chooseLanguage[i18n.language],
    'ngrok-skip-browser-warning': true,
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = get('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error),
);

export const API_APP = {
  auth: apiAuth,
  department: apiDepartment,
  setting: apiSetting,
  codeMaster: apiCodeMaster,
  basicInfo: apiBasicInfo,
  summary: apiSummary,
  common: apiCommon,
  trainingMaster: apiTrainingMaster,
  companyPolicy: apiCompanyPolicy,
  esMaster: apiEsMaster,
  import: apiImport,
  overviewInfo: apiOverview,
  policyProgress: apiPolicyProgress,
  employeeSuccess: apiEmployeeSuccess,
  projectInfo: apiProjectInfo,
  interviewLog: apiInterviewLog,
  overtime: apiOvertime,
  alertConfirm: apiAlertConfirm,
  manageUser: apiManageUser,
  fileUpload: apiFileUpload,
  workflow: apiWorkflow,
};

export default axiosInstance;
