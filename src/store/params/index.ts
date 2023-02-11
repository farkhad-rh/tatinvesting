import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

import { StorageService, IParams } from '@services'

export const { persistAtom: persistParams } = recoilPersist({
  key: 'recoil-persist-params',
  storage: StorageService('local'),
})

export const initialParamsState: IParams = {
  DEF: 4,
  GRT: 2,
  ITXD: 20,
  RETD: 2,
  RMCD: 2,
  WACC: 14.62,
  WCD: 10.5,
  TV_enabled: false,
}

export const paramsState = atom<IParams>({
  key: 'params-state',
  default: initialParamsState,
  effects: [persistParams],
})
