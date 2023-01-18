import { useRecoilState, useRecoilValue } from 'recoil'

import { initialEffectState, effectState } from '@store'

import { iNPE, IEffect, IEffectActions } from './effect.interface'

export const useEffectService = (): [IEffect, IEffectActions] => {
  const [effect, setEffect] = useRecoilState(effectState)
  const effectValue = useRecoilValue(effectState)

  const createEffect = (payload: IEffect) =>
    setEffect(prev => {
      return { ...prev, ...payload }
    })

  const createPE = (payload: IEffect['PE']) =>
    setEffect(prev => {
      return { ...prev, PE: { ...prev?.PE, ...payload } }
    })

  const createCount = (payload: number) =>
    setEffect(prev => {
      return { ...prev, count: [...Array(payload).keys()] }
    })

  const createNP = (payload: iNPE['NP'], index: number) =>
    setEffect(prev => {
      return {
        ...prev,
        PE: { ...prev?.PE, [`NPE${index}`]: { ...prev?.PE?.[`NPE${index}`], NP: payload } },
      }
    })

  const createNPET = (payload: iNPE['NPET'], index: number) =>
    setEffect(prev => {
      return {
        ...prev,
        PE: {
          ...prev?.PE,
          [`NPE${index}`]: {
            ...prev?.PE?.[`NPE${index}`],
            NPET: {
              ...prev?.PE?.[`NPE${index}`]?.NPET,
              ...payload,
            },
          },
        },
      }
    })

  const createPC = (payload: iNPE['PC'], index: number) =>
    setEffect(prev => {
      return {
        ...prev,
        PE: {
          ...prev?.PE,
          [`NPE${index}`]: {
            ...prev?.PE?.[`NPE${index}`],
            PC: {
              ...prev?.PE?.[`NPE${index}`]?.PC,
              ...payload,
            },
          },
        },
      }
    })

  const createEPP = (payload: iNPE['EPP'], index: number) =>
    setEffect(prev => {
      return {
        ...prev,
        PE: {
          ...prev?.PE,
          [`NPE${index}`]: {
            ...prev?.PE?.[`NPE${index}`],
            EPP: {
              ...prev?.PE?.[`NPE${index}`]?.EPP,
              ...payload,
            },
          },
        },
      }
    })

  const deleteEffect = () => setEffect(initialEffectState)

  return [
    effect ?? effectValue,
    {
      createEffect,
      createPE,
      createCount,
      createNP,
      createNPET,
      createPC,
      createEPP,
      deleteEffect,
    },
  ]
}
