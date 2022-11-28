import { useAuthService, useUserService } from '@services'

export const useAuthGuard = () => {
  const [auth] = useAuthService()
  const [{ login, password }] = useUserService()

  const guard =
    auth && login === import.meta.env.VITE_LOGIN && password === import.meta.env.VITE_PASSWORD

  return guard
}
