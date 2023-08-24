/* eslint-disable import/no-cycle */
import { createDatabaseTransaction } from './createDatabaseTransaction';
import { DBMode } from './indexed-db';

export function createReadwriteTransaction(database, store, resolve, reject) {
  return createDatabaseTransaction(database, DBMode.readwrite, store, resolve, reject);
}
