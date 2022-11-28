import { FC, HTMLAttributes } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { Routes } from '@routes/routes.enum'

import { useAuthGuard } from '@services'

interface PrivateRouteProps extends HTMLAttributes<HTMLDivElement> {
  children?: JSX.Element
}

const PrivateRoute: FC<PrivateRouteProps> = ({ children }) => {
  const guard = useAuthGuard()

  if (!guard) {
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
