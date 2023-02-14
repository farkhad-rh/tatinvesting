import { TCurrencies, TPowers, TWeightUnits } from '@constants'

export interface IEffectParams {
  value?: number

  power?: TPowers
  unit?: TWeightUnits
  currency?: TCurrencies
  measure?: string

  collection?: (number | undefined)[]
  calculation?: (number | undefined)[]

  matrix?: (((number | undefined)[] | undefined)[] | undefined)[]
}

export interface iNPE {
  NP?: string
  NPET?: IEffectParams
  PC?: IEffectParams
  EPP?: IEffectParams
}

export interface IEffect {
  PE?: {
    [key: string]: iNPE | undefined
  }
  count: number[]
}

export interface IEffectActions {
  createEffect: (payload: IEffect) => void

  createPE: (payload: IEffect['PE']) => void
  createCount: (payload: number) => void

  createNP: (payload: iNPE['NP'], index: number) => void
  createNPET: (payload: iNPE['NPET'], index: number) => void
  createPC: (payload: iNPE['PC'], index: number) => void
  createEPP: (payload: iNPE['EPP'], index: number) => void

  deleteEffect: () => void
}
