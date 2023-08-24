import { createContext } from 'react';
import { useTranslation } from 'react-i18next';
import { appChannel } from 'dhm/utils/helpers/broadcast';
import i18n from 'dhm/translate';

// Initialize Context
const LanguageContext = createContext({
  tHeader: () => {},
  tForm: () => {},
  tLogin: () => {},
  tRole: () => {},
  tTable: () => {},
  tSidebar: () => {},
  tTabs: () => {},
  tValidator: () => {},
  tMessageContent: () => {},
  tCsv: () => {},
  tKeyValidator: () => {},
  tOverviewInfo: () => {},
  tPolicyProgress: () => {},
  tProjectInfo: () => {},
  tInterviewLog: () => {},
  tAlertConfirm: () => {},
});

const transOutHook = (key, ns, params) => i18n.t(key, { ns, ...params });
const transScheOutHook = (key) => i18n.t(key, { ns: 'schema' });
const currentLanguage = (lang) => i18n.language === lang;

const changeLanguage = async (lang) => {
  try {
    await i18n.changeLanguage(lang);
    localStorage.setItem('selectedLanguage', lang);
    appChannel.changeLanguage();
    window.location.reload();
  } catch (error) {
    console.log('something went wrong loading', error);
  }
};

export function LanguageProvider({ children }) {
  const { t: tHeader } = useTranslation('header');
  const { t: tForm } = useTranslation('form');
  const { t: tLogin } = useTranslation('login');
  const { t: tRole } = useTranslation('role');
  const { t: tTable } = useTranslation('table');
  const { t: tSidebar } = useTranslation('sidebar');
  const { t: tTabs } = useTranslation('tabs');
  const { t: tValidator } = useTranslation('validatorDefine');
  const { t: tMessageContent } = useTranslation('messageContentDefine');
  const { t: tCsv } = useTranslation('csvDefine');
  const { t: tKeyValidator } = useTranslation('keyValidatorDefine');
  const { t: tOverviewInfo } = useTranslation('overviewInfo');
  const { t: tPolicyProgress } = useTranslation('policyProgress');
  const { t: tProjectInfo } = useTranslation('projectInfo');
  const { t: tInterviewLog } = useTranslation('interviewLog');
  const { t: tAlertConfirm } = useTranslation('alertConfirm');
  const { t: tFileUpload } = useTranslation('fileUpload');
  const { t: tWorkflow } = useTranslation('workflow');
  const { t: tViewPdf } = useTranslation('viewPdf');

  const contextValue = {
    tHeader,
    tForm,
    tLogin,
    tRole,
    tTable,
    tSidebar,
    tTabs,
    tValidator,
    tMessageContent,
    tCsv,
    tKeyValidator,
    tOverviewInfo,
    tPolicyProgress,
    tProjectInfo,
    tInterviewLog,
    tAlertConfirm,
    tFileUpload,
    tWorkflow,
    tViewPdf,
  };

  return <LanguageContext.Provider value={contextValue}>{children}</LanguageContext.Provider>;
}

export { transOutHook, transScheOutHook, currentLanguage, changeLanguage };
export default LanguageContext;
