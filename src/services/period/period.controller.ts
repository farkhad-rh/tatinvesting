import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import * as dayjs from 'dayjs'

import { KDVG, KDVGV } from '@constants'
import { usePeriodService, IPeriod } from '@services'

export const usePeriodController = () => {
  const { register, control, watch, reset } = useForm<IPeriod>({ mode: 'onChange' })

  const [
    period,
    {
      createST,
      createPH,
      createPHD,
      createPID,
      createPIDDC,
      createDCE,
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
        const PIDDC = dayjs(PID)?.add(Number(DCE?.value), DCE?.unit)?.format('YYYY-MM-DD') || ''

        const PHD = Math.ceil(dayjs(PIDDC)?.diff(PID, 'day') / KDVGV) || 0

        const ST = [...Array(Number(PH) + 1 + PHD).keys()]

        const SH = ST?.map(n => dayjs(PID)?.add(n, 'year')?.endOf('year')?.format('YYYY-MM-DD'))

        const SHRR = ST?.map(n => {
          if (dayjs(PID).year() + n < dayjs(PIDDC).year()) {
            return 0
          }

          if (dayjs(PID).year() + n > dayjs(PIDDC).year()) {
            return 1
          }

          if (dayjs(PID).year() + n === dayjs(PIDDC).year()) {
            return Number((dayjs(SH[n])?.diff(PIDDC, 'day') / KDVG).toFixed(6))
          }

          return 1
        })

        createPIDDC(DCE?.value && DCE?.unit ? PIDDC : '')
        createPHD(PHD)
        createST(ST)
        createSH(SH)
        createSHRR(SHRR)
      }
    })

    return () => subscription.unsubscribe()
  }, [watch])

  return { register, control, reset, period, deletePeriod }
}
