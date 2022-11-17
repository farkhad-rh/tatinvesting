import { atom, useRecoilState } from 'recoil'

import { persistAtom } from '@/store/persist'

import type { Actions } from './types'

export const authState = atom<boolean>({
  key: 'auth-state',
  default: false,
  effects: [persistAtom],
})

export const useAuth = (): [boolean, Actions] => {
  const [auth, setAuth] = useRecoilState(authState)

  const login = () => setAuth(true)

  const logout = () => setAuth(false)

  return [auth, { login, logout }]
}
