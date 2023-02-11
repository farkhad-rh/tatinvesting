import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

import { StorageService, ICalculate, ICalculateArray, ICalculateSingle } from '@services'

export const { persistAtom: persistCalculate } = recoilPersist({
  key: 'recoil-persist-calculate',
  storage: StorageService('local'),
})

export const initialCalculateState: ICalculate = {
  DCFR: [],
  RV: {} as ICalculateArray,
  RACH: {} as ICalculateArray,
  DPR: {} as ICalculateArray,
  RVATB: {} as ICalculateArray,
  RVATP: {} as ICalculateArray,
  RETR: {} as ICalculateArray,
  RMCR: {} as ICalculateArray,
  EBITDA: {} as ICalculateArray,
  EBIT: {} as ICalculateArray,
  ITXR: {} as ICalculateArray,
  ENP: {} as ICalculateArray,
  FCFF: {} as ICalculateArray,
  DPRD: [],
  DCFCR: [],
  PVFCFF: {} as ICalculateArray,
  ACF: {} as ICalculateArray,
  ADCF: {} as ICalculateArray,
  TV: {} as ICalculateSingle,
  NCFTV: {} as ICalculateArray,

  SDFCFF: {} as ICalculateSingle,
  NPV: {} as ICalculateSingle,
  IRR: {} as ICalculate['IRR'],
  PP: 0,
  DPP: 0,
}

export const calculateState = atom<ICalculate>({
  key: 'calculate-state',
  default: initialCalculateState,
  effects: [persistCalculate],
})
