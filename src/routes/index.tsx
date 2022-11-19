import { lazy } from 'react'
import { Navigate, NonIndexRouteObject } from 'react-router-dom'

import { AUTH_ROUTE, CONFIG_ROUTE, RESULT_ROUTE } from '@constants'

import { Area, PrivateRoute } from '@components/layout'

const LazyAuth = lazy(() => import('@views/Auth'))
const LazyConfig = lazy(() => import('@views/Config'))

export const routes: NonIndexRouteObject[] = [
  { path: AUTH_ROUTE, element: <LazyAuth /> },
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
                to={CONFIG_ROUTE}
                replace
              />
            ),
          },
          { path: CONFIG_ROUTE, element: <LazyConfig /> },
          { path: RESULT_ROUTE, element: <p>Result</p> },
        ],
      },
      {
        path: '*',
        element: (
          <Navigate
            to={CONFIG_ROUTE}
            replace
          />
        ),
      },
    ],
  },
  { path: '*', element: <PrivateRoute /> },
]
