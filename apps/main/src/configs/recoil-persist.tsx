import { recoilPersist } from 'recoil-persist';
import { RECOIL_KEY } from '../constants';

export const persistAtom = recoilPersist({
  key: RECOIL_KEY,
}).persistAtom;
