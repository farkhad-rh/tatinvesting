import { useNavigate } from 'react-router-dom'

import { Button, Typography } from '@material-tailwind/react'

import { Routes } from '@routes/routes.enum'

import { getYear } from '@utils'

import {
  useCalculateController,
  useEffectService,
  useFinanceService,
  usePeriodService,
} from '@services'

import { Block, Chart, Heatmap } from '@components/charts'

import styles from './Charts.module.scss'

const Charts = () => {
  const navigate = useNavigate()

  const { calculate } = useCalculateController()

  const [period] = usePeriodService()
  const [effect] = useEffectService()
  const [finance] = useFinanceService()

  const { SY } = period
  const { PE, count: effectCount } = effect
  const { CAPEX } = finance

  const {
    RV,
    EBITDA,
    ENP,
    ACF,
    ADCF,

    IRR,
  } = calculate

  const handleBack = () => navigate(`/${Routes.RESULTS}`)

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
        />
      </Block>

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

      <Button
        className={styles.button}
        variant='gradient'
        size='lg'
        onClick={handleBack}
      >
        Назад
      </Button>
    </>
  )
}

export default Charts
