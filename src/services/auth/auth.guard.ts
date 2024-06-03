import { ADMIN, ADMINPASS } from '@constants'
import { useAuthService, useUserService } from '@services'

export const useAuthGuard = () => {
  const [auth] = useAuthService()
  const [{ login, password }] = useUserService()

  const authGuard = auth && login === ADMIN && password === ADMINPASS

  return authGuard
}
