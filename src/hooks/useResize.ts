import { useEffect, useState } from 'react'

export const useResize = () => {
  const [windowSize, setWindowSize] = useState({
    width: 1980,
    height: 1020,
  })

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize)

    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowSize
}
