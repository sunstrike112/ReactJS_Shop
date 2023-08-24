import { AbilityProvider } from 'dhm/contexts/AbilityContext';
import DHMRoutes from 'dhm/routes';
import { useContext } from 'react';
import { I18nextProvider } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { LoadingAnimation } from './components/Loading/LoadingAnimation';
import { DHMContext } from './contexts';
import { AuthContext, AuthContextProvider } from './contexts/AuthContext';
import { ResponsiveProvider } from './contexts/ResponsiveContext';
import { ThemeProviderCharka } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/TranslateContext';
import i18n from './translate';
import { LocalStore } from './utils';

const { AppRoutes, AuthRoutes } = DHMRoutes;
function App() {
  const { isLogin } = useContext(AuthContext);
  const { user } = useSelector((state) => state.auth);
  return isLogin ? (
    <Routes>
      <Route path='*' element={<AppRoutes userRole={user.role} />} />
    </Routes>
  ) : (
    <AuthRoutes />
  );
}

function AppWithContext() {
  const { isVerifyLogin } = useSelector((state) => state.auth);
  const { isExits } = LocalStore;
  return (
    <ThemeProviderCharka>
      <I18nextProvider i18n={i18n}>
        <LanguageProvider>
          <AuthContextProvider>
            <AbilityProvider>
              {(!isExits('access_token') && !isVerifyLogin) || (isVerifyLogin && isExits('access_token')) ? (
                <DHMContext.App.Provider>
                  <ResponsiveProvider>
                    <App />
                  </ResponsiveProvider>
                </DHMContext.App.Provider>
              ) : (
                <LoadingAnimation position='fixed' top='50%' left='50%' />
              )}
            </AbilityProvider>
          </AuthContextProvider>
        </LanguageProvider>
      </I18nextProvider>
    </ThemeProviderCharka>
  );
}

export default AppWithContext;
