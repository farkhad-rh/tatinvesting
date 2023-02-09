import { FC, PropsWithChildren } from 'react'

import { Card, CardHeader, CardBody, Typography } from '@material-tailwind/react'

import styles from './Block.module.scss'

interface BlockProps extends PropsWithChildren {
  title: string
  description: string
}

const Block: FC<BlockProps> = ({ title, description, children }) => {
  return (
    <Card className={styles.wrapper}>
      <CardHeader
        variant='gradient'
        color='blue'
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
