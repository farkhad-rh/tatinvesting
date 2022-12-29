import { FC, PropsWithChildren } from 'react'

import { Card, CardHeader, CardBody, Typography } from '@material-tailwind/react'

import ImgBackground from '@images/bg.jpg'

import styles from './ResultInfo.module.scss'

interface ResultInfoProps extends PropsWithChildren {
  label: string
  value?: string | number
}

const ResultInfo: FC<ResultInfoProps> = ({ label, value }) => {
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

export default ResultInfo
