import { atom, useRecoilState } from 'recoil'
import { recoilPersist } from 'recoil-persist'

import { LocalStorageBase64 } from '@services'

import type { Actions } from './types'

export const { persistAtom } = recoilPersist({ storage: LocalStorageBase64() })

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
