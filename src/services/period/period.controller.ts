import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { KDVG, KDVGV } from '@constants'

import { TimeUnitsString } from '@enums'

import { addDate, diffDate, getEndOfYear, getYear, leapYear } from '@utils'

import { usePeriodService, IPeriod } from '@services'

export const usePeriodController = () => {
  const { register, control, watch, reset } = useForm<IPeriod>({ mode: 'onChange' })

  const [
    period,
    {
      createPH,
      createPHD,
      createPID,
      createPIDDC,
      createDCE,
      createST,
      createSY,
      createSH,
      createSHRR,
      deletePeriod,
    },
  ] = usePeriodService()

  useEffect(() => {
    const subscription = watch(({ PH, PID, DCE }) => {
      // Горизонт планирования (PH)
      if (PH) {
        createPH(PH)
      }

      // Дата начала реализации проекта (PID)
      if (PID) {
        createPID(PID)
      }

      // Период реализации проекта (DCE)
      if (DCE) {
        const measure = TimeUnitsString[DCE?.unit || 'year']

        createDCE({ ...DCE, measure })
      }

      if (PH && PID && DCE) {
        // Дата получения эффекта проекта (PIDDC)
        const PIDDC = DCE?.value && DCE?.unit ? addDate(PID, Number(DCE?.value), DCE?.unit) : ''

        // Округление периода реализации проекта (PHD)
        const PHD = Math.ceil(diffDate(PIDDC, PID, 'day') / (leapYear(PIDDC) ? KDVGV : KDVG)) || 0

        // Шаг Расчета (ST)
        const ST = [...Array(Number(PH) + 1 + PHD).keys()]

        // Год Расчета (SY)
        const SY = ST?.map(n => addDate(PID, n, 'year'))

        // Параметр для округления года до 31.12.гггг (SH)
        const SH = ST?.map(n => getEndOfYear(SY[n]))

        // Коэффициент распределения эффекта (SHRR)
        const SHRR = ST?.map(n => {
          if (getYear(SY[n]) < getYear(PIDDC)) {
            return 0
          }

          if (getYear(SY[n]) > getYear(PIDDC)) {
            return 1
          }

          if (getYear(SY[n]) === getYear(PIDDC)) {
            return diffDate(SH[n], PIDDC, 'day') / (leapYear(PIDDC) ? KDVGV : KDVG)
          }

          return 1
        })

        createPIDDC(PIDDC)
        createPHD(PHD)
        createST(ST)
        createSY(SY)
        createSH(SH)
        createSHRR(SHRR)
      }
    })

    return () => subscription.unsubscribe()
  }, [watch])

  return { register, control, reset, period, deletePeriod }
}
