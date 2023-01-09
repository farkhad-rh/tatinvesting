import { lazy } from 'react'
import { Navigate, NonIndexRouteObject } from 'react-router-dom'

import { Routes } from './routes.enum'

import { Area } from '@components/layout'
import { PrivateRoute } from '@components/routing'

import Auth from '@views/Auth'

const LazyConfig = lazy(() => {
  return new Promise(resolve => {
    setTimeout(() => resolve(import('@views/Config')), 1000)
  })
})
const LazyResult = lazy(() => {
  return new Promise(resolve => {
    setTimeout(() => resolve(import('@views/Result')), 1000)
  })
})

export const routes: NonIndexRouteObject[] = [
  { path: Routes.AUTH, element: <Auth /> },
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
          { path: Routes.RESULT, element: <LazyResult /> },
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
