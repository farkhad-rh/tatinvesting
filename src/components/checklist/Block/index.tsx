import { FC, PropsWithChildren } from 'react'

import { Typography } from '@material-tailwind/react'

import styles from './Block.module.scss'

interface BlockProps extends PropsWithChildren {
  title: string
}

const Block: FC<BlockProps> = ({ title, children }) => {
  return (
    <div className={styles.wrapper}>
      <Typography
        variant='h4'
        color='blue-gray'
        textGradient
      >
        {title}
      </Typography>

      <div className={styles.quetions}>{children}</div>
    </div>
  )
}

export default Block
