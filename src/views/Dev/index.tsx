import { useEffect } from 'react'
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom'

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

import styles from './Dev.module.scss'

const Dev = () => {
  const navigate = useNavigate()
  const { state, pathname } = useLocation()
  const [ref]: any = useOutletContext()

  const { calculate } = useCalculateController()

  const [period] = usePeriodService()
  const [effect] = useEffectService()
  const [finance] = useFinanceService()
  const [params] = useParamsService()

  const { PH, PHD, PID, PIDDC, DCE, ST, SY, SH, SHRR } = period
  const { PE, count: effectCount } = effect
  const { AMOR, CAPEX, KR, FP, WCR } = finance
  const { DEF, GRT, ITXD, RETD, RMCD, WACC, WCD, TV_enabled } = params

  const {
    DCFR,
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

  const handleBack = () => navigate(state?.prevPath || -1)
  const handleCharts = () => navigate(`/${Routes.CHARTS}`, { state: { prevPath: pathname } })

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
        Режим разработки
      </Typography>

      <Section title='Модуль 1'>
        <Block>
          <Single
            label='Дата начала реализации проекта (PID)'
            value={formatDate(PID)}
          />

          <Single
            label={`Период реализации проекта (${DCE?.measure}) (DCE)`}
            value={formatNumber(DCE?.value || 0)}
          />

          <Single
            label='Округление периода реализации проекта (год) (PHD)'
            value={PHD}
          />

          <Single
            label='Дата получения эффекта проекта (PIDDC)'
            value={formatDate(PIDDC)}
          />

          <Single
            label='Горизонт планирования (год) (PH)'
            value={PH}
          />
        </Block>

        <Table label='Шаг Расчета (ST)'>
          {ST?.map(indexST => (
            <TableCol key={indexST}>
              <TableCell
                type='head'
                label={getYear(SY[indexST])}
              />

              <TableCell
                type='body'
                label={indexST}
              />
            </TableCol>
          ))}
        </Table>

        <Table label='Параметр для округления года до 31.12.гггг (SH)'>
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

        <Table label='Коэффициент распределения эффекта (SHRR)'>
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

        <Effect title='Эффект проекта (PE)'>
          {effectCount?.map(n => {
            const NPE = PE?.[`NPE${n}`]
            const { NP, NPET, PC, EPP } = NPE || {}

            return (
              <EffectItem
                key={n}
                label='Наименование продукции (NP)'
                value={NP}
              >
                <EffectCol>
                  <EffectCell
                    label='Объем производства'
                    measure={`(${NPET?.measure}) (NPET)`}
                  />

                  <EffectCell
                    label='Cтоимость продукций'
                    measure={`(${PC?.measure}) (PC)`}
                  />

                  <EffectCell
                    label='Процессинг производства'
                    measure={`(${EPP?.measure}) (EPP)`}
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
            label='Период амортизации (AMOR)'
            value={AMOR}
          />

          <Single
            label='Капитальные затраты без НДС (CAPEX)'
            value={`${formatNumber(CAPEX?.value || 0)} ${CAPEX?.measure}`}
          />

          <Single
            label='Параметр (WCR)'
            value={WCR}
          />
        </Block>

        <Table label='Коэффициент распределения (KR)'>
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

        <Table label={`План финансирования без НДС (${CAPEX?.measure}) (FP)`}>
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
            label='Дефлятор (инфляция в РФ) (DEF)'
            value={`${formatNumber(DEF || 0)}%`}
          />

          <Single
            label='Дефлятор (инфляция в США) (GRT)'
            value={`${formatNumber(GRT || 0)}%`}
          />

          <Single
            label='Учитывать терминальную стоимость? (TV_enabled)'
            value={TV_enabled ? 'Да' : 'Нет'}
          />

          <Single
            label='Средневзвешенная стоимость капитала (WACC)'
            value={`${formatNumber(WACC || 0)}%`}
          />

          <Single
            label='Рабочий капитал (WCD)'
            value={`${formatNumber(WCD || 0)}%`}
          />

          <Single
            label='Затраты на ремонт и тех. обслуживания (RMCD)'
            value={`${formatNumber(RMCD || 0)}%`}
          />

          <Single
            label='Налог на прибыль (ITXD)'
            value={`${formatNumber(ITXD || 0)}%`}
          />

          <Single
            label='Налог на недвижимое имущество (RETD)'
            value={`${formatNumber(RETD || 0)}%`}
          />
        </Block>
      </Section>

      <Section title='Модуль 2'>
        <Table label='Параметр для округления года до 31.12.гггг (SH)'>
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

        <Table label='Дата получения денежного потока (DCFR)'>
          {ST?.map(indexST => (
            <TableCol key={indexST}>
              <TableCell
                type='head'
                label={getYear(SY[indexST])}
              />

              <TableCell
                type='body'
                label={formatDate(DCFR[indexST])}
              />
            </TableCol>
          ))}
        </Table>

        <Table label={`Валовая выручка (${RV?.measure}) (RV)`}>
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

        <Table label={`Процессинг производства (расходы) (${RACH?.measure}) (RACH)`}>
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

        <Table label={`Aмортизация (${DPR?.measure}) (DPR)`}>
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

        <Table label={`Остаточная стоимость на начало периода (${RVATB?.measure}) (RVATB)`}>
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

        <Table label={`Остаточная стоимость на конец периода (${RVATP?.measure}) (RVATP)`}>
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

        <Table label={`Налог на недвижимое имущество (${RETR?.measure}) (RETR)`}>
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

        <Table label={`Затраты на ремонт и тех. обслуживания (${RMCR?.measure}) (RMCR)`}>
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

        <Table label={`Прибыль до уплаты %, налогов и амортизации (${EBITDA?.measure}) (EBITDA)`}>
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

        <Table label={`Прибыль до уплаты % и налогов (${EBIT?.measure}) (EBIT)`}>
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

        <Table label={`Налог на прибыль (${ITXR?.measure}) (ITXR)`}>
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

        <Table label={`Чистая прибыль (${ENP?.measure}) (ENP)`}>
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

        <Table label={`Чистый денежный поток (${FCFF?.measure}) (FCFF)`}>
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

        <Table label={`Период дисконтирования (DPRD)`}>
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

        <Table label={`Фактор дисконтирования (DCFCR)`}>
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

        <Table label={`Приведенный денежный поток (${PVFCFF?.measure}) (PVFCFF)`}>
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

        <Table label={`Накопленный денежный поток (${ACF?.measure}) (ACF)`}>
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

        <Table label={`Накопленный дисконтированный денежный поток (${ADCF?.measure}) (ADCF)`}>
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
          label={`Чистый денежный поток ${TV_enabled ? 'с TV' : ''} (${NCFTV?.measure}) (NCFTV)`}
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
      </Section>

      <Section title='Модуль 3'>
        <Block>
          <Single
            label='Капитальные затраты без НДС (CAPEX)'
            value={`${formatNumber(CAPEX?.value || 0)} ${CAPEX?.measure}`}
          />

          <Single
            label='Капитальные затраты c НДС (CAPEX)'
            value={`${formatNumber((CAPEX?.value || 0) * 1.2)} ${CAPEX?.measure}`}
          />

          <Single
            label='Терминальная стоимость (TV)'
            value={`${formatNumber(TV?.collection || 0)} ${TV?.measure}`}
          />

          <Single
            label='Cуммарный приведенный денежный поток (SDFCFF)'
            value={`${formatNumber(SDFCFF?.collection || 0)} ${SDFCFF?.measure}`}
          />

          <Single
            label='Чистая приведённая стоимость (NPV)'
            value={`${formatNumber(NPV?.collection || 0)} ${NPV?.measure}`}
          />

          <Single
            label='Внутренняя норма рентабельности (IRR)'
            value={`${formatNumber(IRR?.value)}%`}
          />

          <Single
            label='Простой срок окупаемости с даты начала реализации (год) (PP)'
            value={formatNumber(PP)}
          />

          <Single
            label='Дисконтированный срок окупаемости с даты начала реализации (год) (DPP)'
            value={formatNumber(DPP)}
          />
        </Block>
      </Section>

      <div className={styles.buttons}>
        <Button
          className={styles.button}
          variant='gradient'
          size='lg'
          color='blue'
          onClick={handleBack}
        >
          Назад
        </Button>

        <Button
          className={styles.button}
          variant='gradient'
          size='lg'
          color='blue'
          onClick={handleCharts}
        >
          Графики
        </Button>
      </div>
    </>
  )
}

export default Dev
