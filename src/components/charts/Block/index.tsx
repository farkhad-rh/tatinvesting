import { FC, PropsWithChildren } from 'react'

import { Card, CardHeader, CardBody, Typography } from '@material-tailwind/react'
import type { CardHeaderProps } from '@material-tailwind/react'

import styles from './Block.module.scss'

interface BlockProps extends PropsWithChildren {
  title: string
  description: string
  color?: CardHeaderProps['color']
}

const Block: FC<BlockProps> = ({ title, description, color = 'blue', children }) => {
  return (
    <Card className={styles.wrapper}>
      <CardHeader
        variant='gradient'
        color={color}
      >
        {children}
      </CardHeader>

      <CardBody className={styles.body}>
        <Typography
          variant='h6'
          color='blue-gray'
        >
          {title}
        </Typography>

        <Typography
          className={styles.description}
          variant='small'
        >
          {description}
        </Typography>
      </CardBody>
    </Card>
  )
}

export default Block
