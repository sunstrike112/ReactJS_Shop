import { recoilPersist } from 'recoil-persist'
import { RECOIL_KEY } from '@ss-fe-fw/constants';

export const persistAtom = recoilPersist({
  key: RECOIL_KEY, // this key is using to store data in local storage
}).persistAtom
