import { lazy } from 'react'
import { Navigate, NonIndexRouteObject } from 'react-router-dom'

import { Routes } from './routes.enum'

import { Area } from '@components/layout'
import { PrivateRoute } from '@components/routing'

import { Auth, Configs, Results, Dev, Charts, Checklist } from '@views'

const LazyResults = lazy(() => import('@views/Results'))
const LazyCharts = lazy(() => import('@views/Charts'))

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
          {
            path: Routes.DEV,
            element: (
              <PrivateRoute>
                <Dev />
              </PrivateRoute>
            ),
          },
          { path: Routes.CHARTS, element: <LazyCharts /> },
          { path: Routes.CHECKLIST, element: <Checklist /> },
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
