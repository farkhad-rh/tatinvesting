import { atom, useRecoilState } from 'recoil'

import type { User, Actions } from './types'

const initialState: User = {
  login: null,
  password: null,
}

export const userState = atom<User>({
  key: 'user-state',
  default: initialState,
})

export const useUser = (): [User, Actions] => {
  const [user, setUser] = useRecoilState(userState)

  const createUser = (payload: User) => setUser(payload)

  const deleteUser = () => setUser(initialState)

  return [user, { createUser, deleteUser }]
}
