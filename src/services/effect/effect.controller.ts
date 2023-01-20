import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import {
  Currencies,
  CurrenciesString,
  Powers,
  PowersString,
  WeightUnits,
  WeightUnitsString,
} from '@enums'

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

  const handleEffect = (effect: IEffect['PE']) => {
    effectCount?.map(index => {
      const NPE = effect?.[`NPE${index}`]
      const { NP, NPET, PC, EPP } = NPE || {}

      // Наименование продукции (NP)
      if (NP !== undefined) {
        createNP(NP, index)
      }

      // Объем производства (NPET)
      if (NPET) {
        const power = NPET?.power || 'NONE'
        const unit = NPET?.unit || 'TONNE'
        const measure = `${PowersString[power]} ${WeightUnitsString[unit]}`

        const collection = ST?.map(() => NPET?.value || 0)
        const calculation = ST?.map(
          () => (NPET?.value || 0) * Powers[power] * WeightUnits[unit] || 0
        )

        createNPET({ ...NPET, measure, calculation, collection }, index)
      }

      // Cтоимость продукций (PC)
      if (PC) {
        const power = PC?.power || 'NONE'
        const currency = PC?.currency || 'RUB'
        const measure = `${PowersString[power]} ${CurrenciesString[currency]}`

        const collection = ST?.map(indexST => {
          return (PC?.value || 0) * Math.pow(1 + formatPercent(DEF || 0), indexST) || 0
        })
        const calculation = ST?.map(
          indexST => collection[indexST] * Powers[power] * Currencies[currency] || 0
        )

        createPC({ ...PC, measure, calculation, collection }, index)
      }

      // Процессинг производства (EPP)
      if (EPP) {
        const power = EPP?.power || 'NONE'
        const currency = EPP?.currency || 'RUB'
        const measure = `${PowersString[power]} ${CurrenciesString[currency]}`

        const collection = ST?.map(indexST => {
          return (EPP?.value || 0) * Math.pow(1 + formatPercent(DEF || 0), indexST) || 0
        })
        const calculation = ST?.map(
          indexST => collection[indexST] * Powers[power] * Currencies[currency] || 0
        )

        createEPP({ ...EPP, measure, calculation, collection }, index)
      }
    })
  }

  useEffect(() => {
    const subscription = watch(({ PE }) => {
      handleEffect(PE)
    })

    return () => subscription.unsubscribe()
  }, [watch, effectCount, ST, DEF])

  useEffect(() => {
    handleEffect(PE)
  }, [ST, DEF])

  useEffect(() => {
    // Количество продуктов
    if (count) {
      createCount(count)
    }
  }, [count])

  return { register, control, reset, handleAdd, handleRemove, effect, deleteEffect }
}
