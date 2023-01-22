import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

import { LOGIN, PASSWORD } from '@constants'
import { useAuthService, useUserService, IUser } from '@services'

export const useAuthController = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUser>({ mode: 'onChange' })

  const [, { login, logout }] = useAuthService()
  const [, { createUser, deleteUser }] = useUserService()

  const [isErorr, setError] = useState(false)

  const handleLogin: SubmitHandler<IUser> = async user => {
    const authValidate = user?.login === LOGIN && user?.password === PASSWORD

    if (authValidate) {
      await login()
      await createUser({ ...user, background: true })

      setError(false)

      return
    }

    setError(true)
  }

  const handleLogout = async () => {
    await logout()
    await deleteUser()
  }

  return { register, handleSubmit, handleLogin, handleLogout, errors, isErorr, setError }
}
