import { FC } from 'react'

import { Typography } from '@material-tailwind/react'

import styles from './Single.module.scss'

interface SingleProps {
  label: string
  value?: string | number
}

const Single: FC<SingleProps> = ({ label, value }) => {
  return (
    <div className={styles.wrapper}>
      <Typography
        className={styles.label}
        variant='small'
      >
        {label}
      </Typography>

      <Typography
        variant='h4'
        color='blue-gray'
      >
        {value}
      </Typography>
    </div>
  )
}

export default Single
