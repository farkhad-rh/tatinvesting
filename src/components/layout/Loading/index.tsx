import ImgLogo from '@images/logo-white.svg'
import ImgBackground from '@images/bg.jpg'

import styles from './Loading.module.scss'

const Loading = () => {
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
      </div>
    </>
  )
}

export default Loading
