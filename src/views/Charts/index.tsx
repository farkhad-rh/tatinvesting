import { useEffect } from 'react'
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom'

import { Button, Typography } from '@material-tailwind/react'

import { Routes } from '@routes/routes.enum'

import { getYear } from '@utils'

import {
  useCalculateService,
  useEffectService,
  useFinanceService,
  usePeriodService,
} from '@services'

import { Block, Chart, Heatmap, Stack } from '@components/charts'

import styles from './Charts.module.scss'

const Charts = () => {
  const navigate = useNavigate()
  const { state, pathname } = useLocation()
  const [ref]: any = useOutletContext()

  const [period] = usePeriodService()
  const [effect] = useEffectService()
  const [finance] = useFinanceService()
  const [calculate] = useCalculateService()

  const { SY } = period
  const { count: effectCount } = effect
  const { CAPEX } = finance
  const { RV, EBITDA, ENP, ACF, ADCF, IRR } = calculate

  const handleBack = () => navigate(state?.prevPath || -1)
  const handleConfigs = () => navigate(`/${Routes.CONFIGS}`)
  // const handleChecklist = () => navigate(`/${Routes.CHECKLIST}`, { state: { prevPath: pathname } })

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
        Визуализация графиков
      </Typography>

      <Block
        title='Анализ чувствительности проекта по:'
        description={'Объему производства (ось Y) и Капитальным затратам без НДС (ось X)'}
      >
        <Heatmap
          capex={CAPEX}
          irr={IRR?.value}
          matrix={IRR?.matrixNPET}
          tooltip='Объем производства'
        />
      </Block>

      <Block
        title='Анализ чувствительности проекта по:'
        description={'Стоимости продукции (ось Y) и Капитальным затратам без НДС (ось X)'}
      >
        <Heatmap
          capex={CAPEX}
          irr={IRR?.value}
          matrix={IRR?.matrixPC}
          tooltip='Стоимость продукции'
        />
      </Block>

      {effectCount?.length > 1 && (
        <Block
          title='Доля каждой продукции при формировании валовой выручки'
          description={`(${ADCF.measure})`}
          color='blue-gray'
        >
          <Stack
            data={RV?.stack}
            years={SY?.map(date => getYear(date))}
            measure={RV?.measure}
          />
        </Block>
      )}

      <Block
        title='Зависимость валовой выручки от горизонта планирования'
        description={`(${RV.measure})`}
      >
        <Chart
          name='Валовая выручка'
          data={RV?.collection}
          years={SY?.map(date => getYear(date))}
          measure={RV?.measure}
        />
      </Block>

      <Block
        title='Зависимость прибыли до уплаты %, налогов и амортизации от горизонта планирования'
        description={`(${EBITDA.measure})`}
      >
        <Chart
          name='Прибыль до уплаты %, налогов и амортизации'
          data={EBITDA?.collection}
          years={SY?.map(date => getYear(date))}
          measure={EBITDA?.measure}
        />
      </Block>

      <Block
        title='Зависимость чистой прибыли от горизонта планирования'
        description={`(${ENP.measure})`}
      >
        <Chart
          name='Чистая прибыль'
          data={ENP?.collection}
          years={SY?.map(date => getYear(date))}
          measure={ENP?.measure}
        />
      </Block>

      <Block
        title='Зависимость накопленного денежного потока от горизонта планирования'
        description={`(${ACF.measure})`}
      >
        <Chart
          name='Накопленный денежный поток'
          data={ACF?.collection}
          years={SY?.map(date => getYear(date))}
          measure={ACF?.measure}
        />
      </Block>

      <Block
        title='Зависимость накопленного дисконтированного денежного потока от горизонта планирования'
        description={`(${ADCF.measure})`}
      >
        <Chart
          name='Накопленный дисконтированный денежный поток'
          data={ADCF?.collection}
          years={SY?.map(date => getYear(date))}
          measure={ADCF?.measure}
        />
      </Block>

      <div className={styles.buttons}>
        <Button
          className={styles.button}
          variant='gradient'
          size='lg'
          onClick={handleBack}
        >
          Назад
        </Button>

        <Button
          className={styles.button}
          variant='gradient'
          size='lg'
          onClick={handleConfigs}
        >
          Исходные данные
        </Button>

        {/* <Button
          className={styles.button}
          variant='gradient'
          size='lg'
          onClick={handleChecklist}
        >
          Чек-лист
        </Button> */}
      </div>
    </>
  )
}

export default Charts
