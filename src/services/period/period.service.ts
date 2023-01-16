import { useRecoilState, useRecoilValue } from 'recoil'

import { initialPeriodState, periodState } from '@store'

import { IPeriod, IPeriodActions } from './period.interface'

export const usePeriodService = (): [IPeriod, IPeriodActions] => {
  const [period, setPeriod] = useRecoilState(periodState)
  const periodValue = useRecoilValue(periodState)

  const createPeriod = (payload: IPeriod) =>
    setPeriod(prev => {
      return { ...prev, ...payload }
    })

  const createPH = (payload: IPeriod['PH']) =>
    setPeriod(prev => {
      return { ...prev, PH: payload }
    })

  const createPHD = (payload: IPeriod['PHD']) =>
    setPeriod(prev => {
      return { ...prev, PHD: payload }
    })

  const createPID = (payload: IPeriod['PID']) =>
    setPeriod(prev => {
      return { ...prev, PID: payload }
    })

  const createPIDDC = (payload: IPeriod['PIDDC']) =>
    setPeriod(prev => {
      return { ...prev, PIDDC: payload }
    })

  const createDCE = (payload: IPeriod['DCE']) =>
    setPeriod(prev => {
      return { ...prev, DCE: { ...prev?.DCE, ...payload } }
    })

  const createST = (payload: IPeriod['ST']) =>
    setPeriod(prev => {
      return { ...prev, ST: payload }
    })

  const createSY = (payload: IPeriod['SY']) =>
    setPeriod(prev => {
      return { ...prev, SY: payload }
    })

  const createSH = (payload: IPeriod['SH']) =>
    setPeriod(prev => {
      return { ...prev, SH: payload }
    })

  const createSHRR = (payload: IPeriod['SHRR']) =>
    setPeriod(prev => {
      return { ...prev, SHRR: payload }
    })

  const deletePeriod = () => setPeriod(initialPeriodState)

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
