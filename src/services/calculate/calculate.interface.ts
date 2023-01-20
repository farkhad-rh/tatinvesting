import { CurrenciesType, PowersType } from '@constants'

export interface ICalculateParams {
  value?: number[]

  power?: PowersType
  currency?: CurrenciesType
  measure?: string

  collection?: number[]
}

export interface ICalculate {
  DCFR: string[]
  RV: ICalculateParams
  DPR: ICalculateParams
  RVATB: ICalculateParams
  RVATP: ICalculateParams
  RETR: ICalculateParams
  RMCR: ICalculateParams
  RACH: ICalculateParams
  EBITDA: ICalculateParams
  EBIT: ICalculateParams
  ITXR: ICalculateParams
  ENP: ICalculateParams
  FCFF: ICalculateParams
  DPRD: number[]
  DCFCR: number[]
  PVFCFF: ICalculateParams
  ACF: ICalculateParams
  ADCF: ICalculateParams
  TV: number
  NCFTV: ICalculateParams
}

export interface ICalculateActions {
  createCalculate: (payload: ICalculate) => void

  createDCFR: (payload: ICalculate['DCFR']) => void
  createRV: (payload: ICalculateParams) => void
  createDPR: (payload: ICalculateParams) => void
  createRVATB: (payload: ICalculateParams) => void
  createRVATP: (payload: ICalculateParams) => void
  createRETR: (payload: ICalculateParams) => void
  createRMCR: (payload: ICalculateParams) => void
  createRACH: (payload: ICalculateParams) => void
  createEBITDA: (payload: ICalculateParams) => void
  createEBIT: (payload: ICalculateParams) => void
  createITXR: (payload: ICalculateParams) => void
  createENP: (payload: ICalculateParams) => void
  createFCFF: (payload: ICalculateParams) => void
  createDPRD: (payload: ICalculate['DPRD']) => void
  createDCFCR: (payload: ICalculate['DCFCR']) => void
  createPVFCFF: (payload: ICalculateParams) => void
  createACF: (payload: ICalculateParams) => void
  createADCF: (payload: ICalculateParams) => void
  createTV: (payload: ICalculate['TV']) => void
  createNCFTV: (payload: ICalculateParams) => void

  deleteCalculate: () => void
}
