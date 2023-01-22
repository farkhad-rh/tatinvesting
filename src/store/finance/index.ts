import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

import { StorageService, IFinance } from '@services'

export const { persistAtom: persistFinance } = recoilPersist({
  key: 'recoil-persist-finance',
  storage: StorageService('local'),
})

export const initialFinanceState: IFinance = {
  CAPEX: {} as IFinance['CAPEX'],
  KR: {
    value: [],
    limit: 1,
  },
  FP: [],
  AMOR: 15,
  WCR: 0,
}

export const financeState = atom<IFinance>({
  key: 'finance-state',
  default: initialFinanceState,
  effects: [persistFinance],
})
