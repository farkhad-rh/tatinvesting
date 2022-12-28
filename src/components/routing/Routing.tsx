import { useRoutes } from 'react-router-dom'

import { routes } from '@routes'

import { ScrollToTop } from '@components/routing'
import { Suspense } from 'react'

const Routing = () => {
  const routing = useRoutes(routes)

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ScrollToTop>{routing}</ScrollToTop>
    </Suspense>
  )
}

export default Routing
