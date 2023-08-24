import {
  atom,
} from 'recoil';
import { persistAtom } from '@ss-fe-fw/configs';

export const userState = atom({
  key: 'userState', // unique ID (with respect to other atoms/selectors)
  default: null,
  effects_UNSTABLE: [persistAtom],
});

