import { Outlet } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'

import { Header, Main } from '@components/layout'

import styles from './Area.module.scss'

const Area = () => {
  return (
    <div className={styles.area}>
      <Header />

      <Main>
        <Outlet />
      </Main>
    </div>
  )
}

export default Area
