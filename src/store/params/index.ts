import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

import { StorageService, IParams } from '@services'

export const { persistAtom: persistParams } = recoilPersist({
  key: 'recoil-persist-params',
  storage: StorageService('local'),
})

export const initialParamsState: IParams = {
  DEF: 0.04,
  GRT: 0.02,
  ITXD: 0.2,
  RETD: NaN,
  RMCD: 0.2,
  WACC: NaN,
  WCD: 0.23,
  TV_enabled: false,
}

export const paramsState = atom<IParams>({
  key: 'params-state',
  default: initialParamsState,
  effects: [persistParams],
})
