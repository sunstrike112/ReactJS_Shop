import { API_APP } from 'dhm/apis/index';
import { postImportJSON } from './fetch';

const uploadCsvCodeMaster = (form) =>
  postImportJSON(`${import.meta.env.VITE_APP_API_URL}/${API_APP.codeMaster.importCsv}`, form);

export { uploadCsvCodeMaster };
