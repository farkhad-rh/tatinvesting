import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { KDVG, KDVGV } from '@constants'

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
      if (PH) {
        createPH(PH)
      }

      if (PID) {
        createPID(PID)
      }

      if (DCE) {
        createDCE(DCE)
      }

      if (PH && PID && DCE) {
        const PIDDC = DCE?.value && DCE?.unit ? addDate(PID, Number(DCE?.value), DCE?.unit) : ''

        const PHD = Math.ceil(diffDate(PIDDC, PID, 'day') / (leapYear(PIDDC) ? KDVGV : KDVG)) || 0

        const ST = [...Array(Number(PH) + 1 + PHD).keys()]

        const SY = ST?.map(n => addDate(PID, n, 'year'))

        const SH = ST?.map(n => getEndOfYear(SY[n]))

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
