import { useLocation, useNavigate, useOutletContext } from 'react-router-dom'

import { Typography, Button } from '@material-tailwind/react'

import { Routes } from '@routes/routes.enum'

import { FormPeriod, FormEffect, FormFinance, FormParams } from '@components/forms'

import styles from './Configs.module.scss'
import { useEffect } from 'react'

const Configs = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [ref]: any = useOutletContext()

  // const handleChecklist = () => navigate(`/${Routes.CHECKLIST}`, { state: { prevPath: pathname } })
  const handleResults = () => navigate(`/${Routes.RESULTS}`, { state: { prevPath: pathname } })

  useEffect(() => {
    ref?.current?.complete()
  }, [])

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

      <div className={styles.buttons}>
        {/* <Button
          className={styles.button}
          variant='gradient'
          size='lg'
          color='blue'
          onClick={handleChecklist}
        >
          Чек-лист
        </Button> */}

        <Button
          className={styles.button}
          variant='gradient'
          size='lg'
          color='blue'
          onClick={handleResults}
        >
          Рассчитать
        </Button>
      </div>
    </>
  )
}

export default Configs
