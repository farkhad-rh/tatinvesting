import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { formatPercent } from '@utils'
import { useParamsService, IParams } from '@services'

export const useParamsController = () => {
  const { register, watch, reset } = useForm<IParams>({ mode: 'onChange' })

  const [
    params,
    {
      createDEF,
      createGRT,
      createITXD,
      createRETD,
      createRMCD,
      createWACC,
      createWCD,
      switchTV,
      deleteParams,
    },
  ] = useParamsService()

  useEffect(() => {
    const subscription = watch(({ DEF, GRT, ITXD, RETD, RMCD, WACC, WCD, TV_enabled }) => {
      if (DEF !== undefined) {
        createDEF(formatPercent(DEF))
      }

      if (GRT !== undefined) {
        createGRT(formatPercent(GRT))
      }

      if (ITXD !== undefined) {
        createITXD(formatPercent(ITXD))
      }

      if (RETD !== undefined) {
        createRETD(formatPercent(RETD))
      }

      if (RMCD !== undefined) {
        createRMCD(formatPercent(RMCD))
      }

      if (WACC !== undefined) {
        createWACC(formatPercent(WACC))
      }

      if (WCD !== undefined) {
        createWCD(formatPercent(WCD))
      }

      if (TV_enabled !== undefined) {
        switchTV(TV_enabled)
      }
    })

    return () => subscription.unsubscribe()
  }, [watch])

  return { register, reset, params, deleteParams }
}
