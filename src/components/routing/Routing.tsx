import { useRoutes } from 'react-router-dom'

import { routes } from '@routes'

import { ScrollToTop } from '@components/routing'

const Routing = () => {
  const routing = useRoutes(routes)

  return <ScrollToTop>{routing}</ScrollToTop>
}

export default Routing
