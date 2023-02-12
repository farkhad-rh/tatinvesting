import { useEffect } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'

import { Button, Typography } from '@material-tailwind/react'

import { Routes } from '@routes/routes.enum'

import { formatDate, formatNumber, getYear } from '@utils'

import {
  useCalculateController,
  useEffectService,
  useFinanceService,
  useParamsService,
  usePeriodService,
} from '@services'

import {
  Section,
  Block,
  Single,
  Table,
  TableCol,
  TableCell,
  Effect,
  EffectItem,
  EffectCol,
  EffectCell,
} from '@components/results'

import styles from './Results.module.scss'

const Results = () => {
  const navigate = useNavigate()
  const [ref]: any = useOutletContext()

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

  const handleBack = () => navigate(`/${Routes.CONFIGS}`)
  const handleCharts = () => navigate(`/${Routes.CHARTS}`)

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
        Результат вычислений
      </Typography>

      <Section title='Расчеты'>
        <Table label='Округление дат'>
          {ST?.map(indexST => (
            <TableCol key={indexST}>
              <TableCell
                type='head'
                label={getYear(SY[indexST])}
              />

              <TableCell
                type='body'
                label={formatDate(SH[indexST])}
              />
            </TableCol>
          ))}
        </Table>

        <Table label={`Валовая выручка (${RV?.measure})`}>
          {ST?.map(indexST => (
            <TableCol key={indexST}>
              <TableCell
                type='head'
                label={getYear(SY[indexST])}
              />

              <TableCell
                type='body'
                label={formatNumber(RV?.collection?.[indexST] || 0)}
              />
            </TableCol>
          ))}
        </Table>

        <Table label={`Процессинг производства (расходы) (${RACH?.measure})`}>
          {ST?.map(indexST => (
            <TableCol key={indexST}>
              <TableCell
                type='head'
                label={getYear(SY[indexST])}
              />

              <TableCell
                type='body'
                label={formatNumber(RACH?.collection?.[indexST] || 0)}
              />
            </TableCol>
          ))}
        </Table>

        <Table label={`Aмортизация (${DPR?.measure})`}>
          {ST?.map(indexST => (
            <TableCol key={indexST}>
              <TableCell
                type='head'
                label={getYear(SY[indexST])}
              />

              <TableCell
                type='body'
                label={formatNumber(DPR?.collection?.[indexST] || 0)}
              />
            </TableCol>
          ))}
        </Table>

        <Table label={`Остаточная стоимость на начало периода (${RVATB?.measure})`}>
          {ST?.map(indexST => (
            <TableCol key={indexST}>
              <TableCell
                type='head'
                label={getYear(SY[indexST])}
              />

              <TableCell
                type='body'
                label={formatNumber(RVATB?.collection?.[indexST] || 0)}
              />
            </TableCol>
          ))}
        </Table>

        <Table label={`Остаточная стоимость на конец периода (${RVATP?.measure})`}>
          {ST?.map(indexST => (
            <TableCol key={indexST}>
              <TableCell
                type='head'
                label={getYear(SY[indexST])}
              />

              <TableCell
                type='body'
                label={formatNumber(RVATP?.collection?.[indexST] || 0)}
              />
            </TableCol>
          ))}
        </Table>

        <Table label={`Налог на недвижимое имущество (${RETR?.measure})`}>
          {ST?.map(indexST => (
            <TableCol key={indexST}>
              <TableCell
                type='head'
                label={getYear(SY[indexST])}
              />

              <TableCell
                type='body'
                label={formatNumber(RETR?.collection?.[indexST] || 0)}
              />
            </TableCol>
          ))}
        </Table>

        <Table label={`Затраты на ремонт и тех. обслуживания (${RMCR?.measure})`}>
          {ST?.map(indexST => (
            <TableCol key={indexST}>
              <TableCell
                type='head'
                label={getYear(SY[indexST])}
              />

              <TableCell
                type='body'
                label={formatNumber(RMCR?.collection?.[indexST] || 0)}
              />
            </TableCol>
          ))}
        </Table>

        <Table label={`Прибыль до уплаты %, налогов и амортизации (${EBITDA?.measure})`}>
          {ST?.map(indexST => (
            <TableCol key={indexST}>
              <TableCell
                type='head'
                label={getYear(SY[indexST])}
              />

              <TableCell
                type='body'
                label={formatNumber(EBITDA?.collection?.[indexST] || 0)}
              />
            </TableCol>
          ))}
        </Table>

        <Table label={`Прибыль до уплаты % и налогов (${EBIT?.measure})`}>
          {ST?.map(indexST => (
            <TableCol key={indexST}>
              <TableCell
                type='head'
                label={getYear(SY[indexST])}
              />

              <TableCell
                type='body'
                label={formatNumber(EBIT?.collection?.[indexST] || 0)}
              />
            </TableCol>
          ))}
        </Table>

        <Table label={`Налог на прибыль (${ITXR?.measure})`}>
          {ST?.map(indexST => (
            <TableCol key={indexST}>
              <TableCell
                type='head'
                label={getYear(SY[indexST])}
              />

              <TableCell
                type='body'
                label={formatNumber(ITXR?.collection?.[indexST] || 0)}
              />
            </TableCol>
          ))}
        </Table>

        <Table label={`Чистая прибыль (${ENP?.measure})`}>
          {ST?.map(indexST => (
            <TableCol key={indexST}>
              <TableCell
                type='head'
                label={getYear(SY[indexST])}
              />

              <TableCell
                type='body'
                label={formatNumber(ENP?.collection?.[indexST] || 0)}
              />
            </TableCol>
          ))}
        </Table>

        <Table label={`Чистый денежный поток (${FCFF?.measure})`}>
          {ST?.map(indexST => (
            <TableCol key={indexST}>
              <TableCell
                type='head'
                label={getYear(SY[indexST])}
              />

              <TableCell
                type='body'
                label={formatNumber(FCFF?.collection?.[indexST] || 0)}
              />
            </TableCol>
          ))}
        </Table>

        <Table label={`Период дисконтирования`}>
          {ST?.map(indexST => (
            <TableCol key={indexST}>
              <TableCell
                type='head'
                label={getYear(SY[indexST])}
              />

              <TableCell
                type='body'
                label={formatNumber(DPRD?.[indexST])}
              />
            </TableCol>
          ))}
        </Table>

        <Table label={`Фактор дисконтирования`}>
          {ST?.map(indexST => (
            <TableCol key={indexST}>
              <TableCell
                type='head'
                label={getYear(SY[indexST])}
              />

              <TableCell
                type='body'
                label={formatNumber(DCFCR?.[indexST])}
              />
            </TableCol>
          ))}
        </Table>

        <Table label={`Приведенный денежный поток (${PVFCFF?.measure})`}>
          {ST?.map(indexST => (
            <TableCol key={indexST}>
              <TableCell
                type='head'
                label={getYear(SY[indexST])}
              />

              <TableCell
                type='body'
                label={formatNumber(PVFCFF?.collection?.[indexST] || 0)}
              />
            </TableCol>
          ))}
        </Table>

        <Table label={`Накопленный денежный поток (${ACF?.measure})`}>
          {ST?.map(indexST => (
            <TableCol key={indexST}>
              <TableCell
                type='head'
                label={getYear(SY[indexST])}
              />

              <TableCell
                type='body'
                label={formatNumber(ACF?.collection?.[indexST] || 0)}
              />
            </TableCol>
          ))}
        </Table>

        <Table label={`Накопленный дисконтированный денежный поток (${ADCF?.measure})`}>
          {ST?.map(indexST => (
            <TableCol key={indexST}>
              <TableCell
                type='head'
                label={getYear(SY[indexST])}
              />

              <TableCell
                type='body'
                label={formatNumber(ADCF?.collection?.[indexST] || 0)}
              />
            </TableCol>
          ))}
        </Table>

        <Table
          label={`Чистый денежный поток ${TV_enabled ? 'с терминальной стоимостью' : ''} (${
            NCFTV?.measure
          })`}
        >
          {ST?.map(indexST => (
            <TableCol key={indexST}>
              <TableCell
                type='head'
                label={getYear(SY[indexST])}
              />

              <TableCell
                type='body'
                label={formatNumber(NCFTV?.collection?.[indexST] || 0)}
              />
            </TableCol>
          ))}
        </Table>

        <Block>
          <Single
            label='Капитальные затраты без НДС'
            value={`${formatNumber(CAPEX?.value || 0)} ${CAPEX?.measure}`}
          />

          <Single
            label='Капитальные затраты c НДС'
            value={`${formatNumber((CAPEX?.value || 0) * 1.2)} ${CAPEX?.measure}`}
          />

          <Single
            label='Терминальная стоимость'
            value={`${formatNumber(TV?.collection || 0)} ${TV?.measure}`}
          />

          <Single
            label='Cуммарный приведенный денежный поток'
            value={`${formatNumber(SDFCFF?.collection || 0)} ${SDFCFF?.measure}`}
          />

          <Single
            label='Чистая приведённая стоимость'
            value={`${formatNumber(NPV?.collection || 0)} ${NPV?.measure}`}
          />

          <Single
            label='Внутренняя норма рентабельности'
            value={`${formatNumber(IRR?.value)}%`}
          />

          <Single
            label='Простой срок окупаемости с даты начала реализации (год)'
            value={formatNumber(PP)}
          />

          <Single
            label='Дисконтированный срок окупаемости с даты начала реализации (год)'
            value={formatNumber(DPP)}
          />
        </Block>
      </Section>

      <Section title='Исходные данные'>
        <Block>
          <Single
            label='Дата начала реализации проекта'
            value={formatDate(PID)}
          />

          <Single
            label={`Период реализации проекта (${DCE?.measure})`}
            value={formatNumber(DCE?.value || 0)}
          />

          <Single
            label='Округление периода реализации проекта (год)'
            value={PHD}
          />

          <Single
            label='Дата получения эффекта проекта'
            value={formatDate(PIDDC)}
          />

          <Single
            label='Горизонт планирования (год)'
            value={PH}
          />
        </Block>

        <Table label='Коэффициент распределения эффекта'>
          {ST?.map(indexST => (
            <TableCol key={indexST}>
              <TableCell
                type='head'
                label={getYear(SY[indexST])}
              />

              <TableCell
                type='body'
                label={formatNumber(SHRR[indexST])}
              />
            </TableCol>
          ))}
        </Table>

        <Effect title='Эффект проекта'>
          {effectCount?.map(n => {
            const NPE = PE?.[`NPE${n}`]
            const { NP, NPET, PC, EPP } = NPE || {}

            return (
              <EffectItem
                key={n}
                label='Наименование продукции'
                value={NP}
              >
                <EffectCol>
                  <EffectCell
                    label='Объем производства'
                    measure={`(${NPET?.measure})`}
                  />

                  <EffectCell
                    label='Cтоимость продукций'
                    measure={`(${PC?.measure})`}
                  />

                  <EffectCell
                    label='Процессинг производства'
                    measure={`(${EPP?.measure})`}
                  />
                </EffectCol>

                <Table>
                  {ST?.map(indexST => (
                    <TableCol key={indexST}>
                      <TableCell
                        type='head'
                        label={getYear(SY[indexST])}
                      />

                      <TableCell
                        type='body'
                        label={formatNumber(NPET?.collection?.[indexST] || 0)}
                      />

                      <TableCell
                        type='body'
                        label={formatNumber(PC?.collection?.[indexST] || 0)}
                      />

                      <TableCell
                        type='body'
                        label={formatNumber(EPP?.collection?.[indexST] || 0)}
                      />
                    </TableCol>
                  ))}
                </Table>
              </EffectItem>
            )
          })}
        </Effect>

        <Block>
          <Single
            label='Период амортизации'
            value={AMOR}
          />

          <Single
            label='Капитальные затраты без НДС'
            value={`${formatNumber(CAPEX?.value || 0)} ${CAPEX?.measure}`}
          />
        </Block>

        <Table label='Коэффициент распределения'>
          {ST?.map(indexST => (
            <TableCol key={indexST}>
              <TableCell
                type='head'
                label={getYear(SY[indexST])}
              />

              <TableCell
                type='body'
                label={formatNumber(KR?.value?.[indexST] || 0)}
              />
            </TableCol>
          ))}
        </Table>

        <Table label={`План финансирования без НДС (${CAPEX?.measure})`}>
          {ST?.map(indexST => (
            <TableCol key={indexST}>
              <TableCell
                type='head'
                label={getYear(SY[indexST])}
              />

              <TableCell
                type='body'
                label={formatNumber(FP?.collection?.[indexST] || 0)}
              />
            </TableCol>
          ))}
        </Table>

        <Block>
          <Single
            label='Дефлятор (инфляция в РФ)'
            value={`${formatNumber(DEF || 0)}%`}
          />

          <Single
            label='Дефлятор (инфляция в США)'
            value={`${formatNumber(GRT || 0)}%`}
          />

          <Single
            label='Учитывать терминальную стоимость?'
            value={TV_enabled ? 'Да' : 'Нет'}
          />

          <Single
            label='Средневзвешенная стоимость капитала'
            value={`${formatNumber(WACC || 0)}%`}
          />

          <Single
            label='Рабочий капитал'
            value={`${formatNumber(WCD || 0)}%`}
          />

          <Single
            label='Затраты на ремонт и тех. обслуживания'
            value={`${formatNumber(RMCD || 0)}%`}
          />

          <Single
            label='Налог на прибыль'
            value={`${formatNumber(ITXD || 0)}%`}
          />

          <Single
            label='Налог на недвижимое имущество'
            value={`${formatNumber(RETD || 0)}%`}
          />
        </Block>
      </Section>

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
          onClick={handleCharts}
        >
          Графики
        </Button>
      </div>
    </>
  )
}

export default Results
