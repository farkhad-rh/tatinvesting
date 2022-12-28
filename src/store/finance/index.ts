import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

import { StorageService, IFinance } from '@services'

export const { persistAtom: persistFinance } = recoilPersist({
  key: 'recoil-persist-finance',
  storage: StorageService('local'),
})

export const initialFinanceState: IFinance = {
  AMOR: 15,
  CAPEX: {} as IFinance['CAPEX'],
  KR: [],
  FP: [],
}

export const financeState = atom<IFinance>({
  key: 'finance-state',
  default: initialFinanceState,
  effects: [persistFinance],
})
