import { atom } from 'recoil';
import { persistAtom } from '../configs/recoil-persist';

export const userState = atom({
  key: 'userState',
  default: null,
  effects_UNSTABLE: [persistAtom],
});
