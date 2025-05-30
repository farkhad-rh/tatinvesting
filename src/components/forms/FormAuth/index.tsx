import { Navigate } from 'react-router-dom'

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

import { useAuthGuard, useAuthController } from '@services'

import styles from './FormAuth.module.scss'

const FormAuth = () => {
  const { authGuard } = useAuthGuard()
  const { register, handleSubmit, handleLogin, errors, isError, setError } = useAuthController()

  if (authGuard) {
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
      onSubmit={handleSubmit(handleLogin)}
    >
      <Card color='transparent'>
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
            color='blue'
            error={Boolean(errors?.login)}
            onInput={() => setError(false)}
            {...register('login', { required: true })}
          />

          <Input
            type='password'
            label='Пароль'
            size='lg'
            color='blue'
            error={Boolean(errors?.password)}
            onInput={() => setError(false)}
            {...register('password', { required: true })}
          />

          <Alert
            icon={
              <InformationCircleIcon
                strokeWidth={2}
                className={styles.icon}
              />
            }
            open={isError}
            onClose={() => setError(false)}
            color='red'
          >
            Пользователь не найден
          </Alert>
        </CardBody>

        <CardFooter className={styles.foot}>
          <Button
            type='submit'
            variant='gradient'
            color='blue'
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
