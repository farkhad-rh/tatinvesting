import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

import { StorageService, IPeriod } from '@services'

export const { persistAtom: persistPeriod } = recoilPersist({
  key: 'recoil-persist-period',
  storage: StorageService('local'),
})

export const initialPeriodState: IPeriod = {
  PH: '15',
  PHD: 0,
  PID: '',
  PIDDC: '',
  DCE: {} as IPeriod['DCE'],
  ST: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
  SH: [],
  SHRR: [],
}

export const periodState = atom<IPeriod>({
  key: 'period-state',
  default: initialPeriodState,
  effects: [persistPeriod],
})
