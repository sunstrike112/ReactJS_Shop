import { createTransaction as defaultCreateTransaction, optionsGenerator as defaultOptionsBuilder } from './Utils';

export function createDatabaseTransaction(
  database,
  mode,
  storeName,
  resolve,
  reject,
  createTransaction = defaultCreateTransaction,
  buildOptions = defaultOptionsBuilder,
) {
  const options = buildOptions(mode, storeName, reject, resolve);
  const transaction = createTransaction(database, options);
  const store = transaction.objectStore(storeName);

  return {
    store,
    transaction,
  };
}
