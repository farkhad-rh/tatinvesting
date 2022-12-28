export interface IParams {
  DEF?: number
  GRT?: number
  ITXD?: number
  RETD?: number
  RMCD?: number
  WACC?: number
  WCD?: number
  TV_enabled?: boolean
}

export interface IParamsActions {
  createParams: (payload: IParams) => void

  createDEF: (payload: IParams['DEF']) => void
  createGRT: (payload: IParams['GRT']) => void

  createITXD: (payload: IParams['ITXD']) => void
  createRETD: (payload: IParams['RETD']) => void
  createRMCD: (payload: IParams['RMCD']) => void
  createWACC: (payload: IParams['WACC']) => void
  createWCD: (payload: IParams['WCD']) => void

  switchTV: (payload: IParams['TV_enabled']) => void

  deleteParams: () => void
}
