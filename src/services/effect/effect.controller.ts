import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Currencies, Powers, WeightUnits } from '@enums'

import { usePeriodService, useEffectService, IEffect, useParamsService } from '@services'
import { formatPercent } from '@utils'

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
  const { PE, count: effectCount } = effect

  const [count, setCount] = useState(effectCount?.length || 1)

  const handleAdd = () => {
    setCount(prev => prev + 1)

    resetField(`PE.NPE${count - 1}`)
  }

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
          const power = NPET?.power || 'THOU'
          const unit = NPET?.unit || 'TONNE'
          const calculate = (NPET?.value || 0) * Powers[power] * WeightUnits[unit] || 0

          const collection = ST?.map(() => NPET?.value || 0)

          createNPET({ ...NPET, calc: calculate, collection: collection }, index)
        }

        if (PC) {
          const power = PC?.power || 'THOU'
          const currency = PC?.currency || 'RUB'
          const calculate = (PC?.value || 0) * Powers[power] * Currencies[currency] || 0

          const collection = ST?.map(indexST => {
            return (
              ((PC?.value || 0) * Math.pow(1 + formatPercent(DEF || 0), indexST) * 100) / 100 || 0
            )
          })

          createPC({ ...PC, calc: calculate, collection: collection }, index)
        }

        if (EPP) {
          const power = EPP?.power || 'THOU'
          const currency = EPP?.currency || 'RUB'
          const calculate = (EPP?.value || 0) * Powers[power] * Currencies[currency] || 0

          const collection = ST?.map(indexST => {
            return (
              ((EPP?.value || 0) * Math.pow(1 + formatPercent(DEF || 0), indexST) * 100) / 100 || 0
            )
          })

          createEPP({ ...EPP, calc: calculate, collection: collection }, index)
        }
      })
    })

    return () => subscription.unsubscribe()
  }, [watch, effectCount, ST, DEF])

  useEffect(() => {
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
        const power = NPET?.power || 'THOU'
        const unit = NPET?.unit || 'TONNE'
        const calculate = (NPET?.value || 0) * Powers[power] * WeightUnits[unit] || 0

        const collection = ST?.map(() => NPET?.value || 0)

        createNPET({ ...NPET, calc: calculate, collection: collection }, index)
      }

      if (PC) {
        const power = PC?.power || 'THOU'
        const currency = PC?.currency || 'RUB'
        const calculate = (PC?.value || 0) * Powers[power] * Currencies[currency] || 0

        const collection = ST?.map(indexST => {
          return (
            ((PC?.value || 0) * Math.pow(1 + formatPercent(DEF || 0), indexST) * 100) / 100 || 0
          )
        })

        createPC({ ...PC, calc: calculate, collection: collection }, index)
      }

      if (EPP) {
        const power = EPP?.power || 'THOU'
        const currency = EPP?.currency || 'RUB'
        const calculate = (EPP?.value || 0) * Powers[power] * Currencies[currency] || 0

        const collection = ST?.map(indexST => {
          return (
            ((EPP?.value || 0) * Math.pow(1 + formatPercent(DEF || 0), indexST) * 100) / 100 || 0
          )
        })

        createEPP({ ...EPP, calc: calculate, collection: collection }, index)
      }
    })
  }, [ST, DEF])

  useEffect(() => {
    if (count) {
      createCount(count)
    }
  }, [count])

  return { register, control, reset, handleAdd, handleRemove, effect, deleteEffect }
}
