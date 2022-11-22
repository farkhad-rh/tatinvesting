import { FC, HTMLAttributes } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { Routes } from '@routes/routes.enum'

import { useAuth } from '@store/auth'
import { useUser } from '@store/user'

interface PrivateRouteProps extends HTMLAttributes<HTMLDivElement> {
  children?: JSX.Element
}

const PrivateRoute: FC<PrivateRouteProps> = ({ children }) => {
  const [auth] = useAuth()
  const [{ login, password }] = useUser()

  if (!auth && login !== import.meta.env.VITE_LOGIN && password !== import.meta.env.VITE_PASSWORD) {
    return (
      <Navigate
        to={Routes.AUTH}
        replace
      />
    )
  }

  return children ? children : <Outlet />
}

export default PrivateRoute
