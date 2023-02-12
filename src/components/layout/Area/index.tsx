import { useEffect, useRef } from 'react'
import { Outlet } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'

import { useResize } from '@hooks/useResize'

import { useUserController } from '@services'

import { Background, Header, Main, Responsive } from '@components/layout'

import styles from './Area.module.scss'
import LoadingBar from 'react-top-loading-bar'

const Area = () => {
  const ref: any = useRef(null)

  const { width } = useResize()

  const { user } = useUserController()

  useEffect(() => {
    ref?.current?.continuousStart()
  }, [])

  if (width < 1152) {
    return <Responsive />
  }

  return (
    <div className={styles.area}>
      <LoadingBar
        ref={ref}
        color='#3578e5'
        shadowStyle={{
          boxShadow: '#3578e5 0px 0px 10px, #3578e5 0px 0px 10px',
        }}
        shadow
      />

      <Header />

      <Main>
        <Outlet context={[ref]} />
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
