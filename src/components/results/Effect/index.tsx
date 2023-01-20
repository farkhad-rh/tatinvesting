import { FC, PropsWithChildren } from 'react'

import { Typography } from '@material-tailwind/react'

import styles from './Effect.module.scss'

const Effect: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <Typography
        variant='h4'
        color='blue-gray'
      >
        Эффект проекта (PE)
      </Typography>

      {children}
    </div>
  )
}

export default Effect
