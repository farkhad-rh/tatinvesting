import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { usePeriodService, useEffectService, IEffect, useParamsService } from '@services'

export const useEffectController = () => {
  const { register, control, watch, reset, resetField } = useForm<IEffect>({ mode: 'onChange' })

  const [period] = usePeriodService()
  const [params] = useParamsService()
  const [
    effect,
    { createPE, createCount, createNP, createNPET, createPC, createEPP, deleteEffect },
  ] = useEffectService()

  const { ST } = period
  const { DEF } = params
  const { count: effectCount } = effect

  const [count, setCount] = useState(effectCount?.length || 1)

  const handleAdd = () => setCount(prev => prev + 1)

  const handleRemove = () => {
    createPE({
      [`NPE${count - 1}`]: {
        NP: '',
        NPET: {},
        PC: {},
        EPP: {},
      },
    })

    resetField(`PE.NPE${count - 1}`)

    setCount(prev => prev - 1)
  }

  useEffect(() => {
    const subscription = watch(({ PE }) => {
      effectCount?.map(index => {
        const NPE = PE?.[`NPE${index}`]
        const NP = NPE?.NP
        const NPET = NPE?.NPET
        const PC = NPE?.PC
        const EPP = NPE?.EPP

        if (NP !== undefined) {
          createNP(NP, index)
        }

        if (NPET) {
          const calculate = (NPET?.value || 0) * Number(NPET?.power) * Number(NPET?.unit) || 0

          const collection = ST?.map(() => NPET?.value || 0)

          createNPET({ ...NPET, calc: calculate, collection: collection }, index)
        }

        if (PC) {
          const calculate = (PC?.value || 0) * Number(PC?.power) * Number(PC?.currency) || 0

          const collection = ST?.map(indexST => {
            return Math.round((PC?.value || 0) * Math.pow(1 + (DEF || 0), indexST) * 100) / 100 || 0
          })

          createPC({ ...PC, calc: calculate, collection: collection }, index)
        }

        if (EPP) {
          const calculate = (EPP?.value || 0) * Number(EPP?.power) * Number(EPP?.currency) || 0

          const collection = ST?.map(indexST => {
            return (
              Math.round((EPP?.value || 0) * Math.pow(1 + (DEF || 0), indexST) * 100) / 100 || 0
            )
          })

          createEPP({ ...EPP, calc: calculate, collection: collection }, index)
        }
      })
    })

    return () => subscription.unsubscribe()
  }, [watch, effectCount])

  useEffect(() => {
    if (count) {
      createCount(count)
    }
  }, [count])

  return { register, control, reset, handleAdd, handleRemove, effect, deleteEffect }
}
