import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

import { ADMIN, ADMINPASS, USER, USERPASS } from '@constants'
import {
  useAuthService,
  useUserService,
  IUser,
  usePeriodService,
  useFinanceService,
  useEffectService,
  useParamsService,
  useCalculateService,
  useChecklistService,
} from '@services'

export const useAuthController = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUser>({ mode: 'onChange' })

  const [, { login, logout }] = useAuthService()
  const [, { createUser, deleteUser }] = useUserService()
  const [, { deletePeriod }] = usePeriodService()
  const [, { deleteFinance }] = useFinanceService()
  const [, { deleteEffect }] = useEffectService()
  const [, { deleteParams }] = useParamsService()
  const [, { deleteCalculate }] = useCalculateService()
  const [, { deleteChecklist }] = useChecklistService()

  const [isErorr, setError] = useState(false)

  const handleLogin: SubmitHandler<IUser> = async user => {
    const authValidate =
      (user?.login === ADMIN && user?.password === ADMINPASS) ||
      (user?.login === USER && user?.password === USERPASS)

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
    await deletePeriod()
    await deleteFinance()
    await deleteEffect()
    await deleteParams()
    await deleteCalculate()
    await deleteChecklist()
  }

  return { register, handleSubmit, handleLogin, handleLogout, errors, isErorr, setError }
}
