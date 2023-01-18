import { Typography } from '@material-tailwind/react'
import * as dayjs from 'dayjs'
import clsx from 'clsx'

import {
  Currencies,
  CurrenciesString,
  Powers,
  PowersString,
  TimeUnitsString,
  WeightUnits,
  WeightUnitsString,
} from '@enums'

import { formatNumber } from '@utils'

import {
  useCalculateController,
  useEffectService,
  useFinanceService,
  useParamsService,
  usePeriodService,
} from '@services'

import { ResultBlock, ResultInfo } from '@components/contents'

import styles from './Result.module.scss'

const Result = () => {
  const { calculate } = useCalculateController()

  console.log(calculate)

  const [period] = usePeriodService()
  const [finance] = useFinanceService()
  const [effect] = useEffectService()
  const [params] = useParamsService()

  const { PH, PHD, PID, PIDDC, DCE, ST, SH, SHRR } = period
  const { AMOR, CAPEX, KR, FP } = finance
  const { PE, count: effectCount } = effect
  const { DEF, GRT, ITXD, RETD, RMCD, WACC, WCD, TV_enabled } = params

  const timeUnit = DCE?.unit || 'year'
  const powerCAPEX = CAPEX?.power || 'THOU'
  const currencyCAPEX = CAPEX?.currency || 'RUB'

  const RV = ST?.map(n => {
    let val = 0

    effectCount?.forEach(indexNPE => {
      const NPE = PE?.[`NPE${indexNPE}`]
      const powerNPET = NPE?.NPET?.power || 'THOU'
      const unitNPET = NPE?.NPET?.unit || 'TONNE'
      const powerPC = NPE?.PC?.power || 'THOU'
      const currencyPC = NPE?.PC?.currency || 'RUB'

      const totalNPET = NPE?.NPET?.collection?.[n] * Powers[powerNPET] * WeightUnits[unitNPET]
      const totalPC = NPE?.PC?.collection?.[n] * Powers[powerPC] * Currencies[currencyPC]

      val = (totalNPET * totalPC + val) * SHRR[n]
    })

    return val
  })
  const RVATB = []
  const RVATP = []
  const RETR = []
  const DCFR = ST?.map(n => {
    if (dayjs(PID).year() + n < dayjs(PIDDC).year()) {
      return dayjs(PID)
        ?.add(n, 'year')
        ?.add(
          dayjs(SH[n])?.diff(dayjs(PID)?.add(n, 'year')?.format('YYYY-MM-DD'), 'day') / 2,
          'day'
        )
        ?.format('YYYY-MM-DD')
    }

    if (dayjs(PID).year() + n >= dayjs(PIDDC).year()) {
      return (
        dayjs(SH[n - 1])
          ?.add(dayjs(SH[n])?.diff(dayjs(SH[n - 1]), 'day') / 2, 'day')
          .format('YYYY-MM-DD') || 0
      )
    }

    return (
      dayjs(SH[n - 1])
        ?.add(dayjs(SH[n])?.diff(dayjs(SH[n - 1]), 'day') / 2, 'day')
        .format('YYYY-MM-DD') || 0
    )
  })
  const DPR = ST?.map(n => {
    if (dayjs(PID).year() + n < dayjs(PIDDC).year()) {
      return 0
    }

    if (dayjs(PID).year() + n >= dayjs(PIDDC).year() && n - PHD < Number(PH)) {
      return CAPEX?.calc / AMOR
    }

    return 0
  })
  const RMCR = ST?.map(n => {
    if (dayjs(PID).year() + n < dayjs(PIDDC).year()) {
      return 0
    }

    if (dayjs(PID).year() + n >= dayjs(PIDDC).year()) {
      if (n === 0) {
        return RMCD * CAPEX?.calc
      }

      if (n > 0) {
        return RMCD * CAPEX?.calc * SHRR[n]
      }
    }

    return 0
  })
  const RACH = ST?.map(n => {
    let val = 0

    effectCount?.forEach(indexNPE => {
      const NPE = PE?.[`NPE${indexNPE}`]
      const powerNPET = NPE?.NPET?.power || 'THOU'
      const unitNPET = NPE?.NPET?.unit || 'TONNE'
      const powerEPP = NPE?.EPP?.power || 'THOU'
      const currencyEPP = NPE?.EPP?.currency || 'RUB'

      const totalNPET = NPE?.NPET?.collection?.[n] * Powers[powerNPET] * WeightUnits[unitNPET]
      const totalEPP = NPE?.EPP?.collection?.[n] * Powers[powerEPP] * Currencies[currencyEPP]

      val = (totalNPET * totalEPP + val) * SHRR[n]
    })

    return val
  })
  const EBITDA = []
  const EBIT = []
  const ITXR = []
  const ENP = []
  const FCFF = []
  const DPRD = []
  const DCFCR = []
  const PVFCFF = []
  const ACF = []
  const ADCF = []
  const NCFTV = []

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

      <ResultBlock title='Модуль 1'>
        <div className='flex flex-wrap gap-6'>
          <ResultInfo
            label='Дата начала реализации проекта (PID)'
            value={dayjs(PID).format('DD.MM.YYYY')}
          />

          <ResultInfo
            label={`Период реализации проекта (${TimeUnitsString[timeUnit]}) (DCE)`}
            value={DCE?.value}
          />

          <ResultInfo
            label='Округление периода реализации проекта (год) (PHD)'
            value={PHD}
          />

          <ResultInfo
            label='Дата получения эффекта проекта (PIDDC)'
            value={dayjs(PIDDC).format('DD.MM.YYYY')}
          />

          <ResultInfo
            label='Горизонт планирования (год) (PH)'
            value={PH}
          />
        </div>

        <div className='flex flex-col gap-2'>
          <Typography
            variant='small'
            className='font-normal text-blue-gray-600'
          >
            Шаг Расчета (ST)
          </Typography>

          <div className={styles.table}>
            {ST?.map(indexST => (
              <div
                key={indexST}
                className={styles.col}
              >
                <div className={clsx(styles.cell, styles.year)}>
                  {dayjs(PID)?.add(indexST, 'year').year()}
                </div>

                <div className={clsx(styles.cell, styles.result)}>{indexST}</div>
              </div>
            ))}
          </div>
        </div>

        <div className='flex flex-col gap-2'>
          <Typography
            variant='small'
            className='font-normal text-blue-gray-600'
          >
            Параметр для округления года до 31.12.гггг (SH)
          </Typography>

          <div className={styles.table}>
            {ST?.map(indexST => (
              <div
                key={indexST}
                className={styles.col}
              >
                <div className={clsx(styles.cell, styles.year)}>
                  {dayjs(PID)?.add(indexST, 'year').year()}
                </div>

                <div className={clsx(styles.cell, styles.result)}>
                  {dayjs(SH[indexST]).format('DD.MM.YYYY')}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className='flex flex-col gap-2'>
          <Typography
            variant='small'
            className='font-normal text-blue-gray-600'
          >
            Коэффициент распределения эффекта (SHRR)
          </Typography>

          <div className={styles.table}>
            {ST?.map(indexST => (
              <div
                key={indexST}
                className={styles.col}
              >
                <div className={clsx(styles.cell, styles.year)}>
                  {dayjs(PID)?.add(indexST, 'year').year()}
                </div>

                <div className={clsx(styles.cell, styles.result)}>
                  {formatNumber(SHRR[indexST])}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className='flex flex-wrap gap-6'>
          <ResultInfo
            label='Период амортизации (AMOR)'
            value={AMOR}
          />

          <ResultInfo
            label={`Капитальные затраты без НДС (${PowersString[powerCAPEX]} ${CurrenciesString[currencyCAPEX]}) (CAPEX)`}
            value={`${CAPEX?.value} ${PowersString[powerCAPEX]} ${CurrenciesString[currencyCAPEX]}`}
          />
        </div>

        <div className='flex flex-col gap-2'>
          <Typography
            variant='small'
            className='font-normal text-blue-gray-600'
          >
            Коэффициент распределения (KR)
          </Typography>

          <div className={styles.table}>
            {ST?.map(indexST => (
              <div
                key={indexST}
                className={styles.col}
              >
                <div className={clsx(styles.cell, styles.year)}>
                  {dayjs(PID)?.add(indexST, 'year').year()}
                </div>

                <div className={clsx(styles.cell, styles.result)}>{KR[indexST]}</div>
              </div>
            ))}
          </div>
        </div>

        <div className='flex flex-col gap-2'>
          <Typography
            variant='small'
            className='font-normal text-blue-gray-600'
          >
            {`План финансирования без НДС (${PowersString[powerCAPEX]} ${CurrenciesString[currencyCAPEX]}) (FP)`}
          </Typography>

          <div className={styles.table}>
            {ST?.map(indexST => (
              <div
                key={indexST}
                className={styles.col}
              >
                <div className={clsx(styles.cell, styles.year)}>
                  {dayjs(PID)?.add(indexST, 'year').year()}
                </div>

                <div className={clsx(styles.cell, styles.result)}>{formatNumber(FP[indexST])}</div>
              </div>
            ))}
          </div>
        </div>

        <div className='flex flex-col gap-4'>
          <Typography
            variant='h5'
            color='blue-gray'
          >
            Эффект проекта (PE)
          </Typography>

          {effectCount?.map(n => {
            const NPE = PE?.[`NPE${n}`]
            const powerNPET = NPE?.NPET?.power || 'THOU'
            const unitNPET = NPE?.NPET?.unit || 'TONNE'
            const powerPC = NPE?.PC?.power || 'THOU'
            const currencyPC = NPE?.PC?.currency || 'RUB'
            const powerEPP = NPE?.EPP?.power || 'THOU'
            const currencyEPP = NPE?.EPP?.currency || 'RUB'

            return (
              <div
                key={n}
                className='flex flex-col gap-2'
              >
                <Typography className='text-xs font-semibold uppercase text-blue-gray-500'>
                  {`Продукция (NPE${n})`}
                </Typography>

                <ResultInfo
                  label='Наименование продукции (NP)'
                  value={NPE?.NP}
                />

                <div className='flex w-[100%] gap-3'>
                  <div className={clsx(styles.col, styles.colParams)}>
                    <div className={clsx(styles.cell, styles.cellParams)}></div>
                    <div className={clsx(styles.cell, styles.cellParams)}>
                      <Typography
                        variant='small'
                        className='text-xs font-medium text-blue-gray-600'
                      >
                        Объем производства
                      </Typography>

                      <Typography
                        variant='small'
                        className='text-xs font-normal text-blue-gray-600'
                      >
                        {`(${PowersString[powerNPET]} ${WeightUnitsString[unitNPET]}) (NPET)`}
                      </Typography>
                    </div>
                    <div className={clsx(styles.cell, styles.cellParams)}>
                      <Typography
                        variant='small'
                        className='text-xs font-medium text-blue-gray-600'
                      >
                        Cтоимость продукций
                      </Typography>
                      <Typography
                        variant='small'
                        className='text-xs font-normal text-blue-gray-600'
                      >
                        {`(${PowersString[powerPC]} ${CurrenciesString[currencyPC]}) (PC)`}
                      </Typography>
                    </div>
                    <div className={clsx(styles.cell, styles.cellParams)}>
                      <Typography
                        variant='small'
                        className='text-xs font-medium text-blue-gray-600'
                      >
                        Процессинг производства
                      </Typography>
                      <Typography
                        variant='small'
                        className='text-xs font-normal text-blue-gray-600'
                      >
                        {`(${PowersString[powerEPP]} ${CurrenciesString[currencyEPP]}) (EPP)`}
                      </Typography>
                    </div>
                  </div>

                  <div className={styles.table}>
                    {ST?.map(indexST => (
                      <div
                        key={indexST}
                        className={styles.col}
                      >
                        <div className={clsx(styles.cell, styles.year)}>
                          {dayjs(PID)?.add(indexST, 'year').year()}
                        </div>

                        <div className={clsx(styles.cell, styles.result)}>
                          {formatNumber(NPE?.NPET?.collection?.[indexST] || 0)}
                        </div>

                        <div className={clsx(styles.cell, styles.result)}>
                          {formatNumber(NPE?.PC?.collection?.[indexST] || 0)}
                        </div>

                        <div className={clsx(styles.cell, styles.result)}>
                          {formatNumber(NPE?.EPP?.collection?.[indexST] || 0)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className='flex flex-wrap gap-6'>
          <ResultInfo
            label='Дефлятор (инфляция в РФ), % (DEF)'
            value={`${DEF}%`}
          />

          <ResultInfo
            label='Дефлятор (инфляция в США), % (GRT)'
            value={`${GRT}%`}
          />

          <ResultInfo
            label='Учитывать терминальную стоимость?'
            value={TV_enabled ? 'Да' : 'Нет'}
          />

          <ResultInfo
            label='Средневзвешенная стоимость капитала, % (WACC)'
            value={`${WACC}%`}
          />

          <ResultInfo
            label='Рабочий капитал, % (WCD)'
            value={`${WCD}%`}
          />

          <ResultInfo
            label='Затраты на ремонт и тех. обслуживания, % (RMCD)'
            value={`${RMCD}%`}
          />

          <ResultInfo
            label='Налог на прибыль, % (ITXD)'
            value={`${ITXD}%`}
          />

          <ResultInfo
            label='Налог на недвижимое имущество, % (RETD)'
            value={`${RETD}%`}
          />
        </div>
      </ResultBlock>

      <ResultBlock title='Модуль 2'>
        <div className='flex flex-col gap-2'>
          <Typography
            variant='small'
            className='font-normal text-blue-gray-600'
          >
            Параметр для округления года до 31.12.гггг (SH)
          </Typography>

          <div className={styles.table}>
            {ST?.map(indexST => (
              <div
                key={indexST}
                className={styles.col}
              >
                <div className={clsx(styles.cell, styles.year)}>
                  {dayjs(PID)?.add(indexST, 'year').year()}
                </div>

                <div className={clsx(styles.cell, styles.result)}>
                  {dayjs(SH[indexST]).format('DD.MM.YYYY')}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className='flex flex-col gap-2'>
          <Typography
            variant='small'
            className='font-normal text-blue-gray-600'
          >
            Валовая выручка (RV)
          </Typography>

          <div className={styles.table}>
            {ST?.map(indexST => (
              <div
                key={indexST}
                className={styles.col}
              >
                <div className={clsx(styles.cell, styles.year)}>
                  {dayjs(PID)?.add(indexST, 'year').year()}
                </div>

                <div className={clsx(styles.cell, styles.result)}>
                  {formatNumber(RV[indexST] / 1000000 / 1)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className='flex flex-col gap-2'>
          <Typography
            variant='small'
            className='font-normal text-blue-gray-600'
          >
            Остаточная стоимость на начало периода (RVATB)
          </Typography>

          <div className={styles.table}>
            {ST?.map(indexST => (
              <div
                key={indexST}
                className={styles.col}
              >
                <div className={clsx(styles.cell, styles.year)}>
                  {dayjs(PID)?.add(indexST, 'year').year()}
                </div>

                <div className={clsx(styles.cell, styles.result)}>{indexST}</div>
              </div>
            ))}
          </div>
        </div>

        <div className='flex flex-col gap-2'>
          <Typography
            variant='small'
            className='font-normal text-blue-gray-600'
          >
            Остаточная стоимость на конец периода (RVATP)
          </Typography>

          <div className={styles.table}>
            {ST?.map(indexST => (
              <div
                key={indexST}
                className={styles.col}
              >
                <div className={clsx(styles.cell, styles.year)}>
                  {dayjs(PID)?.add(indexST, 'year').year()}
                </div>

                <div className={clsx(styles.cell, styles.result)}>{indexST}</div>
              </div>
            ))}
          </div>
        </div>

        <div className='flex flex-col gap-2'>
          <Typography
            variant='small'
            className='font-normal text-blue-gray-600'
          >
            Налог на недвижимое имущество (RETR)
          </Typography>

          <div className={styles.table}>
            {ST?.map(indexST => (
              <div
                key={indexST}
                className={styles.col}
              >
                <div className={clsx(styles.cell, styles.year)}>
                  {dayjs(PID)?.add(indexST, 'year').year()}
                </div>

                <div className={clsx(styles.cell, styles.result)}>{indexST}</div>
              </div>
            ))}
          </div>
        </div>

        <div className='flex flex-col gap-2'>
          <Typography
            variant='small'
            className='font-normal text-blue-gray-600'
          >
            Дата получения денежного потока (DCFR)
          </Typography>

          <div className={styles.table}>
            {ST?.map(indexST => (
              <div
                key={indexST}
                className={styles.col}
              >
                <div className={clsx(styles.cell, styles.year)}>
                  {dayjs(PID)?.add(indexST, 'year').year()}
                </div>

                <div className={clsx(styles.cell, styles.result)}>
                  {dayjs(DCFR[indexST]).format('DD.MM.YYYY')}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className='flex flex-col gap-2'>
          <Typography
            variant='small'
            className='font-normal text-blue-gray-600'
          >
            Aмортизация (DPR)
          </Typography>

          <div className={styles.table}>
            {ST?.map(indexST => (
              <div
                key={indexST}
                className={styles.col}
              >
                <div className={clsx(styles.cell, styles.year)}>
                  {dayjs(PID)?.add(indexST, 'year').year()}
                </div>

                <div className={clsx(styles.cell, styles.result)}>
                  {formatNumber(DPR[indexST] / 1000000 / 1)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className='flex flex-col gap-2'>
          <Typography
            variant='small'
            className='font-normal text-blue-gray-600'
          >
            Затраты на ремонт и тех. обслуживания (RMCR)
          </Typography>

          <div className={styles.table}>
            {ST?.map(indexST => (
              <div
                key={indexST}
                className={styles.col}
              >
                <div className={clsx(styles.cell, styles.year)}>
                  {dayjs(PID)?.add(indexST, 'year').year()}
                </div>

                <div className={clsx(styles.cell, styles.result)}>
                  {formatNumber(RMCR[indexST] / 1000000 / 1)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className='flex flex-col gap-2'>
          <Typography
            variant='small'
            className='font-normal text-blue-gray-600'
          >
            Процессинг производства (расходы) (RACH)
          </Typography>

          <div className={styles.table}>
            {ST?.map(indexST => (
              <div
                key={indexST}
                className={styles.col}
              >
                <div className={clsx(styles.cell, styles.year)}>
                  {dayjs(PID)?.add(indexST, 'year').year()}
                </div>

                <div className={clsx(styles.cell, styles.result)}>
                  {formatNumber(RACH[indexST] / 1000 / 1)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className='flex flex-col gap-2'>
          <Typography
            variant='small'
            className='font-normal text-blue-gray-600'
          >
            Прибыль до уплаты %, налогов и амортизации (EBITDA)
          </Typography>

          <div className={styles.table}>
            {ST?.map(indexST => (
              <div
                key={indexST}
                className={styles.col}
              >
                <div className={clsx(styles.cell, styles.year)}>
                  {dayjs(PID)?.add(indexST, 'year').year()}
                </div>

                <div className={clsx(styles.cell, styles.result)}>{indexST}</div>
              </div>
            ))}
          </div>
        </div>

        <div className='flex flex-col gap-2'>
          <Typography
            variant='small'
            className='font-normal text-blue-gray-600'
          >
            Прибыль до уплаты % и налогов (EBIT)
          </Typography>

          <div className={styles.table}>
            {ST?.map(indexST => (
              <div
                key={indexST}
                className={styles.col}
              >
                <div className={clsx(styles.cell, styles.year)}>
                  {dayjs(PID)?.add(indexST, 'year').year()}
                </div>

                <div className={clsx(styles.cell, styles.result)}>{indexST}</div>
              </div>
            ))}
          </div>
        </div>

        <div className='flex flex-col gap-2'>
          <Typography
            variant='small'
            className='font-normal text-blue-gray-600'
          >
            Налог на прибыль (ITXR)
          </Typography>

          <div className={styles.table}>
            {ST?.map(indexST => (
              <div
                key={indexST}
                className={styles.col}
              >
                <div className={clsx(styles.cell, styles.year)}>
                  {dayjs(PID)?.add(indexST, 'year').year()}
                </div>

                <div className={clsx(styles.cell, styles.result)}>{indexST}</div>
              </div>
            ))}
          </div>
        </div>

        <div className='flex flex-col gap-2'>
          <Typography
            variant='small'
            className='font-normal text-blue-gray-600'
          >
            Чистая прибыль (ENP)
          </Typography>

          <div className={styles.table}>
            {ST?.map(indexST => (
              <div
                key={indexST}
                className={styles.col}
              >
                <div className={clsx(styles.cell, styles.year)}>
                  {dayjs(PID)?.add(indexST, 'year').year()}
                </div>

                <div className={clsx(styles.cell, styles.result)}>{indexST}</div>
              </div>
            ))}
          </div>
        </div>

        <div className='flex flex-col gap-2'>
          <Typography
            variant='small'
            className='font-normal text-blue-gray-600'
          >
            Чистый денежный поток (FCFF)
          </Typography>

          <div className={styles.table}>
            {ST?.map(indexST => (
              <div
                key={indexST}
                className={styles.col}
              >
                <div className={clsx(styles.cell, styles.year)}>
                  {dayjs(PID)?.add(indexST, 'year').year()}
                </div>

                <div className={clsx(styles.cell, styles.result)}>{indexST}</div>
              </div>
            ))}
          </div>
        </div>

        <div className='flex flex-col gap-2'>
          <Typography
            variant='small'
            className='font-normal text-blue-gray-600'
          >
            Период дисконтирования (DPRD)
          </Typography>

          <div className={styles.table}>
            {ST?.map(indexST => (
              <div
                key={indexST}
                className={styles.col}
              >
                <div className={clsx(styles.cell, styles.year)}>
                  {dayjs(PID)?.add(indexST, 'year').year()}
                </div>

                <div className={clsx(styles.cell, styles.result)}>{indexST}</div>
              </div>
            ))}
          </div>
        </div>

        <div className='flex flex-col gap-2'>
          <Typography
            variant='small'
            className='font-normal text-blue-gray-600'
          >
            Фактор дисконтирования (DCFCR)
          </Typography>

          <div className={styles.table}>
            {ST?.map(indexST => (
              <div
                key={indexST}
                className={styles.col}
              >
                <div className={clsx(styles.cell, styles.year)}>
                  {dayjs(PID)?.add(indexST, 'year').year()}
                </div>

                <div className={clsx(styles.cell, styles.result)}>{indexST}</div>
              </div>
            ))}
          </div>
        </div>

        <div className='flex flex-col gap-2'>
          <Typography
            variant='small'
            className='font-normal text-blue-gray-600'
          >
            Приведенный денежный поток (PVFCFF)
          </Typography>

          <div className={styles.table}>
            {ST?.map(indexST => (
              <div
                key={indexST}
                className={styles.col}
              >
                <div className={clsx(styles.cell, styles.year)}>
                  {dayjs(PID)?.add(indexST, 'year').year()}
                </div>

                <div className={clsx(styles.cell, styles.result)}>{indexST}</div>
              </div>
            ))}
          </div>
        </div>

        <div className='flex flex-col gap-2'>
          <Typography
            variant='small'
            className='font-normal text-blue-gray-600'
          >
            Накопленный денежный поток CF (ACF)
          </Typography>

          <div className={styles.table}>
            {ST?.map(indexST => (
              <div
                key={indexST}
                className={styles.col}
              >
                <div className={clsx(styles.cell, styles.year)}>
                  {dayjs(PID)?.add(indexST, 'year').year()}
                </div>

                <div className={clsx(styles.cell, styles.result)}>{indexST}</div>
              </div>
            ))}
          </div>
        </div>

        <div className='flex flex-col gap-2'>
          <Typography
            variant='small'
            className='font-normal text-blue-gray-600'
          >
            Накопленный дисконтированный денежный поток CF (ADCF)
          </Typography>

          <div className={styles.table}>
            {ST?.map(indexST => (
              <div
                key={indexST}
                className={styles.col}
              >
                <div className={clsx(styles.cell, styles.year)}>
                  {dayjs(PID)?.add(indexST, 'year').year()}
                </div>

                <div className={clsx(styles.cell, styles.result)}>{indexST}</div>
              </div>
            ))}
          </div>
        </div>

        <div className='flex flex-col gap-2'>
          <Typography
            variant='small'
            className='font-normal text-blue-gray-600'
          >
            Чистый денежный поток с TV (NCFTV)
          </Typography>

          <div className={styles.table}>
            {ST?.map(indexST => (
              <div
                key={indexST}
                className={styles.col}
              >
                <div className={clsx(styles.cell, styles.year)}>
                  {dayjs(PID)?.add(indexST, 'year').year()}
                </div>

                <div className={clsx(styles.cell, styles.result)}>{indexST}</div>
              </div>
            ))}
          </div>
        </div>
      </ResultBlock>
    </>
  )
}

export default Result
