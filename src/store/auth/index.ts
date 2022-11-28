import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

import { StorageService } from '@services'

export const { persistAtom } = recoilPersist({ storage: StorageService('session') })

export const authState = atom<boolean>({
  key: 'auth-state',
  default: false,
  effects: [persistAtom],
})
