import { FormAuth } from '@components/forms'

import { Background } from '@components/layout'

import ImgLogo from '@images/logo-white.svg'
import ImgBackground from '@images/bg.jpg'

import styles from './Auth.module.scss'

const Auth = () => {
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
