import { useRecoilState } from 'recoil'

import { authState } from '@store'

import { IAuthActions } from './auth.interface'

export const useAuthService = (): [boolean, IAuthActions] => {
  const [auth, setAuth] = useRecoilState(authState)

  const login = () => setAuth(true)

  const logout = () => setAuth(false)

  return [auth, { login, logout }]
}
