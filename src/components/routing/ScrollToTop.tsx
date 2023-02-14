import { FC, PropsWithChildren, useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToTop: FC<PropsWithChildren> = ({ children }) => {
  const { pathname } = useLocation()

  useLayoutEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      // behavior: 'smooth',
    })
  }, [pathname])

  return <>{children}</>
}

export default ScrollToTop
