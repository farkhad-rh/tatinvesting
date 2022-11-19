import { useRoutes } from 'react-router-dom'

import { routes } from '@routes'

const Routing = () => {
  const routing = useRoutes(routes)

  return routing
}

export default Routing
