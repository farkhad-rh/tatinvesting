import { useRecoilState, useRecoilValue } from 'recoil'

import { initialEffectState, effectState } from '@store'

import { IEffect, IEffectActions } from './effect.interface'

export const useEffectService = (): [IEffect, IEffectActions] => {
  const [effect, setEffect] = useRecoilState(effectState)
  const effectValue = useRecoilValue(effectState)

  const createEffect: IEffectActions['createEffect'] = payload =>
    setEffect(prev => {
      return { ...prev, ...payload }
    })

  const createPE: IEffectActions['createPE'] = payload =>
    setEffect(prev => {
      return { ...prev, PE: { ...prev?.PE, ...payload } }
    })

  const createCount: IEffectActions['createCount'] = payload =>
    setEffect(prev => {
      return { ...prev, count: [...Array(payload).keys()] }
    })

  const createNP: IEffectActions['createNP'] = (payload, index) =>
    setEffect(prev => {
      return {
        ...prev,
        PE: { ...prev?.PE, [`NPE${index}`]: { ...prev?.PE?.[`NPE${index}`], NP: payload } },
      }
    })

  const createNPET: IEffectActions['createNPET'] = (payload, index) =>
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

  const createPC: IEffectActions['createPC'] = (payload, index) =>
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

  const createEPP: IEffectActions['createEPP'] = (payload, index) =>
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

  const deleteEffect: IEffectActions['deleteEffect'] = () => setEffect(initialEffectState)

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
