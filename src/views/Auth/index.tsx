import { FormAuth } from '@/components/sections'

import ImgLogo from '@/assets/img/logo-white.svg'
import ImgBackground from '@/assets/img/bg.jpg'

import styles from './Auth.module.scss'

const Auth = () => {
  return (
    <>
      <div className={styles.overlay}>
        <img
          src={ImgBackground}
          className={styles.image}
        />
      </div>

      <div className={styles.wrapper}>
        <img
          src={ImgLogo}
          alt='TiNG'
          className={styles.logo}
        />

        <FormAuth />
      </div>
    </>
  )
}

export default Auth
