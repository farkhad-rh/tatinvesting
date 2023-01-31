import { CurrenciesType, PowersType } from '@constants'

export interface ICalculateMeasure {
  power?: PowersType
  currency?: CurrenciesType
  measure?: string
}

export interface ICalculateArray extends ICalculateMeasure {
  value?: number[]
  collection?: number[]
}

export interface ICalculateSingle extends ICalculateMeasure {
  value?: number
  collection?: number
}

export interface ICalculate {
  DCFR: string[]
  RV: ICalculateArray
  RACH: ICalculateArray
  DPR: ICalculateArray
  RVATB: ICalculateArray
  RVATP: ICalculateArray
  RETR: ICalculateArray
  RMCR: ICalculateArray
  EBITDA: ICalculateArray
  EBIT: ICalculateArray
  ITXR: ICalculateArray
  ENP: ICalculateArray
  FCFF: ICalculateArray
  DPRD: number[]
  DCFCR: number[]
  PVFCFF: ICalculateArray
  ACF: ICalculateArray
  ADCF: ICalculateArray
  TV: ICalculateSingle
  NCFTV: ICalculateArray

  SDFCFF: ICalculateSingle
  NPV: ICalculateSingle
  IRR: number
  PP: number
  DPP: number
}

export interface ICalculateActions {
  createCalculate: (payload: ICalculate) => void

  createDCFR: (payload: ICalculate['DCFR']) => void
  createRV: (payload: ICalculateArray) => void
  createRACH: (payload: ICalculateArray) => void
  createDPR: (payload: ICalculateArray) => void
  createRVATB: (payload: ICalculateArray) => void
  createRVATP: (payload: ICalculateArray) => void
  createRETR: (payload: ICalculateArray) => void
  createRMCR: (payload: ICalculateArray) => void
  createEBITDA: (payload: ICalculateArray) => void
  createEBIT: (payload: ICalculateArray) => void
  createITXR: (payload: ICalculateArray) => void
  createENP: (payload: ICalculateArray) => void
  createFCFF: (payload: ICalculateArray) => void
  createDPRD: (payload: ICalculate['DPRD']) => void
  createDCFCR: (payload: ICalculate['DCFCR']) => void
  createPVFCFF: (payload: ICalculateArray) => void
  createACF: (payload: ICalculateArray) => void
  createADCF: (payload: ICalculateArray) => void
  createTV: (payload: ICalculateSingle) => void
  createNCFTV: (payload: ICalculateArray) => void

  createSDFCFF: (payload: ICalculateSingle) => void
  createNPV: (payload: ICalculateSingle) => void
  createIRR: (payload: ICalculate['IRR']) => void
  createPP: (payload: ICalculate['PP']) => void
  createDPP: (payload: ICalculate['DPP']) => void

  deleteCalculate: () => void
}
