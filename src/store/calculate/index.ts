import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

import { StorageService, ICalculate, ICalculateParams } from '@services'

export const { persistAtom: persistCalculate } = recoilPersist({
  key: 'recoil-persist-calculate',
  storage: StorageService('local'),
})

export const initialCalculateState: ICalculate = {
  DCFR: [],
  RV: {} as ICalculateParams,
  DPR: {} as ICalculateParams,
  RVATB: {} as ICalculateParams,
  RVATP: {} as ICalculateParams,
  RETR: {} as ICalculateParams,
  RMCR: {} as ICalculateParams,
  RACH: {} as ICalculateParams,
  EBITDA: {} as ICalculateParams,
  EBIT: {} as ICalculateParams,
  ITXR: {} as ICalculateParams,
  ENP: {} as ICalculateParams,
  FCFF: {} as ICalculateParams,
  DPRD: [],
  DCFCR: [],
  PVFCFF: {} as ICalculateParams,
  ACF: {} as ICalculateParams,
  ADCF: {} as ICalculateParams,
  TV: 0,
  NCFTV: {} as ICalculateParams,
}

export const calculateState = atom<ICalculate>({
  key: 'calculate-state',
  default: initialCalculateState,
  effects: [persistCalculate],
})
