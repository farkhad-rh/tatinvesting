import { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'

import { routes } from '@routes'

import { ScrollToTop } from '@components/routing'

import { Loading } from '@components/layout'

const Routing = () => {
  const routing = useRoutes(routes)

  return (
    <Suspense fallback={<Loading />}>
      <ScrollToTop>{routing}</ScrollToTop>
    </Suspense>
  )
}

export default Routing
