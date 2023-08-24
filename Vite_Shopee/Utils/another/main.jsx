'use client';

import 'rc-tree/assets/index.css';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import 'react-datepicker/dist/react-datepicker.css';
import ReactDOM from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ErrorFallback } from './components/errorBoundary/ErrorFallback';
import { DBConfig, initDB } from './services/indexeddb';
import store from './store/store';

initDB(DBConfig);
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <App />
      </ErrorBoundary>
    </BrowserRouter>
  </Provider>,
);
