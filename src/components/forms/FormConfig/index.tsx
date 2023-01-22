import { FC, PropsWithChildren } from 'react'

import { Card, CardHeader, CardBody, Typography } from '@material-tailwind/react'
import clsx from 'clsx'

import styles from './FormConfig.module.scss'

interface FormConfigProps extends PropsWithChildren {
  title: string
  classes?: string
}

const FormConfig: FC<FormConfigProps> = ({ title, children, classes }) => {
  return (
    <Card className={clsx(styles.wrapper, classes)}>
      <CardHeader
        className={styles.head}
        variant='gradient'
        color='blue'
      >
        <Typography
          variant='h6'
          color='white'
        >
          {title}
        </Typography>
      </CardHeader>

      <CardBody className={styles.body}>{children}</CardBody>
    </Card>
  )
}

export default FormConfig
