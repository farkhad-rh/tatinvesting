import { useRecoilState } from 'recoil'

import { initialUserState, userState } from '@store'

import { IUser, IUserActions } from './user.interface'

export const useUserService = (): [IUser, IUserActions] => {
  const [user, setUser] = useRecoilState(userState)

  const createUser = (payload: IUser) => setUser(payload)

  const deleteUser = () => setUser(initialUserState)

  return [user, { createUser, deleteUser }]
}
