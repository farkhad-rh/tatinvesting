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
        createDEF(DEF)
      }

      if (DEF !== undefined) {
        createGRT(GRT)
      }

      if (DEF !== undefined) {
        createITXD(ITXD)
      }

      if (DEF !== undefined) {
        createRETD(RETD)
      }

      if (DEF !== undefined) {
        createRMCD(RMCD)
      }

      if (DEF !== undefined) {
        createWACC(WACC)
      }

      if (DEF !== undefined) {
        createWCD(WCD)
      }

      if (TV_enabled !== undefined) {
        switchTV(TV_enabled)
      }
    })

    return () => subscription.unsubscribe()
  }, [watch])

  return { register, reset, params, deleteParams }
}
