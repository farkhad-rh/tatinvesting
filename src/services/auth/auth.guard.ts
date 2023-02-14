import { ADMIN, ADMINPASS, USER, USERPASS } from '@constants'
import { useAuthService, useUserService } from '@services'

export const useAuthGuard = () => {
  const [auth] = useAuthService()
  const [{ login, password }] = useUserService()

  const authGuard =
    (auth && login === ADMIN && password === ADMINPASS) || (login === USER && password === USERPASS)

  return authGuard
}
