import { atom } from 'recoil'

import { persistAtom, IUser } from '@services'

export const initialUserState: IUser = {
  login: null,
  password: null,
}

export const userState = atom<IUser>({
  key: 'user-state',
  default: initialUserState,
  effects: [persistAtom],
})
