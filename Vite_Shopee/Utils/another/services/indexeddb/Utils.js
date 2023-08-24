export function validateStoreName(db, storeName) {
  return db.objectStoreNames.contains(storeName);
}

export function validateBeforeTransaction(db, storeName, reject) {
  if (!db) {
    reject('You need to use the openDatabase function to create a database before you query it!');
  }
  if (!validateStoreName(db, storeName)) {
    reject(`objectStore does not exist: ${storeName}`);
  }
}

export function createTransaction(db, options) {
  const trans = db.transaction(options.storeName, options.dbMode);
  trans.onerror = options.error;
  trans.oncomplete = options.complete;
  trans.onabort = options.abort;
  return trans;
}

export function optionsGenerator(type, storeName, reject, resolve) {
  return {
    storeName,
    dbMode: type,
    error: (e) => {
      reject(e);
    },
    complete: () => {
      resolve();
    },
    abort: (e) => {
      reject(e);
    },
  };
}
