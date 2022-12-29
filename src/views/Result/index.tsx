import { Typography } from '@material-tailwind/react'
import dayjs from 'dayjs'
import clsx from 'clsx'

import { CurrenciesString, PowersString, TimeUnitsString, WeightUnitsString } from '@enums'

import { formatNumber, formatPercent } from '@utils'

import { useEffectService, useFinanceService, useParamsService, usePeriodService } from '@services'

import { ResultBlock, ResultInfo } from '@components/contents'

import styles from './Result.module.scss'

const Result = () => {
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

                <div className={clsx(styles.cell, styles.result)}>{SHRR[indexST]}</div>
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
            value={`${formatPercent(DEF, false)}%`}
          />

          <ResultInfo
            label='Дефлятор (инфляция в США), % (GRT)'
            value={`${formatPercent(GRT, false)}%`}
          />

          <ResultInfo
            label='Учитывать терминальную стоимость?'
            value={TV_enabled ? 'Да' : 'Нет'}
          />

          <ResultInfo
            label='Средневзвешенная стоимость капитала, % (WACC)'
            value={`${formatPercent(WACC, false)}%`}
          />

          <ResultInfo
            label='Рабочий капитал, % (WCD)'
            value={`${formatPercent(WCD, false)}%`}
          />

          <ResultInfo
            label='Затраты на ремонт и тех. обслуживания, % (RMCD)'
            value={`${formatPercent(RMCD, false)}%`}
          />

          <ResultInfo
            label='Налог на прибыль, % (ITXD)'
            value={`${formatPercent(ITXD, false)}%`}
          />

          <ResultInfo
            label='Налог на недвижимое имущество, % (RETD)'
            value={`${formatPercent(RETD, false)}%`}
          />
        </div>
      </ResultBlock>
    </>
  )
}

export default Result
