import { TTimeUnits } from '@constants'

export interface iDCE {
  value?: number
  unit?: TTimeUnits
  measure?: string
}

export interface IPeriod {
  PH: string
  PHD: number
  PID: string
  PIDDC: string
  DCE: iDCE
  ST: number[]
  SY: string[]
  SH: string[]
  SHRR: number[]
}

export interface IPeriodActions {
  createPeriod: (payload: IPeriod) => void

  createPH: (payload: IPeriod['PH']) => void
  createPHD: (payload: IPeriod['PHD']) => void
  createPID: (payload: IPeriod['PID']) => void
  createPIDDC: (payload: IPeriod['PIDDC']) => void
  createDCE: (payload: IPeriod['DCE']) => void

  createST: (payload: IPeriod['ST']) => void
  createSY: (payload: IPeriod['SY']) => void
  createSH: (payload: IPeriod['SH']) => void
  createSHRR: (payload: IPeriod['SHRR']) => void

  deletePeriod: () => void
}
