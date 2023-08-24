import { useMemo } from 'react';
import { DBOperations, CreateObjectStore } from './indexed-db';

const indexeddbConfiguration = {
  version: null,
  name: null,
};

function initDB({ name, version, objectStoresMeta }) {
  indexeddbConfiguration.name = name;
  indexeddbConfiguration.version = version;
  Object.freeze(indexeddbConfiguration);
  CreateObjectStore(name, version, objectStoresMeta);
}

function useIndexedDB(objectStore) {
  if (!indexeddbConfiguration.name || !indexeddbConfiguration.version) {
    throw new Error('Please, initialize the DB before the use.');
  }
  return useMemo(
    () => DBOperations(indexeddbConfiguration.name, indexeddbConfiguration.version, objectStore),
    [indexeddbConfiguration, objectStore],
  );
}

export { initDB, useIndexedDB };
