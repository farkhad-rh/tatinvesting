import { Outlet } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'

import { useResize } from '@hooks/useResize'

import { useUserController } from '@services'

import { Background, Header, Main, Responsive } from '@components/layout'

import styles from './Area.module.scss'

const Area = () => {
  const { width } = useResize()

  const { user } = useUserController()

  if (width < 1152) {
    return <Responsive />
  }

  return (
    <div className={styles.area}>
      <Header />

      <Main>
        <Outlet />
      </Main>

      {user?.background && (
        <Background
          quantity={80}
          pushQuantity={1}
          particleColor='#3578e5'
          linkColor='#3578e5'
          delay={false}
        />
      )}
    </div>
  )
}

export default Area
