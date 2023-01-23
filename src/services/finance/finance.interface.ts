import { CurrenciesType, PowersType } from '@constants'

export interface iCAPEX {
  value?: number

  power?: PowersType
  currency?: CurrenciesType
  measure?: string

  calculation?: number
}

export interface iKR {
  value?: number[]
  limit?: number
}

export interface iFP {
  value?: number[]

  power?: PowersType
  currency?: CurrenciesType
  measure?: string

  collection?: number[]
}

export interface IFinance {
  CAPEX: iCAPEX
  KR: iKR
  FP: iFP
  AMOR: number
  WCR: number
}

export interface IFinanceActions {
  createFinance: (payload: IFinance) => void

  createCAPEX: (payload: IFinance['CAPEX']) => void
  createKR: (payload: IFinance['KR']) => void
  createFP: (payload: IFinance['FP']) => void

  deleteFinance: () => void
}
