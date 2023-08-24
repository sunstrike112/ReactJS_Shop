/* eslint-disable import/no-cycle */
import { DBMode } from './indexed-db';
import { createDatabaseTransaction } from './createDatabaseTransaction';

export function createReadonlyTransaction(database, store, resolve, reject) {
  return createDatabaseTransaction(database, DBMode.readonly, store, resolve, reject);
}
