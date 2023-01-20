import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

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
      // Дефлятор (инфляция в РФ) (DEF)
      if (DEF !== undefined) {
        createDEF(DEF)
      }

      // Дефлятор (инфляция в США) (GRT)
      if (GRT !== undefined) {
        createGRT(GRT)
      }

      // Налог на прибыль (ITXD)
      if (ITXD !== undefined) {
        createITXD(ITXD)
      }

      // Налог на недвижимое имущество (RETD)
      if (RETD !== undefined) {
        createRETD(RETD)
      }

      // Затраты на ремонт и тех. обслуживания (RMCD)
      if (RMCD !== undefined) {
        createRMCD(RMCD)
      }

      // Средневзвешенная стоимость капитала (WACC)
      if (WACC !== undefined) {
        createWACC(WACC)
      }

      // Рабочий капитал (WCD)
      if (WCD !== undefined) {
        createWCD(WCD)
      }

      // Учитывать терминальную стоимость? (TV_enabled)
      if (TV_enabled !== undefined) {
        switchTV(TV_enabled)
      }
    })

    return () => subscription.unsubscribe()
  }, [watch])

  return { register, reset, params, deleteParams }
}
