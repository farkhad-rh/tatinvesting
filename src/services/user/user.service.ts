import { useRecoilState } from 'recoil'

import { initialUserState, userState } from '@store'

import { IUser, IUserActions } from './user.interface'

export const useUserService = (): [IUser, IUserActions] => {
  const [user, setUser] = useRecoilState(userState)

  const createUser = (payload: IUser) =>
    setUser(prev => {
      return { ...payload, background: prev?.background }
    })

  const toggleBackground = (payload: IUser['background']) =>
    setUser({ ...user, background: payload })

  const deleteUser = () =>
    setUser(prev => {
      return { ...initialUserState, background: prev?.background }
    })

  return [user, { createUser, toggleBackground, deleteUser }]
}
