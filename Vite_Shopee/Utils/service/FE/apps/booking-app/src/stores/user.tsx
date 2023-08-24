import { atom } from 'recoil';
import { persistAtom } from './recoil-persist';

export const userState = atom({
  key: 'userState', // unique ID (with respect to other atoms/selectors)
  default: null,
  effects_UNSTABLE: [persistAtom],
});
