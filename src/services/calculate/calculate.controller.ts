import { useEffect } from 'react'

import { KDVG, KDVGV } from '@constants'

import { Currencies, Powers } from '@enums'

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

    createDCFR(DCFR)

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
    }

    createRV({
      ...RV,
      collection: ST?.map(n => {
        const collection =
          (RV?.value?.[n] || 0) / Powers[RV?.power || 'MLN'] / Currencies[RV?.currency || 'RUB']

        return collection
      }),
    })

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
    }

    createDPR({
      ...DPR,
      collection: ST?.map(n => {
        const collection =
          (DPR?.value?.[n] || 0) / Powers[DPR?.power || 'MLN'] / Currencies[DPR?.currency || 'RUB']

        return collection
      }),
    })

    const RVATB: ICalculateParams = {
      value: [],

      power: 'MLN',
      currency: 'RUB',
    }

    const RVATP: ICalculateParams = {
      value: [],

      power: 'MLN',
      currency: 'RUB',
    }

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
        RVATP?.value?.push((RVATB?.value?.[n] || 0) - (DPR?.value?.[n] || 0))
      }
    })

    createRVATB({
      ...RVATB,
      collection: ST?.map(n => {
        const collection =
          (RVATB?.value?.[n] || 0) /
          Powers[RVATB?.power || 'MLN'] /
          Currencies[RVATB?.currency || 'RUB']

        return collection
      }),
    })

    createRVATP({
      ...RVATP,
      collection: ST?.map(n => {
        const collection =
          (RVATP?.value?.[n] || 0) /
          Powers[RVATP?.power || 'MLN'] /
          Currencies[RVATP?.currency || 'RUB']

        return collection
      }),
    })

    const RETR: ICalculateParams = {
      value: ST?.map(n => {
        return (
          (((RVATB?.value?.[n] || 0) + (RVATP?.value?.[n] || 0)) / 2) * formatPercent(RETD || 0)
        )
      }),

      power: 'MLN',
      currency: 'RUB',
    }

    createRETR({
      ...RETR,
      collection: ST?.map(n => {
        const collection =
          (RETR?.value?.[n] || 0) /
          Powers[RETR?.power || 'MLN'] /
          Currencies[RETR?.currency || 'RUB']

        return collection
      }),
    })

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
    }

    createRMCR({
      ...RMCR,
      collection: ST?.map(n => {
        const collection =
          (RMCR?.value?.[n] || 0) /
          Powers[RMCR?.power || 'MLN'] /
          Currencies[RMCR?.currency || 'RUB']

        return collection
      }),
    })

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
    }

    createRACH({
      ...RACH,
      collection: ST?.map(n => {
        const collection =
          (RACH?.value?.[n] || 0) /
          Powers[RACH?.power || 'MLN'] /
          Currencies[RACH?.currency || 'RUB']

        return collection
      }),
    })

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
    }

    createEBITDA({
      ...EBITDA,
      collection: ST?.map(n => {
        const collection =
          (EBITDA?.value?.[n] || 0) /
          Powers[EBITDA?.power || 'MLN'] /
          Currencies[EBITDA?.currency || 'RUB']

        return collection
      }),
    })

    const EBIT: ICalculateParams = {
      value: ST?.map(n => {
        return (EBITDA?.value?.[n] || 0) - (DPR?.value?.[n] || 0)
      }),

      power: 'MLN',
      currency: 'RUB',
    }

    createEBIT({
      ...EBIT,
      collection: ST?.map(n => {
        const collection =
          (EBIT?.value?.[n] || 0) /
          Powers[EBIT?.power || 'MLN'] /
          Currencies[EBIT?.currency || 'RUB']

        return collection
      }),
    })

    const ITXR: ICalculateParams = {
      value: ST?.map(n => {
        return (EBIT?.value?.[n] || 0) * formatPercent(ITXD || 0)
      }),

      power: 'MLN',
      currency: 'RUB',
    }

    createITXR({
      ...ITXR,
      collection: ST?.map(n => {
        const collection =
          (ITXR?.value?.[n] || 0) /
          Powers[ITXR?.power || 'MLN'] /
          Currencies[ITXR?.currency || 'RUB']

        return collection
      }),
    })

    const ENP: ICalculateParams = {
      value: ST?.map(n => {
        return (EBIT?.value?.[n] || 0) - (ITXR?.value?.[n] || 0)
      }),

      power: 'MLN',
      currency: 'RUB',
    }

    createENP({
      ...ENP,
      collection: ST?.map(n => {
        const collection =
          (ENP?.value?.[n] || 0) / Powers[ENP?.power || 'MLN'] / Currencies[ENP?.currency || 'RUB']

        return collection
      }),
    })

    const FCFF: ICalculateParams = {
      value: ST?.map(n => {
        return (DPR?.value?.[n] || 0) + (ENP?.value?.[n] || 0) - (FP?.[n] || 0) - WCR
      }),

      power: 'MLN',
      currency: 'RUB',
    }

    createFCFF({
      ...FCFF,
      collection: ST?.map(n => {
        const collection =
          (FCFF?.value?.[n] || 0) /
          Powers[FCFF?.power || 'MLN'] /
          Currencies[FCFF?.currency || 'RUB']

        return collection
      }),
    })

    const DPRD = ST?.map(n => {
      return diffDate(DCFR[n], PID, 'day') / (leapYear(SY[n]) ? KDVGV : KDVG)
    })

    createDPRD(DPRD)

    const DCFCR = ST?.map(n => {
      return 1 / Math.pow(1 + formatPercent(WACC || 0), DPRD[n])
    })

    createDCFCR(DCFCR)

    const PVFCFF: ICalculateParams = {
      value: ST?.map(n => {
        return (FCFF?.value?.[n] || 0) * DCFCR?.[n]
      }),

      power: 'MLN',
      currency: 'RUB',
    }

    createPVFCFF({
      ...PVFCFF,
      collection: ST?.map(n => {
        const collection =
          (PVFCFF?.value?.[n] || 0) /
          Powers[PVFCFF?.power || 'MLN'] /
          Currencies[PVFCFF?.currency || 'RUB']

        return collection
      }),
    })

    const ACF: ICalculateParams = {
      value: [],

      power: 'MLN',
      currency: 'RUB',
    }

    ST?.forEach(n => {
      if (n === 0) {
        ACF?.value?.push(FCFF?.value?.[n] || 0)
      }

      if (n > 0) {
        ACF?.value?.push((FCFF?.value?.[n] || 0) + ACF?.value?.[n - 1])
      }
    })

    createACF({
      ...ACF,
      collection: ST?.map(n => {
        const collection =
          (ACF?.value?.[n] || 0) / Powers[ACF?.power || 'MLN'] / Currencies[ACF?.currency || 'RUB']

        return collection
      }),
    })

    const ADCF: ICalculateParams = {
      value: [],

      power: 'MLN',
      currency: 'RUB',
    }

    ST?.forEach(n => {
      if (n === 0) {
        ADCF?.value?.push(PVFCFF?.value?.[n] || 0)
      }

      if (n > 0) {
        ADCF?.value?.push((PVFCFF?.value?.[n] || 0) + ADCF?.value?.[n - 1])
      }
    })

    createADCF({
      ...ADCF,
      collection: ST?.map(n => {
        const collection =
          (ADCF?.value?.[n] || 0) /
          Powers[ADCF?.power || 'MLN'] /
          Currencies[ADCF?.currency || 'RUB']

        return collection
      }),
    })

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

    createTV(TV())

    const NCFTV: ICalculateParams = {
      value: ST?.map(n => {
        if (n === ST?.length - 1) {
          return (FCFF?.value?.[n] || 0) + TV() / (PVFCFF?.value?.[n] || 0)
        }

        return FCFF?.value?.[n] || 0
      }),

      power: 'MLN',
      currency: 'RUB',
    }

    createNCFTV({
      ...NCFTV,
      collection: ST?.map(n => {
        const collection =
          (NCFTV?.value?.[n] || 0) /
          Powers[NCFTV?.power || 'MLN'] /
          Currencies[NCFTV?.currency || 'RUB']

        return collection
      }),
    })
  }, [])

  return { calculate, deleteCalculate }
}
