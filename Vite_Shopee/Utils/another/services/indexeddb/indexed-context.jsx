import React, { createContext, useContext } from 'react';
import { DBOperations, openDatabase } from './indexed-db';

const IndexedDBContext = createContext({
  db: null,
  name: null,
  version: null,
});

const IndexedDBProvider = IndexedDBContext.Provider;

export function IndexedDB({ name, version, children, objectStoresMeta }) {
  objectStoresMeta.forEach(async (storeMeta) => {
    await openDatabase(name, version, (event) => {
      const db = event.currentTarget.result;
      const objectStore = db.createObjectStore(storeMeta.store, storeMeta.storeConfig);
      storeMeta.storeSchema.forEach((schema) => {
        objectStore.createIndex(schema.name, schema.keypath, schema.options);
      });
    });
  });
  return <IndexedDBProvider value={{ db: null, name, version }}>{children}</IndexedDBProvider>;
}

export function AccessDB({ children, objectStore }) {
  const { db, name, version } = useContext(IndexedDBContext);
  return children({ db, ...DBOperations(name, version, objectStore) });
}
