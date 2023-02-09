import { Typography } from '@material-tailwind/react'

import { useAuthController } from '@services'

import { Background } from '@components/layout'

import ImgLogo from '@images/logo-white.svg'
import ImgBackground from '@images/bg.jpg'

import styles from './Responsive.module.scss'

const Responsive = () => {
  const { handleLogout } = useAuthController()

  return (
    <>
      <div className={styles.overlay}>
        <img
          src={ImgBackground}
          className={styles.image}
        />

        <Background />
      </div>

      <div className={styles.wrapper}>
        <div className={styles.message}>
          <img
            src={ImgLogo}
            alt='TiNG'
            className={styles.logo}
            onClick={handleLogout}
          />

          <Typography
            variant='h5'
            color='white'
            className={styles.text}
          >
            Адаптация в разработке <span className={styles.dot}>.</span>
            <span className={styles.dot}>.</span>
            <span className={styles.dot}>.</span>
          </Typography>
        </div>
      </div>
    </>
  )
}

export default Responsive
