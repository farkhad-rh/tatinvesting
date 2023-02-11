import { Navigate, NonIndexRouteObject } from 'react-router-dom'

import { Routes } from './routes.enum'

import { Area } from '@components/layout'
import { PrivateRoute } from '@components/routing'

import { Auth, Configs, Results, Dev, Charts } from '@views'

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
                to={Routes.CONFIGS}
                replace
              />
            ),
          },
          { path: Routes.CONFIGS, element: <Configs /> },
          { path: Routes.RESULTS, element: <Results /> },
          { path: Routes.DEV, element: <Dev /> },
          { path: Routes.CHARTS, element: <Charts /> },
        ],
      },
      {
        path: '*',
        element: (
          <Navigate
            to={Routes.CONFIGS}
            replace
          />
        ),
      },
    ],
  },
  { path: '*', element: <PrivateRoute /> },
]
