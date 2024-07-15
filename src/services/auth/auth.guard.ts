import { ADMIN, ADMINPASS, USER, USERPASS } from '@constants'
import { useAuthService, useUserService } from '@services'

export const useAuthGuard = () => {
  const [auth] = useAuthService()
  const [{ login, password }] = useUserService()

  const authAdmin = login === ADMIN && password === ADMINPASS
  const authUser = login === USER && password === USERPASS
  const authGuard = auth && (authAdmin || authUser)

  return {
    authAdmin,
    authGuard,
  }
}
