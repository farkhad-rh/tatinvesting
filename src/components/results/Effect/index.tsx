import { FC, PropsWithChildren } from 'react'

import { Typography } from '@material-tailwind/react'

import styles from './Effect.module.scss'

interface EffectProps extends PropsWithChildren {
  title?: string
}

const Effect: FC<EffectProps> = ({ title, children }) => {
  return (
    <div className={styles.wrapper}>
      <Typography
        variant='h4'
        color='blue-gray'
      >
        {title}
      </Typography>

      {children}
    </div>
  )
}

export default Effect
