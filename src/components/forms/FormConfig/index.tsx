import { FC, PropsWithChildren } from 'react'

import { Card, CardHeader, CardBody, Typography } from '@material-tailwind/react'

import styles from './FormConfig.module.scss'

interface FormConfigProps extends PropsWithChildren {
  title: string
}

const FormConfig: FC<FormConfigProps> = ({ title, children }) => {
  return (
    <Card>
      <CardHeader
        variant='gradient'
        color='blue'
        className={styles.head}
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
