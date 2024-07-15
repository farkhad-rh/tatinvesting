import { FC, HTMLAttributes } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { Routes } from '@routes/routes.enum'

import { useAuthGuard } from '@services'

interface PrivateRouteProps extends HTMLAttributes<HTMLDivElement> {
  children?: JSX.Element
}

const PrivateRoute: FC<PrivateRouteProps> = ({ children }) => {
  const { authAdmin, authGuard } = useAuthGuard()

  if (!authGuard) {
    return (
      <Navigate
        to={Routes.AUTH}
        replace
      />
    )
  }

  if (!authAdmin && children) {
    return (
      <Navigate
        to={Routes.CONFIGS}
        replace
      />
    )
  }

  return children ? children : <Outlet />
}

export default PrivateRoute
