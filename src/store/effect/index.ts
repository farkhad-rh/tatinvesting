import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

import { StorageService, IEffect } from '@services'

export const { persistAtom: persistEffect } = recoilPersist({
  key: 'recoil-persist-effect',
  storage: StorageService('local'),
})

export const initialEffectState: IEffect = {
  PE: {} as IEffect['PE'],
  count: [],
}

export const effectState = atom<IEffect>({
  key: 'effect-state',
  default: initialEffectState,
  effects: [persistEffect],
})
