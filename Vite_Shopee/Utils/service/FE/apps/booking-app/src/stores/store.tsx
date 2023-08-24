import { atom, selector } from 'recoil';
import { persistAtom } from './recoil-persist';

export const storeState = atom({
  key: 'storeState', // unique ID (with respect to other atoms/selectors)
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const selectStoreState = selector({
  key: 'selectStore',
  get: ({ get }) => {
    return get(storeState);
  },
  set: ({ get, set }, store: any) => {
    set(storeState, store);
  },
});
