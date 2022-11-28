import { Button } from '@material-tailwind/react'
import { UserCircleIcon } from '@heroicons/react/24/solid'

import { useAuthService, useUserService } from '@services'

import ImgLogo from '@images/logo-color.svg'

import styles from './Header.module.scss'

const Header = () => {
  const [, { logout }] = useAuthService()
  const [, { deleteUser }] = useUserService()

  const handleLogout = async () => {
    await logout()
    await deleteUser()
  }

  return (
    <header className={styles.header}>
      <img
        className={styles.logo}
        src={ImgLogo}
        alt='TiNG'
      />

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
