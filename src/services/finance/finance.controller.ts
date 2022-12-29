import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { Currencies, Powers } from '@enums'

import { useFinanceService, IFinance } from '@services'

export const useFinanceController = () => {
  const { register, control, watch, reset } = useForm<IFinance>({ mode: 'onChange' })

  const [finance, { createCAPEX, createKR, createFP, deleteFinance }] = useFinanceService()

  useEffect(() => {
    const subscription = watch(({ CAPEX, KR }) => {
      if (CAPEX) {
        const power = CAPEX?.power || 'THOU'
        const currency = CAPEX?.currency || 'RUB'
        const calculate = (CAPEX?.value || 0) * Powers[power] * Currencies[currency] || 0

        createCAPEX({
          ...CAPEX,
          calc: calculate,
        })
      }

      if (CAPEX && KR) {
        const validateKR = KR?.map(number => {
          if ((KR?.reduce((a, b) => (a || 0) + (b || 0), 0) || 0) > 1) return 0

          return number || 0
        })

        const FP = validateKR?.map(number => (CAPEX?.value || 0) * (number || 0))

        createKR(validateKR)
        createFP(FP)
      }
    })

    return () => subscription.unsubscribe()
  }, [watch])

  return { register, control, reset, finance, deleteFinance }
}
