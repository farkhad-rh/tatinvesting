import { lazy } from 'react'
import { Navigate, NonIndexRouteObject } from 'react-router-dom'

import { Routes } from './routes.enum'

import { Area } from '@components/layout'
import { PrivateRoute } from '@components/routing'

const LazyAuth = lazy(() => import('@views/Auth'))
const LazyConfig = lazy(() => import('@views/Config'))

export const routes: NonIndexRouteObject[] = [
  { path: Routes.AUTH, element: <LazyAuth /> },
  {
    element: <PrivateRoute />,
    children: [
      {
        path: '/',
        element: <Area />,
        children: [
          {
            index: true,
            element: (
              <Navigate
                to={Routes.CONFIG}
                replace
              />
            ),
          },
          { path: Routes.CONFIG, element: <LazyConfig /> },
          { path: Routes.RESULT, element: <p>Result</p> },
        ],
      },
      {
        path: '*',
        element: (
          <Navigate
            to={Routes.CONFIG}
            replace
          />
        ),
      },
    ],
  },
  { path: '*', element: <PrivateRoute /> },
]
