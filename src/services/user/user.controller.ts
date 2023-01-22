import { useUserService, IUser } from '@services'

export const useUserController = () => {
  const [user, { toggleBackground }] = useUserService()

  const handleBackground = (background: IUser['background']) => {
    toggleBackground(background)
  }

  return { user, handleBackground }
}
