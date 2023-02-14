import { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'

import { Analytics } from '@vercel/analytics/react'

import { routes } from '@routes'

import { ScrollToTop } from '@components/routing'

import { Loading } from '@components/layout'

const Routing = () => {
  const routing = useRoutes(routes)

  return (
    <>
      <Suspense fallback={<Loading />}>
        <ScrollToTop>{routing}</ScrollToTop>
      </Suspense>
      <Analytics mode={'production'} />
    </>
  )
}

export default Routing
