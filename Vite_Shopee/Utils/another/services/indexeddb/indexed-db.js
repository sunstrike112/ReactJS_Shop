/* eslint-disable import/no-cycle */
import { validateBeforeTransaction } from './Utils';
import { createReadonlyTransaction } from './createReadonlyTransaction';
import { createReadwriteTransaction } from './createReadwriteTransaction';

const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

export function openDatabase(dbName, version, upgradeCallback) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, version);
    let db;

    request.onsuccess = () => {
      db = request.result;
      resolve(db);
    };

    request.onerror = () => {
      const error = new Error(`IndexedDB error: ${request.error}`);
      reject(error);
    };
    if (typeof upgradeCallback === 'function') {
      request.onupgradeneeded = (event) => {
        upgradeCallback(event, db);
      };
    }
  });
}

export function CreateObjectStore(dbName, version, storeSchemas) {
  const request = indexedDB.open(dbName, version);

  request.onupgradeneeded = function (event) {
    const database = event.target.result;
    storeSchemas.forEach((storeSchema) => {
      if (!database.objectStoreNames.contains(storeSchema.store)) {
        const objectStore = database.createObjectStore(storeSchema.store, storeSchema.storeConfig);
        storeSchema.storeSchema.forEach((schema) => {
          objectStore.createIndex(schema.name, schema.keypath, schema.options);
        });
      }
    });
    database.close();
  };

  request.onsuccess = function (event) {
    const database = event.target.result;
    const existingObjectStoreNames = Array.from(database.objectStoreNames);
    const storesToDelete = existingObjectStoreNames.filter(
      (name) => !storeSchemas.some((schema) => schema.store === name),
    );

    if (storesToDelete.length > 0) {
      const ver = 1; // Increase the version to trigger an upgrade
      database.close();
      const deleteRequest = indexedDB.deleteDatabase(dbName);
      deleteRequest.onerror = function () {
        console.error('Error deleting DB.');
      };

      deleteRequest.onsuccess = function () {
        console.log('DB deleted successfully.');
        CreateObjectStore(dbName, ver, storeSchemas);
      };
    } else {
      storeSchemas.forEach((storeSchema) => {
        if (!database.objectStoreNames.contains(storeSchema.store)) {
          const objectStore = database.createObjectStore(storeSchema.store, storeSchema.storeConfig);
          storeSchema.storeSchema.forEach((schema) => {
            objectStore.createIndex(schema.name, schema.keypath, schema.options);
          });
        }
      });
      database.close();
    }
  };
}

export function DBOperations(dbName, version, currentStore) {
  // Readonly operations
  const getAll = () =>
    new Promise((resolve, reject) => {
      openDatabase(dbName, version).then((db) => {
        validateBeforeTransaction(db, currentStore, reject);
        const { store } = createReadonlyTransaction(db, currentStore, resolve, reject);
        const request = store.getAll();

        request.onerror = (error) => reject(error);

        request.onsuccess = function ({ target: { result } }) {
          resolve(result);
        };
      });
    });

  const getByID = (id) =>
    new Promise((resolve, reject) => {
      openDatabase(dbName, version).then((db) => {
        validateBeforeTransaction(db, currentStore, reject);
        const { store } = createReadonlyTransaction(db, currentStore, resolve, reject);
        const request = store.get(id);

        request.onsuccess = function (event) {
          resolve(event.target.result);
        };
      });
    });

  const openCursor = (cursorCallback, keyRange) =>
    new Promise((resolve, reject) => {
      openDatabase(dbName, version).then((db) => {
        validateBeforeTransaction(db, currentStore, reject);
        const { store } = createReadonlyTransaction(db, currentStore, resolve, reject);
        const request = store.openCursor(keyRange);

        request.onsuccess = (event) => {
          cursorCallback(event);
          resolve();
        };
      });
    });

  const getByIndex = (indexName, key) =>
    new Promise((resolve, reject) => {
      openDatabase(dbName, version).then((db) => {
        validateBeforeTransaction(db, currentStore, reject);
        const { store } = createReadonlyTransaction(db, currentStore, resolve, reject);
        const index = store.index(indexName);
        const request = index.get(key);

        request.onsuccess = (event) => {
          resolve(event.target.result);
        };
      });
    });

  // Readwrite operations
  const add = (value, key) =>
    new Promise((resolve, reject) => {
      openDatabase(dbName, version).then((db) => {
        const { store } = createReadwriteTransaction(db, currentStore, resolve, reject);
        const request = store.add(value, key);

        request.onsuccess = (evt) => {
          key = evt.target.result;
          resolve(key);
        };

        request.onerror = (error) => reject(error);
      });
    });

  const update = (value, key) =>
    new Promise((resolve, reject) => {
      openDatabase(dbName, version).then((db) => {
        validateBeforeTransaction(db, currentStore, reject);
        const { transaction, store } = createReadwriteTransaction(db, currentStore, resolve, reject);

        transaction.oncomplete = (event) => resolve(event);

        store.put(value, key);
      });
    });

  const deleteRecord = (key) =>
    new Promise((resolve, reject) => {
      openDatabase(dbName, version).then((db) => {
        validateBeforeTransaction(db, currentStore, reject);
        const { store } = createReadwriteTransaction(db, currentStore, resolve, reject);
        const request = store.delete(key);

        request.onsuccess = (event) => resolve(event);
      });
    });

  const clear = () =>
    new Promise((resolve, reject) => {
      openDatabase(dbName, version).then((db) => {
        validateBeforeTransaction(db, currentStore, reject);
        const { store, transaction } = createReadwriteTransaction(db, currentStore, resolve, reject);

        transaction.oncomplete = () => resolve();

        store.clear();
      });
    });

  return {
    add,
    getByID,
    getAll,
    update,
    deleteRecord,
    clear,
    openCursor,
    getByIndex,
  };
}

export const DBMode = {
  readonly: 'readonly',
  readwrite: 'readwrite',
};
