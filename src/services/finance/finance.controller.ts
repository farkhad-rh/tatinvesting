import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { Currencies, CurrenciesString, Powers, PowersString } from '@enums'

import { useFinanceService, IFinance } from '@services'

export const useFinanceController = () => {
  const { register, control, watch, reset } = useForm<IFinance>({ mode: 'onChange' })

  const [finance, { createCAPEX, createKR, createFP, deleteFinance }] = useFinanceService()

  useEffect(() => {
    const subscription = watch(({ CAPEX, KR }) => {
      // Капитальные затраты без НДС (CAPEX)
      if (CAPEX) {
        const power = CAPEX?.power || 'NONE'
        const currency = CAPEX?.currency || 'RUB'
        const measure = `${PowersString[power]} ${CurrenciesString[currency]}`

        const calculation = (CAPEX?.value || 0) * Powers[power] * Currencies[currency] || 0

        createCAPEX({
          ...CAPEX,
          measure,
          calculation,
        })
      }

      if (CAPEX && KR) {
        // Коэффициент распределения (KR)
        const KRvalidate = KR?.value?.map(number => {
          if (
            (KR?.value
              ?.map(number => (number || 0) * 10)
              .reduce((a, b) => (a || 0) + (b || 0), 0) || 0) /
              10 >
            1
          )
            return 0

          return number || 0
        })

        const KRlimit =
          (10 -
            (KR?.value
              ?.map(number => (number || 0) * 10)
              .reduce((a, b) => (a || 0) + (b || 0), 0) || 0)) /
          10

        // План финансирования без НДС (FP)
        const FP = KRvalidate?.map(number => (CAPEX?.value || 0) * (number || 0))

        createKR({ value: KRvalidate, limit: KRlimit })
        createFP(FP)
      }
    })

    return () => subscription.unsubscribe()
  }, [watch])

  return { register, control, reset, finance, deleteFinance }
}
