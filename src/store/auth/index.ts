import { atom } from 'recoil'

import { persistAtom } from '@services'

export const authState = atom<boolean>({
  key: 'auth-state',
  default: false,
  effects: [persistAtom],
})
