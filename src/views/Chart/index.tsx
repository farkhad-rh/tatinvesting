import { useNavigate } from 'react-router-dom'

import { Button, Typography } from '@material-tailwind/react'

import { barChartConfig } from '@configs/charts.configs'

import { Routes } from '@routes/routes.enum'

import { formatAbsoluteNumber, formatNumber, getYear } from '@utils'

import {
  useCalculateController,
  useEffectService,
  useFinanceService,
  useParamsService,
  usePeriodService,
} from '@services'

// import {
//   Section,
//   Block,
//   Single,
//   Table,
//   TableCol,
//   TableCell,
//   Effect,
//   EffectItem,
//   EffectCol,
//   EffectCell,
// } from '@components/results'

import { Block as BlockChart } from '@components/charts'

import styles from './Chart.module.scss'
import ReactApexChart from 'react-apexcharts'

const Chart = () => {
  const navigate = useNavigate()

  const { calculate } = useCalculateController()

  const [period] = usePeriodService()
  const [effect] = useEffectService()
  const [finance] = useFinanceService()
  const [params] = useParamsService()

  const { PH, PHD, PID, PIDDC, DCE, ST, SY, SH, SHRR } = period
  const { PE, count: effectCount } = effect
  const { AMOR, CAPEX, KR, FP } = finance
  const { DEF, GRT, ITXD, RETD, RMCD, WACC, WCD, TV_enabled } = params

  const {
    RV,
    RACH,
    DPR,
    RVATB,
    RVATP,
    RETR,
    RMCR,
    EBITDA,
    EBIT,
    ITXR,
    ENP,
    FCFF,
    DPRD,
    DCFCR,
    PVFCFF,
    ACF,
    ADCF,
    TV,
    NCFTV,

    SDFCFF,
    NPV,
    IRR,
    PP,
    DPP,
  } = calculate

  const handleBack = () => navigate(`/${Routes.RESULT}`)

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

      {/* <Section title='Анализ чувствительности'></Section> */}

      <BlockChart
        title='Зависимость валовой выручки от горизонта планирования'
        description={`(${RV.measure})`}
      >
        <ReactApexChart
          type='bar'
          height={320}
          series={[
            {
              name: 'Валовая выручка',
              data: RV?.collection?.map(number => formatAbsoluteNumber(number)) as Array<number>,
            },
          ]}
          options={{
            ...barChartConfig,
            xaxis: {
              ...barChartConfig.xaxis,
              categories: SY?.map(date => getYear(date)),
            },
            tooltip: {
              ...barChartConfig.tooltip,
              y: {
                formatter: function (_, series) {
                  return RV?.collection?.map(number => `${formatNumber(number)} ${RV?.measure}`)?.[
                    series?.dataPointIndex
                  ] as string
                },
              },
            },
          }}
        />
      </BlockChart>

      <BlockChart
        title='Зависимость прибыли до уплаты %, налогов и амортизации от горизонта планирования'
        description={`(${EBITDA.measure})`}
      >
        <ReactApexChart
          type='bar'
          height={320}
          series={[
            {
              name: 'Прибыль до уплаты %, налогов и амортизации',
              data: EBITDA?.collection?.map(number =>
                formatAbsoluteNumber(number)
              ) as Array<number>,
            },
          ]}
          options={{
            ...barChartConfig,
            xaxis: {
              ...barChartConfig.xaxis,
              categories: SY?.map(date => getYear(date)),
            },
            tooltip: {
              ...barChartConfig.tooltip,
              y: {
                formatter: function (_, series) {
                  return EBITDA?.collection?.map(
                    number => `${formatNumber(number)} ${EBITDA?.measure}`
                  )?.[series?.dataPointIndex] as string
                },
              },
            },
          }}
        />
      </BlockChart>

      <BlockChart
        title='Зависимость чистой прибыли от горизонта планирования'
        description={`(${ENP.measure})`}
      >
        <ReactApexChart
          type='bar'
          height={320}
          series={[
            {
              name: 'Чистая прибыль',
              data: ENP?.collection?.map(number => formatAbsoluteNumber(number)) as Array<number>,
            },
          ]}
          options={{
            ...barChartConfig,
            xaxis: {
              ...barChartConfig.xaxis,
              categories: SY?.map(date => getYear(date)),
            },
            tooltip: {
              ...barChartConfig.tooltip,
              y: {
                formatter: function (_, series) {
                  return ENP?.collection?.map(
                    number => `${formatNumber(number)} ${ENP?.measure}`
                  )?.[series?.dataPointIndex] as string
                },
              },
            },
          }}
        />
      </BlockChart>

      <BlockChart
        title='Зависимость накопленного денежного потока от горизонта планирования'
        description={`(${ACF.measure})`}
      >
        <ReactApexChart
          type='bar'
          height={320}
          series={[
            {
              name: 'Накопленный денежный поток',
              data: ACF?.collection?.map(number => formatAbsoluteNumber(number)) as Array<number>,
            },
          ]}
          options={{
            ...barChartConfig,
            xaxis: {
              ...barChartConfig.xaxis,
              categories: SY?.map(date => getYear(date)),
            },
            tooltip: {
              ...barChartConfig.tooltip,
              y: {
                formatter: function (_, series) {
                  return ACF?.collection?.map(
                    number => `${formatNumber(number)} ${ACF?.measure}`
                  )?.[series?.dataPointIndex] as string
                },
              },
            },
          }}
        />
      </BlockChart>

      <BlockChart
        title='Зависимость накопленного дисконтированного денежного потока от горизонта планирования'
        description={`(${ADCF.measure})`}
      >
        <ReactApexChart
          type='bar'
          height={320}
          series={[
            {
              name: 'Накопленный дисконтированный денежный поток',
              data: ADCF?.collection?.map(number => formatAbsoluteNumber(number)) as Array<number>,
            },
          ]}
          options={{
            ...barChartConfig,
            xaxis: {
              ...barChartConfig.xaxis,
              categories: SY?.map(date => getYear(date)),
            },
            tooltip: {
              ...barChartConfig.tooltip,
              y: {
                formatter: function (_, series) {
                  return ADCF?.collection?.map(
                    number => `${formatNumber(number)} ${ADCF?.measure}`
                  )?.[series?.dataPointIndex] as string
                },
              },
            },
          }}
        />
      </BlockChart>

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

export default Chart
