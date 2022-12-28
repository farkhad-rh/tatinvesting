import { Typography } from '@material-tailwind/react'

import styles from './Result.module.scss'

const Result = () => {
  return (
    <>
      <Typography
        className={styles.title}
        variant='h1'
        color='blue'
        textGradient
      >
        Результат вычислений
      </Typography>
    </>
  )
}

export default Result
