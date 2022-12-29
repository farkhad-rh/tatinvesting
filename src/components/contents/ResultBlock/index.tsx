import { FC, PropsWithChildren } from 'react'

import { Card, CardHeader, CardBody, Typography } from '@material-tailwind/react'

import ImgBackground from '@images/bg.jpg'

import styles from './ResultBlock.module.scss'

interface ResultBlockProps extends PropsWithChildren {
  title: string
}

const ResultBlock: FC<ResultBlockProps> = ({ title, children }) => {
  return (
    <div>
      <div className={styles.background}>
        <img
          src={ImgBackground}
          className={styles.image}
        />
        <div className={styles.overlay}>
          <Typography
            variant='h2'
            color='white'
          >
            {title}
          </Typography>
        </div>
      </div>
      <Card className={styles.card}>
        <CardBody className={styles.body}>{children}</CardBody>
      </Card>
    </div>
  )
}

export default ResultBlock
