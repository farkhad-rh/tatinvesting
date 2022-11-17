import { Button } from '@material-tailwind/react'
import { UserCircleIcon } from '@heroicons/react/24/solid'

import { useAuth } from '@/store/auth'
import { useUser } from '@/store/user'

import ImgLogo from '@/assets/img/logo-color.svg'

import styles from './Header.module.scss'

const Header = () => {
  const [, { logout }] = useAuth()
  const [, { deleteUser }] = useUser()

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
