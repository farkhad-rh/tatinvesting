import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

import { IUser } from '@services'

import { StorageService } from '@services'

export const { persistAtom } = recoilPersist({ storage: StorageService('session') })

export const initialUserState: IUser = {
  login: null,
  password: null,
}

export const userState = atom<IUser>({
  key: 'user-state',
  default: initialUserState,
  effects: [persistAtom],
})
