import { FC, PropsWithChildren } from 'react'

import { Card, CardBody, Typography } from '@material-tailwind/react'

import ImgBackground from '@images/bg.jpg'

import styles from './Section.module.scss'

interface SectionProps extends PropsWithChildren {
  title: string
}

const Section: FC<SectionProps> = ({ title, children }) => {
  return (
    <div className={styles.wrapper}>
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

export default Section
