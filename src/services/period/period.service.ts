import { useRecoilState, useRecoilValue } from 'recoil'

import { initialPeriodState, periodState } from '@store'

import { IPeriod, IPeriodActions } from './period.interface'

export const usePeriodService = (): [IPeriod, IPeriodActions] => {
  const [period, setPeriod] = useRecoilState(periodState)
  const periodValue = useRecoilValue(periodState)

  const createPeriod: IPeriodActions['createPeriod'] = payload =>
    setPeriod(prev => {
      return { ...prev, ...payload }
    })

  const createPH: IPeriodActions['createPH'] = payload =>
    setPeriod(prev => {
      return { ...prev, PH: payload }
    })

  const createPHD: IPeriodActions['createPHD'] = payload =>
    setPeriod(prev => {
      return { ...prev, PHD: payload }
    })

  const createPID: IPeriodActions['createPID'] = payload =>
    setPeriod(prev => {
      return { ...prev, PID: payload }
    })

  const createPIDDC: IPeriodActions['createPIDDC'] = payload =>
    setPeriod(prev => {
      return { ...prev, PIDDC: payload }
    })

  const createDCE: IPeriodActions['createDCE'] = payload =>
    setPeriod(prev => {
      return { ...prev, DCE: { ...prev?.DCE, ...payload } }
    })

  const createST: IPeriodActions['createST'] = payload =>
    setPeriod(prev => {
      return { ...prev, ST: payload }
    })

  const createSY: IPeriodActions['createSY'] = payload =>
    setPeriod(prev => {
      return { ...prev, SY: payload }
    })

  const createSH: IPeriodActions['createSH'] = payload =>
    setPeriod(prev => {
      return { ...prev, SH: payload }
    })

  const createSHRR: IPeriodActions['createSHRR'] = payload =>
    setPeriod(prev => {
      return { ...prev, SHRR: payload }
    })

  const deletePeriod: IPeriodActions['deletePeriod'] = () => setPeriod(initialPeriodState)

  return [
    period ?? periodValue,
    {
      createPeriod,
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
  ]
}
