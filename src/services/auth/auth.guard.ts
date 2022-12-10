import { LOGIN, PASSWORD } from '@constants'
import { useAuthService, useUserService } from '@services'

export const useAuthGuard = () => {
  const [auth] = useAuthService()
  const [{ login, password }] = useUserService()

  const authGuard = auth && login === LOGIN && password === PASSWORD

  return authGuard
}
