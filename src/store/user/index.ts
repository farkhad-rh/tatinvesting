import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

import { StorageService, IUser } from '@services'

export const { persistAtom: persistUser } = recoilPersist({
  key: 'recoil-persist-user',
  storage: StorageService('local'),
})

export const initialUserState: IUser = {
  login: null,
  password: null,
  background: true,
}

export const userState = atom<IUser>({
  key: 'user-state',
  default: initialUserState,
  effects: [persistUser],
})
