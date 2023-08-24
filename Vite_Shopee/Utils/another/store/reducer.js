import { combineReducers } from '@reduxjs/toolkit';
import dashboardAlertConfirm from './alertConfirm/reducer';
import auth from './auth/reducer';
import basicInfo from './basicInfo/reducer';
import codeMaster from './codeMaster/reducer';
import common from './common/reducer';
import companyPolicy from './companyPolicy/reducer';
import department from './department/reducer';
import employeeSuccess from './employeeSuccess/reducer';
import esMaster from './esMaster/reducer';
import importCsv from './import/reducer';
import interviewLog from './interviewLog/reducer';
import overtime from './overtime/reducer';
import overviewInfo from './overviewInfo/reducer';
import policyProgress from './policyProgress/reducer';
import projectInfo from './projectInfo/reducer';
import setting from './setting/reducer';
import summary from './summary/reducer';
import trainingMaster from './trainingMaster/reducer';
import user from './manageUser/user/reducer';
import role from './manageUser/role/reducer';
import fileUpload from './fileUpload/reducer';
import workflow from './workflow/reducer';

const rootReducer = combineReducers({
  auth,
  department,
  setting,
  codeMaster,
  basicInfo,
  summary,
  common,
  trainingMaster,
  companyPolicy,
  esMaster,
  importCsv,
  overviewInfo,
  employeeSuccess,
  policyProgress,
  projectInfo,
  interviewLog,
  overtime,
  dashboardAlertConfirm,
  user,
  role,
  fileUpload,
  workflow,
});

export default rootReducer;
