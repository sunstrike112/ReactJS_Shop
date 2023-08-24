import {
  atom,
  selector,
} from 'recoil';
import { persistAtom } from '@ss-fe-fw/configs';

export const timezoneState = atom({
  key: 'timezoneState', // unique ID (with respect to other atoms/selectors)
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const currentTimezoneState = selector({
  key: 'currentTimezoneState', // unique ID (with respect to other atoms/selectors)
  get: ({get}) => {
    return get(timezoneState)
  },
});
