import { Navigate, NonIndexRouteObject } from 'react-router-dom'

import { Routes } from './routes.enum'

import { Area } from '@components/layout'
import { PrivateRoute } from '@components/routing'

import Auth from '@views/Auth'
import Config from '@views/Config'
import Result from '@views/Result'

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
          { path: Routes.CONFIG, element: <Config /> },
          { path: Routes.RESULT, element: <Result /> },
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
