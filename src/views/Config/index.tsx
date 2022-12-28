import { useNavigate } from 'react-router-dom'

import { Typography, Button } from '@material-tailwind/react'

import { FormPeriod, FormEffect, FormFinance, FormParams } from '@components/forms'

import styles from './Config.module.scss'

const Config = () => {
  const navigate = useNavigate()

  return (
    <>
      <Typography
        className={styles.title}
        variant='h1'
        color='blue'
        textGradient
      >
        Экспресс оценка инвестиционных проектов
      </Typography>

      <FormPeriod />
      <FormEffect />
      <FormFinance />
      <FormParams />

      <Button
        className={styles.button}
        variant='gradient'
        size='lg'
        onClick={() => navigate('/result')}
      >
        Рассчитать
      </Button>
    </>
  )
}

export default Config
