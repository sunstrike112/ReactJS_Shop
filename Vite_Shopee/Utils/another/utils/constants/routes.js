const ROUTES = {
  login: '/login',
  sign_up: '/sign-up',
  forget_password: '/forget-password',
  reset_password: '/reset-password',
  dashboard: '/dashboard',
  user_management: '/user-management',
  master: '/master',
  code_master: 'code-master',
  training_master: 'training-master',
  department: 'department',
  company_policy: 'company-policy',
  setting: '/setting',
  create_account: 'create-account',
  basic_info: '/employee-list',
  summary: '/summary',
  esMaster: 'es_master',
  import: '/import',
  testSSO: '/esdb',
  alert_confirmation: 'alert_confirmation',
  es_interview: 'es_interview',
  interview_record: 'interview_record',
  user: 'users',
  roles: 'roles',
  file_upload: '/file_upload',
  work_flow: '/work_flow',
  viewPDF: '/viewPdf',
};

function getAllRoutes(listRouter, parentPath = '') {
  let result = [];
  listRouter.forEach((route) => {
    const fullPath = `${parentPath}${route.path}`;
    result.push({ path: fullPath, typePage: route.typePage, titlePage: route.titlePage });
    if (route.children) {
      result = [...result, ...getAllRoutes(route.children, `${fullPath}/`)];
    }
  });
  return result;
}

export { ROUTES, getAllRoutes };
