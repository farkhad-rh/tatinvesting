import { TypeAnimation } from 'react-type-animation'

import { Button, Switch } from '@material-tailwind/react'
import { UserCircleIcon } from '@heroicons/react/24/solid'

import { useAuthController, useUserController } from '@services'

import ImgLogo from '@images/logo-color.svg'

import styles from './Header.module.scss'

const Header = () => {
  const { handleLogout } = useAuthController()
  const { user, handleBackground } = useUserController()

  return (
    <header className={styles.header}>
      <img
        className={styles.logo}
        src={ImgLogo}
        alt='TiNG'
      />

      <div className={styles.developed}>
        <TypeAnimation
          sequence={[
            'Разработано: Идрисов А.Р.',
            2000,
            'Разработано: Ризванов Ф.Х.',
            2000,
            'Разработано: Садыков Д.М.',
            2000,
          ]}
          speed={50}
          wrapper='h2'
          repeat={Infinity}
        />
      </div>

      <div className={styles.toggle}>
        <Switch
          label='Фон'
          defaultChecked={user?.background}
          labelProps={{
            className: styles.label,
          }}
          onChange={event => handleBackground(event?.target?.checked)}
        />
      </div>

      <Button
        className={styles.button}
        variant='text'
        onClick={handleLogout}
      >
        <UserCircleIcon
          className={styles.icon}
          color='blue-light'
        />
        Выйти
      </Button>
    </header>
  )
}

export default Header
