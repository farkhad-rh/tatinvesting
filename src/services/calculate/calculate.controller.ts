import { useEffect } from 'react'

import { KDVG, KDVGV } from '@constants'

import { Currencies, CurrenciesString, Powers, PowersString } from '@enums'

import { addDate, diffDate, formatPercent, getYear, leapYear } from '@utils'

import {
  ICalculateParams,
  useCalculateService,
  useEffectService,
  useFinanceService,
  useParamsService,
  usePeriodService,
} from '@services'

export const useCalculateController = () => {
  const [period] = usePeriodService()
  const [finance] = useFinanceService()
  const [effect] = useEffectService()
  const [params] = useParamsService()
  const [
    calculate,
    {
      createDCFR,
      createRV,
      createDPR,
      createRVATB,
      createRVATP,
      createRETR,
      createRMCR,
      createRACH,
      createEBITDA,
      createEBIT,
      createITXR,
      createENP,
      createFCFF,
      createDPRD,
      createDCFCR,
      createPVFCFF,
      createACF,
      createADCF,
      createTV,
      createNCFTV,
      deleteCalculate,
    },
  ] = useCalculateService()

  const { PH, PHD, PID, PIDDC, ST, SY, SH, SHRR } = period
  const { CAPEX, FP, WCR, AMOR } = finance
  const { PE, count: effectCount } = effect
  const { DEF, GRT, ITXD, RETD, RMCD, WACC, WCD, TV_enabled } = params

  useEffect(() => {
    // Дата получения денежного потока (DCFR)
    const DCFR = ST?.map(n => {
      const count = diffDate(SH[n], SH[n - 1], 'day') / 2

      if (getYear(SY[n]) < getYear(PIDDC)) {
        const count = diffDate(SH[n], SY[n], 'day') / 2

        return addDate(SY[n], count, 'day')
      }

      if (getYear(SY[n]) >= getYear(PIDDC)) {
        return addDate(SH[n - 1], count, 'day')
      }

      return addDate(SH[n - 1], count, 'day')
    })

    // Валовая выручка (RV)
    const RV: ICalculateParams = {
      value: ST?.map(n => {
        let value = 0

        effectCount?.forEach(indexNPE => {
          const NPE = PE?.[`NPE${indexNPE}`]

          value =
            ((NPE?.NPET?.calculation?.[n] || 0) * (NPE?.PC?.calculation?.[n] || 0) + value) *
            SHRR[n]
        })

        return value
      }),

      power: 'MLN',
      currency: 'RUB',
      measure: '',

      collection: [],
    }
    const RVmeasure = `${PowersString?.[RV?.power || 'MLN']} ${
      CurrenciesString?.[RV?.currency || 'RUB']
    }`
    const RVcollection = ST?.map(n => {
      const collection =
        (RV?.value?.[n] || 0) / Powers[RV?.power || 'MLN'] / Currencies[RV?.currency || 'RUB']

      return collection
    })

    // Aмортизация (DPR)
    const DPR: ICalculateParams = {
      value: ST?.map(n => {
        if (getYear(SY[n]) < getYear(PIDDC)) {
          return 0
        }

        if (getYear(SY[n]) >= getYear(PIDDC) && n - PHD < Number(PH)) {
          return (CAPEX?.calculation || 0) / AMOR
        }

        return 0
      }),

      power: 'MLN',
      currency: 'RUB',
      measure: '',

      collection: [],
    }
    const DPRmeasure = `${PowersString?.[DPR?.power || 'MLN']} ${
      CurrenciesString?.[DPR?.currency || 'RUB']
    }`
    const DPRcollection = ST?.map(n => {
      const collection =
        (DPR?.value?.[n] || 0) / Powers[DPR?.power || 'MLN'] / Currencies[DPR?.currency || 'RUB']

      return collection
    })

    // Остаточная стоимость на начало периода (RVATB)
    const RVATB: ICalculateParams = {
      value: [],

      power: 'MLN',
      currency: 'RUB',
      measure: '',

      collection: [],
    }

    // Остаточная стоимость на конец периода (RVATP)
    const RVATP: ICalculateParams = {
      value: [],

      power: 'MLN',
      currency: 'RUB',
      measure: '',

      collection: [],
    }

    // (RVATB) и (RVATP)
    ST?.forEach(n => {
      if (getYear(SY[n]) < getYear(PIDDC)) {
        RVATB?.value?.push(0)
        RVATP?.value?.push(0)
      }

      if (getYear(SY[n]) === getYear(PIDDC)) {
        RVATB?.value?.push(0)
        RVATP?.value?.push(CAPEX?.calculation || 0)
      }

      if (getYear(SY[n]) > getYear(PIDDC)) {
        RVATB?.value?.push(RVATP?.value?.[n - 1] || 0)

        const diff = (RVATB?.value?.[n] || 0) - (DPR?.value?.[n] || 0)

        RVATP?.value?.push(diff > 0 ? diff : RVATB?.value?.[n] || 0)
      }
    })

    const RVATBmeasure = `${PowersString?.[RVATB?.power || 'MLN']} ${
      CurrenciesString?.[RVATB?.currency || 'RUB']
    }`
    const RVATBcollection = ST?.map(n => {
      const collection =
        (RVATB?.value?.[n] || 0) /
        Powers[RVATB?.power || 'MLN'] /
        Currencies[RVATB?.currency || 'RUB']

      return collection
    })

    const RVATPmeasure = `${PowersString?.[RVATP?.power || 'MLN']} ${
      CurrenciesString?.[RVATP?.currency || 'RUB']
    }`
    const RVATPcollection = ST?.map(n => {
      const collection =
        (RVATP?.value?.[n] || 0) /
        Powers[RVATP?.power || 'MLN'] /
        Currencies[RVATP?.currency || 'RUB']

      return collection
    })

    // Налог на недвижимое имущество (RETR)
    const RETR: ICalculateParams = {
      value: ST?.map(n => {
        return (
          (((RVATB?.value?.[n] || 0) + (RVATP?.value?.[n] || 0)) / 2) * formatPercent(RETD || 0)
        )
      }),

      power: 'MLN',
      currency: 'RUB',
      measure: '',

      collection: [],
    }
    const RETRmeasure = `${PowersString?.[RETR?.power || 'MLN']} ${
      CurrenciesString?.[RETR?.currency || 'RUB']
    }`
    const RETRcollection = ST?.map(n => {
      const collection =
        (RETR?.value?.[n] || 0) / Powers[RETR?.power || 'MLN'] / Currencies[RETR?.currency || 'RUB']

      return collection
    })

    // Затраты на ремонт и тех. обслуживания (RMCR)
    const RMCR: ICalculateParams = {
      value: ST?.map(n => {
        if (getYear(SY[n]) < getYear(PIDDC)) {
          return 0
        }

        if (getYear(SY[n]) >= getYear(PIDDC)) {
          if (n === 0) {
            return (RMCD || 0) * (CAPEX?.calculation || 0)
          }

          if (n > 0) {
            return (RMCD || 0) * (CAPEX?.calculation || 0) * (1 + formatPercent(DEF || 0) * (n - 1))
          }
        }

        return 0
      }),

      power: 'MLN',
      currency: 'RUB',
      measure: '',

      collection: [],
    }
    const RMCRmeasure = `${PowersString?.[RMCR?.power || 'MLN']} ${
      CurrenciesString?.[RMCR?.currency || 'RUB']
    }`
    const RMCRcollection = ST?.map(n => {
      const collection =
        (RMCR?.value?.[n] || 0) / Powers[RMCR?.power || 'MLN'] / Currencies[RMCR?.currency || 'RUB']

      return collection
    })

    // Процессинг производства (расходы) (RACH)
    const RACH: ICalculateParams = {
      value: ST?.map(n => {
        let value = 0

        effectCount?.forEach(indexNPE => {
          const NPE = PE?.[`NPE${indexNPE}`]

          value =
            ((NPE?.NPET?.calculation?.[n] || 0) * (NPE?.EPP?.calculation?.[n] || 0) + value) *
            SHRR[n]
        })

        return value
      }),

      power: 'MLN',
      currency: 'RUB',
      measure: '',

      collection: [],
    }
    const RACHmeasure = `${PowersString?.[RACH?.power || 'MLN']} ${
      CurrenciesString?.[RACH?.currency || 'RUB']
    }`
    const RACHcollection = ST?.map(n => {
      const collection =
        (RACH?.value?.[n] || 0) / Powers[RACH?.power || 'MLN'] / Currencies[RACH?.currency || 'RUB']

      return collection
    })

    // Прибыль до уплаты %, налогов и амортизации (EBITDA)
    const EBITDA: ICalculateParams = {
      value: ST?.map(n => {
        return (
          (RV?.value?.[n] || 0) -
          (RMCR?.value?.[n] || 0) -
          (RETR?.value?.[n] || 0) -
          (RACH?.value?.[n] || 0)
        )
      }),

      power: 'MLN',
      currency: 'RUB',
      measure: '',

      collection: [],
    }
    const EBITDAmeasure = `${PowersString?.[EBITDA?.power || 'MLN']} ${
      CurrenciesString?.[EBITDA?.currency || 'RUB']
    }`
    const EBITDAcollection = ST?.map(n => {
      const collection =
        (EBITDA?.value?.[n] || 0) /
        Powers[EBITDA?.power || 'MLN'] /
        Currencies[EBITDA?.currency || 'RUB']

      return collection
    })

    // Прибыль до уплаты % и налогов (EBIT)
    const EBIT: ICalculateParams = {
      value: ST?.map(n => {
        return (EBITDA?.value?.[n] || 0) - (DPR?.value?.[n] || 0)
      }),

      power: 'MLN',
      currency: 'RUB',
      measure: '',

      collection: [],
    }
    const EBITmeasure = `${PowersString?.[EBIT?.power || 'MLN']} ${
      CurrenciesString?.[EBIT?.currency || 'RUB']
    }`
    const EBITcollection = ST?.map(n => {
      const collection =
        (EBIT?.value?.[n] || 0) / Powers[EBIT?.power || 'MLN'] / Currencies[EBIT?.currency || 'RUB']

      return collection
    })

    // Налог на прибыль (ITXR)
    const ITXR: ICalculateParams = {
      value: ST?.map(n => {
        return (EBIT?.value?.[n] || 0) * formatPercent(ITXD || 0)
      }),

      power: 'MLN',
      currency: 'RUB',
      measure: '',

      collection: [],
    }
    const ITXRmeasure = `${PowersString?.[ITXR?.power || 'MLN']} ${
      CurrenciesString?.[ITXR?.currency || 'RUB']
    }`
    const ITXRcollection = ST?.map(n => {
      const collection =
        (ITXR?.value?.[n] || 0) / Powers[ITXR?.power || 'MLN'] / Currencies[ITXR?.currency || 'RUB']

      return collection
    })

    // Чистая прибыль (ENP)
    const ENP: ICalculateParams = {
      value: ST?.map(n => {
        return (EBIT?.value?.[n] || 0) - (ITXR?.value?.[n] || 0)
      }),

      power: 'MLN',
      currency: 'RUB',
      measure: '',

      collection: [],
    }
    const ENPmeasure = `${PowersString?.[ENP?.power || 'MLN']} ${
      CurrenciesString?.[ENP?.currency || 'RUB']
    }`
    const ENPcollection = ST?.map(n => {
      const collection =
        (ENP?.value?.[n] || 0) / Powers[ENP?.power || 'MLN'] / Currencies[ENP?.currency || 'RUB']

      return collection
    })

    // Чистый денежный поток (FCFF)
    const FCFF: ICalculateParams = {
      value: ST?.map(n => {
        return (DPR?.value?.[n] || 0) + (ENP?.value?.[n] || 0) - (FP?.[n] || 0) - WCR
      }),

      power: 'MLN',
      currency: 'RUB',
      measure: '',

      collection: [],
    }
    const FCFFmeasure = `${PowersString?.[FCFF?.power || 'MLN']} ${
      CurrenciesString?.[FCFF?.currency || 'RUB']
    }`
    const FCFFcollection = ST?.map(n => {
      const collection =
        (FCFF?.value?.[n] || 0) / Powers[FCFF?.power || 'MLN'] / Currencies[FCFF?.currency || 'RUB']

      return collection
    })

    // Период дисконтирования (DPRD)
    const DPRD = ST?.map(n => {
      return diffDate(DCFR[n], PID, 'day') / (leapYear(SY[n]) ? KDVGV : KDVG)
    })

    // Фактор дисконтирования (DCFCR)
    const DCFCR = ST?.map(n => {
      return 1 / Math.pow(1 + formatPercent(WACC || 0), DPRD[n])
    })

    // Приведенный денежный поток (PVFCFF)
    const PVFCFF: ICalculateParams = {
      value: ST?.map(n => {
        return (FCFF?.value?.[n] || 0) * DCFCR?.[n]
      }),

      power: 'MLN',
      currency: 'RUB',
      measure: '',

      collection: [],
    }
    const PVFCFFmeasure = `${PowersString?.[PVFCFF?.power || 'MLN']} ${
      CurrenciesString?.[PVFCFF?.currency || 'RUB']
    }`
    const PVFCFFcollection = ST?.map(n => {
      const collection =
        (PVFCFF?.value?.[n] || 0) /
        Powers[PVFCFF?.power || 'MLN'] /
        Currencies[PVFCFF?.currency || 'RUB']

      return collection
    })

    // Накопленный денежный поток (ACF)
    const ACF: ICalculateParams = {
      value: [],

      power: 'MLN',
      currency: 'RUB',
      measure: '',

      collection: [],
    }
    ST?.forEach(n => {
      if (n === 0) {
        ACF?.value?.push(FCFF?.value?.[n] || 0)
      }

      if (n > 0) {
        ACF?.value?.push((FCFF?.value?.[n] || 0) + ACF?.value?.[n - 1])
      }
    })
    const ACFmeasure = `${PowersString?.[ACF?.power || 'MLN']} ${
      CurrenciesString?.[ACF?.currency || 'RUB']
    }`
    const ACFcollection = ST?.map(n => {
      const collection =
        (ACF?.value?.[n] || 0) / Powers[ACF?.power || 'MLN'] / Currencies[ACF?.currency || 'RUB']

      return collection
    })

    // Накопленный дисконтированный денежный поток (ADCF)
    const ADCF: ICalculateParams = {
      value: [],

      power: 'MLN',
      currency: 'RUB',
      measure: '',

      collection: [],
    }
    ST?.forEach(n => {
      if (n === 0) {
        ADCF?.value?.push(PVFCFF?.value?.[n] || 0)
      }

      if (n > 0) {
        ADCF?.value?.push((PVFCFF?.value?.[n] || 0) + ADCF?.value?.[n - 1])
      }
    })
    const ADCFmeasure = `${PowersString?.[ADCF?.power || 'MLN']} ${
      CurrenciesString?.[ADCF?.currency || 'RUB']
    }`
    const ADCFcollection = ST?.map(n => {
      const collection =
        (ADCF?.value?.[n] || 0) / Powers[ADCF?.power || 'MLN'] / Currencies[ADCF?.currency || 'RUB']

      return collection
    })

    // Терминальная стоимость (TV)
    const TV = () => {
      if (TV_enabled) {
        const n = ST?.length - 1

        return (
          (((FCFF?.value?.[n] || 0) * (1 + formatPercent(GRT || 0)) - (DPR?.value?.[n] || 0)) /
            (formatPercent(WACC || 0) - formatPercent(GRT || 0))) *
          DCFCR?.[n]
        )
      }

      return 0
    }

    // Чистый денежный поток с TV (NCFTV)
    const NCFTV: ICalculateParams = {
      value: ST?.map(n => {
        if (n === ST?.length - 1) {
          return (FCFF?.value?.[n] || 0) + TV() / (PVFCFF?.value?.[n] || 0)
        }

        return FCFF?.value?.[n] || 0
      }),

      power: 'MLN',
      currency: 'RUB',
      measure: '',

      collection: [],
    }
    const NCFTVmeasure = `${PowersString?.[NCFTV?.power || 'MLN']} ${
      CurrenciesString?.[NCFTV?.currency || 'RUB']
    }`
    const NCFTVcollection = ST?.map(n => {
      const collection =
        (NCFTV?.value?.[n] || 0) /
        Powers[NCFTV?.power || 'MLN'] /
        Currencies[NCFTV?.currency || 'RUB']

      return collection
    })

    createDCFR(DCFR)
    createRV({
      ...RV,
      measure: RVmeasure,
      collection: RVcollection,
    })
    createDPR({
      ...DPR,
      measure: DPRmeasure,
      collection: DPRcollection,
    })
    createRVATB({
      ...RVATB,
      measure: RVATBmeasure,
      collection: RVATBcollection,
    })
    createRVATP({
      ...RVATP,
      measure: RVATPmeasure,
      collection: RVATPcollection,
    })
    createRETR({
      ...RETR,
      measure: RETRmeasure,
      collection: RETRcollection,
    })
    createRMCR({
      ...RMCR,
      measure: RMCRmeasure,
      collection: RMCRcollection,
    })
    createRACH({
      ...RACH,
      measure: RACHmeasure,
      collection: RACHcollection,
    })
    createEBITDA({
      ...EBITDA,
      measure: EBITDAmeasure,
      collection: EBITDAcollection,
    })
    createEBIT({
      ...EBIT,
      measure: EBITmeasure,
      collection: EBITcollection,
    })
    createITXR({
      ...ITXR,
      measure: ITXRmeasure,
      collection: ITXRcollection,
    })
    createENP({
      ...ENP,
      measure: ENPmeasure,
      collection: ENPcollection,
    })
    createFCFF({
      ...FCFF,
      measure: FCFFmeasure,
      collection: FCFFcollection,
    })
    createDPRD(DPRD)
    createDCFCR(DCFCR)
    createPVFCFF({
      ...PVFCFF,
      measure: PVFCFFmeasure,
      collection: PVFCFFcollection,
    })
    createACF({
      ...ACF,
      measure: ACFmeasure,
      collection: ACFcollection,
    })
    createADCF({
      ...ADCF,
      measure: ADCFmeasure,
      collection: ADCFcollection,
    })
    createTV(TV())
    createNCFTV({
      ...NCFTV,
      measure: NCFTVmeasure,
      collection: NCFTVcollection,
    })
  }, [])

  return { calculate, deleteCalculate }
}
