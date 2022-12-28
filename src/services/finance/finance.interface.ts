export interface iCAPEX {
  value?: number
  power?: string
  currency?: string
  calc?: number
}

export interface IFinance {
  AMOR: number
  CAPEX: iCAPEX
  KR: number[]
  FP: number[]
}

export interface IFinanceActions {
  createFinance: (payload: IFinance) => void

  createCAPEX: (payload: IFinance['CAPEX']) => void
  createKR: (payload: IFinance['KR']) => void
  createFP: (payload: IFinance['FP']) => void

  deleteFinance: () => void
}
