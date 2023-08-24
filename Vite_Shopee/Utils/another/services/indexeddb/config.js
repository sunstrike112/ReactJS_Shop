const DB_STORE = 'DHM_DB_APP';
const DB_LIST_FILTER = 'DB_LIST_FILTER';
const DB_LIST_FILTER_CHECKED = 'DB_LIST_FILTER_CHECKED';
const DB_LIST_DEFAULT_CHECKED = 'DB_LIST_DEFAULT_CHECKED';

export const DBConfig = {
  name: DB_STORE,
  version: 10,
  objectStoresMeta: [
    {
      store: DB_LIST_FILTER,
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [],
    },
    {
      store: DB_LIST_FILTER_CHECKED,
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [],
    },
    {
      store: DB_LIST_DEFAULT_CHECKED,
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [],
    },
  ],
};
export { DB_LIST_FILTER, DB_STORE, DB_LIST_FILTER_CHECKED, DB_LIST_DEFAULT_CHECKED };
