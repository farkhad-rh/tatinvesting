import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

import { StorageService } from '@services'

export const { persistAtom: persistAuth } = recoilPersist({
  key: 'recoil-persist-auth',
  storage: StorageService('local'),
})

export const authState = atom<boolean>({
  key: 'auth-state',
  default: false,
  effects: [persistAuth],
})
