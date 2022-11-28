import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Button,
  Typography,
  Alert,
} from '@material-tailwind/react'
import { InformationCircleIcon } from '@heroicons/react/24/outline'

import { useAuthService, useAuthGuard, useUserService, IUser } from '@services'

import styles from './FormAuth.module.scss'

const FormAuth = () => {
  const {
    register,
    handleSubmit: onSubmit,
    formState: { errors },
    reset,
  } = useForm<IUser>({ mode: 'onChange' })

  const [, { login }] = useAuthService()
  const [, { createUser }] = useUserService()
  const guard = useAuthGuard()

  const [error, setError] = useState(false)

  const handleSubmit: SubmitHandler<IUser> = async user => {
    if (
      user?.login === import.meta.env.VITE_LOGIN &&
      user?.password === import.meta.env.VITE_PASSWORD
    ) {
      await login()
      await createUser(user)

      setError(false)

      return
    }

    setError(true)
    reset()
  }

  if (guard) {
    return (
      <Navigate
        to='/'
        replace
      />
    )
  }

  return (
    <form
      className={styles.form}
      onSubmit={onSubmit(handleSubmit)}
    >
      <Card className={styles.form}>
        <CardHeader
          className={styles.head}
          variant='gradient'
          color='blue'
        >
          <Typography
            variant='h3'
            color='white'
          >
            Авторизация
          </Typography>
        </CardHeader>

        <CardBody className={styles.body}>
          <Input
            type='text'
            label='Логин'
            size='lg'
            error={Boolean(errors?.login)}
            {...register('login', { required: true })}
          />

          <Input
            type='password'
            label='Пароль'
            size='lg'
            error={Boolean(errors?.password)}
            {...register('password', { required: true })}
          />

          <Alert
            icon={
              <InformationCircleIcon
                strokeWidth={2}
                className={styles.icon}
              />
            }
            show={error}
            dismissible={{
              onClose: () => setError(false),
            }}
            color='red'
          >
            Пользователь не найден
          </Alert>
        </CardBody>

        <CardFooter className={styles.foot}>
          <Button
            type='submit'
            variant='gradient'
            fullWidth
          >
            Войти
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}

export default FormAuth
