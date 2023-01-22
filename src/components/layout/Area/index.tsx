import { Outlet } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'

import { useUserController } from '@services'

import { Background, Header, Main } from '@components/layout'

import styles from './Area.module.scss'

const Area = () => {
  const { user } = useUserController()

  return (
    <div className={styles.area}>
      <Header />

      <Main>
        <Outlet />
      </Main>

      {user?.background && (
        <Background
          quantity={100}
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
