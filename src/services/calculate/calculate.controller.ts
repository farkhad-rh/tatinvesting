import { useEffect } from 'react'

import { KDVG, KDVGV, SAM, SAR } from '@constants'

import { Currencies, CurrenciesString, Powers, PowersString } from '@enums'

import { addDate, diffDate, formatPercent, getYear, leapYear } from '@utils'

import {
  ICalculateArray,
  ICalculateSingle,
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
      createRACH,
      createDPR,
      createRVATB,
      createRVATP,
      createRETR,
      createRMCR,
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

      createSDFCFF,
      createNPV,
      createIRR,
      createPP,
      createDPP,

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
    const RV: ICalculateArray = {
      value: ST?.map(n => {
        let value = 0

        effectCount?.forEach(indexNPE => {
          const NPE = PE?.[`NPE${indexNPE}`]
          const { NPET, PC } = NPE || {}

          value = ((NPET?.calculation?.[n] || 0) * (PC?.calculation?.[n] || 0) + value) * SHRR[n]
        })

        return value
      }),

      power: 'MLN',
      currency: 'RUB',
      measure: '',

      collection: [],

      stack: [],

      matrixNPET: SAM.map((SAR, indexSAM) => {
        return SAR.map((_, indexSAR) => {
          return ST?.map(n => {
            let value = 0

            effectCount?.forEach(indexNPE => {
              const NPE = PE?.[`NPE${indexNPE}`]
              const { NPET, PC } = NPE || {}

              value =
                ((NPET?.matrix?.[indexSAM]?.[indexSAR]?.[n] || 0) * (PC?.calculation?.[n] || 0) +
                  value) *
                SHRR[n]
            })

            return value
          })
        })
      }),
      matrixPC: SAM.map((SAR, indexSAM) => {
        return SAR.map((_, indexSAR) => {
          return ST?.map(n => {
            let value = 0

            effectCount?.forEach(indexNPE => {
              const NPE = PE?.[`NPE${indexNPE}`]
              const { NPET, PC } = NPE || {}

              value =
                ((NPET?.calculation?.[n] || 0) * (PC?.matrix?.[indexSAM]?.[indexSAR]?.[n] || 0) +
                  value) *
                SHRR[n]
            })

            return value
          })
        })
      }),
    }
    const RVmeasure = `${PowersString?.[RV?.power || 'MLN']} ${
      CurrenciesString?.[RV?.currency || 'RUB']
    }`
    const RVcollection = ST?.map(n => {
      const collection =
        (RV?.value?.[n] || 0) / Powers[RV?.power || 'MLN'] / Currencies[RV?.currency || 'RUB']

      return collection
    })
    const RVstack = effectCount?.map(indexNPE => {
      const NPE = PE?.[`NPE${indexNPE}`]
      const { NP, NPET, PC } = NPE || {}

      return {
        name: NP,
        value: ST?.map(n => {
          return (NPET?.calculation?.[n] || 0) * (PC?.calculation?.[n] || 0) * SHRR[n]
        }),
        collection: ST?.map(n => {
          return (
            ((NPET?.calculation?.[n] || 0) * (PC?.calculation?.[n] || 0) * SHRR[n]) /
            Powers[RV?.power || 'MLN'] /
            Currencies[RV?.currency || 'RUB']
          )
        }),
      }
    })

    // Процессинг производства (расходы) (RACH)
    const RACH: ICalculateArray = {
      value: ST?.map(n => {
        let value = 0

        effectCount?.forEach(indexNPE => {
          const NPE = PE?.[`NPE${indexNPE}`]
          const { NPET, EPP } = NPE || {}

          value = ((NPET?.calculation?.[n] || 0) * (EPP?.calculation?.[n] || 0) + value) * SHRR[n]
        })

        return value
      }),

      power: 'MLN',
      currency: 'RUB',
      measure: '',

      collection: [],

      matrixNPET: SAM.map((SAR, indexSAM) => {
        return SAR.map((_, indexSAR) => {
          return ST?.map(n => {
            let value = 0

            effectCount?.forEach(indexNPE => {
              const NPE = PE?.[`NPE${indexNPE}`]
              const { NPET, EPP } = NPE || {}

              value =
                ((NPET?.matrix?.[indexSAM]?.[indexSAR]?.[n] || 0) * (EPP?.calculation?.[n] || 0) +
                  value) *
                SHRR[n]
            })

            return value
          })
        })
      }),
      matrixPC: SAM.map(SAR => {
        return SAR.map(() => {
          return ST?.map(n => {
            let value = 0

            effectCount?.forEach(indexNPE => {
              const NPE = PE?.[`NPE${indexNPE}`]
              const { NPET, EPP } = NPE || {}

              value =
                ((NPET?.calculation?.[n] || 0) * (EPP?.calculation?.[n] || 0) + value) * SHRR[n]
            })

            return value
          })
        })
      }),
    }
    const RACHmeasure = `${PowersString?.[RACH?.power || 'MLN']} ${
      CurrenciesString?.[RACH?.currency || 'RUB']
    }`
    const RACHcollection = ST?.map(n => {
      const collection =
        (RACH?.value?.[n] || 0) / Powers[RACH?.power || 'MLN'] / Currencies[RACH?.currency || 'RUB']

      return collection
    })

    // Aмортизация (DPR)
    const DPR: ICalculateArray = {
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

      matrixNPET: SAM.map((SAR, indexSAM) => {
        return SAR.map((_, indexSAR) => {
          return ST?.map(n => {
            if (getYear(SY[n]) < getYear(PIDDC)) {
              return 0
            }

            if (getYear(SY[n]) >= getYear(PIDDC) && n - PHD < Number(PH)) {
              return (CAPEX?.matrix?.[indexSAM]?.[indexSAR] || 0) / AMOR
            }

            return 0
          })
        })
      }),
      matrixPC: SAM.map((SAR, indexSAM) => {
        return SAR.map((_, indexSAR) => {
          return ST?.map(n => {
            if (getYear(SY[n]) < getYear(PIDDC)) {
              return 0
            }

            if (getYear(SY[n]) >= getYear(PIDDC) && n - PHD < Number(PH)) {
              return (CAPEX?.matrix?.[indexSAM]?.[indexSAR] || 0) / AMOR
            }

            return 0
          })
        })
      }),
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
    const RVATB: ICalculateArray = {
      value: [],

      power: 'MLN',
      currency: 'RUB',
      measure: '',

      collection: [],

      matrixNPET: SAM?.map(SAR => SAR.map(() => [])),
      matrixPC: SAM?.map(SAR => SAR.map(() => [])),
    }

    // Остаточная стоимость на конец периода (RVATP)
    const RVATP: ICalculateArray = {
      value: [],

      power: 'MLN',
      currency: 'RUB',
      measure: '',

      collection: [],

      matrixNPET: SAM?.map(SAR => SAR.map(() => [])),
      matrixPC: SAM?.map(SAR => SAR.map(() => [])),
    }

    // (RVATB) и (RVATP)
    ST?.forEach(n => {
      if (getYear(SY[n]) < getYear(PIDDC)) {
        RVATB?.value?.push(0)
      }

      if (getYear(SY[n]) < getYear(PIDDC) - 1) {
        RVATP?.value?.push(0)
      }

      if (getYear(SY[n]) === getYear(PIDDC) - 1) {
        RVATP?.value?.push(CAPEX?.calculation || 0)
      }

      if (getYear(SY[n]) >= getYear(PIDDC)) {
        RVATB?.value?.push(RVATP?.value?.[n - 1] || 0)
        RVATP?.value?.push(
          (RVATB?.value?.[n] || 0) - (DPR?.value?.[n] || 0) > 0
            ? (RVATB?.value?.[n] || 0) - (DPR?.value?.[n] || 0)
            : 0
        )
      }
    })
    SAM.forEach((SAR, indexSAM) => {
      SAR.forEach((_, indexSAR) => {
        ST?.forEach(n => {
          if (getYear(SY[n]) < getYear(PIDDC)) {
            RVATB?.matrixNPET?.[indexSAM]?.[indexSAR]?.push(0)
          }

          if (getYear(SY[n]) < getYear(PIDDC) - 1) {
            RVATP?.matrixNPET?.[indexSAM]?.[indexSAR]?.push(0)
          }

          if (getYear(SY[n]) === getYear(PIDDC) - 1) {
            RVATP?.matrixNPET?.[indexSAM]?.[indexSAR]?.push(
              CAPEX?.matrix?.[indexSAM]?.[indexSAR] || 0
            )
          }

          if (getYear(SY[n]) >= getYear(PIDDC)) {
            RVATB?.matrixNPET?.[indexSAM]?.[indexSAR]?.push(
              RVATP?.matrixNPET?.[indexSAM]?.[indexSAR]?.[n - 1] || 0
            )
            RVATP?.matrixNPET?.[indexSAM]?.[indexSAR]?.push(
              (RVATB?.matrixNPET?.[indexSAM]?.[indexSAR]?.[n] || 0) -
                (DPR?.matrixNPET?.[indexSAM]?.[indexSAR]?.[n] || 0) >
                0
                ? (RVATB?.matrixNPET?.[indexSAM]?.[indexSAR]?.[n] || 0) -
                    (DPR?.matrixNPET?.[indexSAM]?.[indexSAR]?.[n] || 0)
                : 0
            )
          }
        })
      })
    })
    SAM.forEach((SAR, indexSAM) => {
      SAR.forEach((_, indexSAR) => {
        ST?.forEach(n => {
          if (getYear(SY[n]) < getYear(PIDDC)) {
            RVATB?.matrixPC?.[indexSAM]?.[indexSAR]?.push(0)
          }

          if (getYear(SY[n]) < getYear(PIDDC) - 1) {
            RVATP?.matrixPC?.[indexSAM]?.[indexSAR]?.push(0)
          }

          if (getYear(SY[n]) === getYear(PIDDC) - 1) {
            RVATP?.matrixPC?.[indexSAM]?.[indexSAR]?.push(
              CAPEX?.matrix?.[indexSAM]?.[indexSAR] || 0
            )
          }

          if (getYear(SY[n]) >= getYear(PIDDC)) {
            RVATB?.matrixPC?.[indexSAM]?.[indexSAR]?.push(
              RVATP?.matrixPC?.[indexSAM]?.[indexSAR]?.[n - 1] || 0
            )
            RVATP?.matrixPC?.[indexSAM]?.[indexSAR]?.push(
              (RVATB?.matrixPC?.[indexSAM]?.[indexSAR]?.[n] || 0) -
                (DPR?.matrixPC?.[indexSAM]?.[indexSAR]?.[n] || 0) >
                0
                ? (RVATB?.matrixPC?.[indexSAM]?.[indexSAR]?.[n] || 0) -
                    (DPR?.matrixPC?.[indexSAM]?.[indexSAR]?.[n] || 0)
                : 0
            )
          }
        })
      })
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
    const RETR: ICalculateArray = {
      value: ST?.map(n => {
        return (
          (((RVATB?.value?.[n] || 0) + (RVATP?.value?.[n] || 0)) / 2) *
          formatPercent(RETD || 0) *
          SHRR[n]
        )
      }),

      power: 'MLN',
      currency: 'RUB',
      measure: '',

      collection: [],

      matrixNPET: SAM.map((SAR, indexSAM) => {
        return SAR.map((_, indexSAR) => {
          return ST?.map(n => {
            return (
              (((RVATB?.matrixNPET?.[indexSAM]?.[indexSAR]?.[n] || 0) +
                (RVATP?.matrixNPET?.[indexSAM]?.[indexSAR]?.[n] || 0)) /
                2) *
              formatPercent(RETD || 0) *
              SHRR[n]
            )
          })
        })
      }),
      matrixPC: SAM.map((SAR, indexSAM) => {
        return SAR.map((_, indexSAR) => {
          return ST?.map(n => {
            return (
              (((RVATB?.matrixPC?.[indexSAM]?.[indexSAR]?.[n] || 0) +
                (RVATP?.matrixPC?.[indexSAM]?.[indexSAR]?.[n] || 0)) /
                2) *
              formatPercent(RETD || 0) *
              SHRR[n]
            )
          })
        })
      }),
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
    const RMCR: ICalculateArray = {
      value: ST?.map(n => {
        if (getYear(SY[n]) < getYear(PIDDC)) {
          return 0
        }

        if (getYear(SY[n]) >= getYear(PIDDC)) {
          if (n === 0) {
            return formatPercent(RMCD || 0) * (CAPEX?.calculation || 0)
          }

          if (n > 0) {
            return (
              formatPercent(RMCD || 0) *
              (CAPEX?.calculation || 0) *
              (1 + formatPercent(DEF || 0) * n)
            )
          }
        }

        return 0
      }),

      power: 'MLN',
      currency: 'RUB',
      measure: '',

      collection: [],

      matrixNPET: SAM.map((SAR, indexSAM) => {
        return SAR.map((_, indexSAR) => {
          return ST?.map(n => {
            if (getYear(SY[n]) < getYear(PIDDC)) {
              return 0
            }

            if (getYear(SY[n]) >= getYear(PIDDC)) {
              if (n === 0) {
                return formatPercent(RMCD || 0) * (CAPEX?.matrix?.[indexSAM]?.[indexSAR] || 0)
              }

              if (n > 0) {
                return (
                  formatPercent(RMCD || 0) *
                  (CAPEX?.matrix?.[indexSAM]?.[indexSAR] || 0) *
                  (1 + formatPercent(DEF || 0) * n)
                )
              }
            }

            return 0
          })
        })
      }),
      matrixPC: SAM.map((SAR, indexSAM) => {
        return SAR.map((_, indexSAR) => {
          return ST?.map(n => {
            if (getYear(SY[n]) < getYear(PIDDC)) {
              return 0
            }

            if (getYear(SY[n]) >= getYear(PIDDC)) {
              if (n === 0) {
                return formatPercent(RMCD || 0) * (CAPEX?.matrix?.[indexSAM]?.[indexSAR] || 0)
              }

              if (n > 0) {
                return (
                  formatPercent(RMCD || 0) *
                  (CAPEX?.matrix?.[indexSAM]?.[indexSAR] || 0) *
                  (1 + formatPercent(DEF || 0) * n)
                )
              }
            }

            return 0
          })
        })
      }),
    }
    const RMCRmeasure = `${PowersString?.[RMCR?.power || 'MLN']} ${
      CurrenciesString?.[RMCR?.currency || 'RUB']
    }`
    const RMCRcollection = ST?.map(n => {
      const collection =
        (RMCR?.value?.[n] || 0) / Powers[RMCR?.power || 'MLN'] / Currencies[RMCR?.currency || 'RUB']

      return collection
    })

    // Прибыль до уплаты %, налогов и амортизации (EBITDA)
    const EBITDA: ICalculateArray = {
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

      matrixNPET: SAM.map((SAR, indexSAM) => {
        return SAR.map((_, indexSAR) => {
          return ST?.map(n => {
            return (
              (RV?.matrixNPET?.[indexSAM]?.[indexSAR]?.[n] || 0) -
              (RMCR?.matrixNPET?.[indexSAM]?.[indexSAR]?.[n] || 0) -
              (RETR?.matrixNPET?.[indexSAM]?.[indexSAR]?.[n] || 0) -
              (RACH?.matrixNPET?.[indexSAM]?.[indexSAR]?.[n] || 0)
            )
          })
        })
      }),
      matrixPC: SAM.map((SAR, indexSAM) => {
        return SAR.map((_, indexSAR) => {
          return ST?.map(n => {
            return (
              (RV?.matrixPC?.[indexSAM]?.[indexSAR]?.[n] || 0) -
              (RMCR?.matrixPC?.[indexSAM]?.[indexSAR]?.[n] || 0) -
              (RETR?.matrixPC?.[indexSAM]?.[indexSAR]?.[n] || 0) -
              (RACH?.matrixPC?.[indexSAM]?.[indexSAR]?.[n] || 0)
            )
          })
        })
      }),
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
    const EBIT: ICalculateArray = {
      value: ST?.map(n => {
        return (EBITDA?.value?.[n] || 0) - (DPR?.value?.[n] || 0)
      }),

      power: 'MLN',
      currency: 'RUB',
      measure: '',

      collection: [],

      matrixNPET: SAM.map((SAR, indexSAM) => {
        return SAR.map((_, indexSAR) => {
          return ST?.map(n => {
            return (
              (EBITDA?.matrixNPET?.[indexSAM]?.[indexSAR]?.[n] || 0) -
              (DPR?.matrixNPET?.[indexSAM]?.[indexSAR]?.[n] || 0)
            )
          })
        })
      }),
      matrixPC: SAM.map((SAR, indexSAM) => {
        return SAR.map((_, indexSAR) => {
          return ST?.map(n => {
            return (
              (EBITDA?.matrixPC?.[indexSAM]?.[indexSAR]?.[n] || 0) -
              (DPR?.matrixPC?.[indexSAM]?.[indexSAR]?.[n] || 0)
            )
          })
        })
      }),
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
    const ITXR: ICalculateArray = {
      value: ST?.map(n => {
        return (EBIT?.value?.[n] || 0) * formatPercent(ITXD || 0)
      }),

      power: 'MLN',
      currency: 'RUB',
      measure: '',

      collection: [],

      matrixNPET: SAM.map((SAR, indexSAM) => {
        return SAR.map((_, indexSAR) => {
          return ST?.map(n => {
            return (EBIT?.matrixNPET?.[indexSAM]?.[indexSAR]?.[n] || 0) * formatPercent(ITXD || 0)
          })
        })
      }),
      matrixPC: SAM.map((SAR, indexSAM) => {
        return SAR.map((_, indexSAR) => {
          return ST?.map(n => {
            return (EBIT?.matrixPC?.[indexSAM]?.[indexSAR]?.[n] || 0) * formatPercent(ITXD || 0)
          })
        })
      }),
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
    const ENP: ICalculateArray = {
      value: ST?.map(n => {
        return (EBIT?.value?.[n] || 0) - (ITXR?.value?.[n] || 0)
      }),

      power: 'MLN',
      currency: 'RUB',
      measure: '',

      collection: [],

      matrixNPET: SAM.map((SAR, indexSAM) => {
        return SAR.map((_, indexSAR) => {
          return ST?.map(n => {
            return (
              (EBIT?.matrixNPET?.[indexSAM]?.[indexSAR]?.[n] || 0) -
              (ITXR?.matrixNPET?.[indexSAM]?.[indexSAR]?.[n] || 0)
            )
          })
        })
      }),
      matrixPC: SAM.map((SAR, indexSAM) => {
        return SAR.map((_, indexSAR) => {
          return ST?.map(n => {
            return (
              (EBIT?.matrixPC?.[indexSAM]?.[indexSAR]?.[n] || 0) -
              (ITXR?.matrixPC?.[indexSAM]?.[indexSAR]?.[n] || 0)
            )
          })
        })
      }),
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
    const FCFF: ICalculateArray = {
      value: ST?.map(n => {
        return (DPR?.value?.[n] || 0) + (ENP?.value?.[n] || 0) - (FP?.value?.[n] || 0) - WCR
      }),

      power: 'MLN',
      currency: 'RUB',
      measure: '',

      collection: [],

      matrixNPET: SAM.map((SAR, indexSAM) => {
        return SAR.map((_, indexSAR) => {
          return ST?.map(n => {
            return (
              (DPR?.matrixNPET?.[indexSAM]?.[indexSAR]?.[n] || 0) +
              (ENP?.matrixNPET?.[indexSAM]?.[indexSAR]?.[n] || 0) -
              (FP?.matrix?.[indexSAM]?.[indexSAR]?.[n] || 0) -
              WCR
            )
          })
        })
      }),
      matrixPC: SAM.map((SAR, indexSAM) => {
        return SAR.map((_, indexSAR) => {
          return ST?.map(n => {
            return (
              (DPR?.matrixPC?.[indexSAM]?.[indexSAR]?.[n] || 0) +
              (ENP?.matrixPC?.[indexSAM]?.[indexSAR]?.[n] || 0) -
              (FP?.matrix?.[indexSAM]?.[indexSAR]?.[n] || 0) -
              WCR
            )
          })
        })
      }),
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
      return diffDate(DCFR[n], PIDDC, 'day') / (leapYear(SY[n]) ? KDVGV : KDVG)
    })

    // Фактор дисконтирования (DCFCR)
    const DCFCR = ST?.map(n => {
      return 1 / Math.pow(1 + formatPercent(WACC || 0), DPRD[n])
    })

    // Приведенный денежный поток (PVFCFF)
    const PVFCFF: ICalculateArray = {
      value: ST?.map(n => {
        return (FCFF?.value?.[n] || 0) * DCFCR?.[n]
      }),

      power: 'MLN',
      currency: 'RUB',
      measure: '',

      collection: [],

      matrixNPET: SAM.map((SAR, indexSAM) => {
        return SAR.map((_, indexSAR) => {
          return ST?.map(n => {
            return (FCFF?.matrixNPET?.[indexSAM]?.[indexSAR]?.[n] || 0) * DCFCR?.[n]
          })
        })
      }),
      matrixPC: SAM.map((SAR, indexSAM) => {
        return SAR.map((_, indexSAR) => {
          return ST?.map(n => {
            return (FCFF?.matrixPC?.[indexSAM]?.[indexSAR]?.[n] || 0) * DCFCR?.[n]
          })
        })
      }),
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
    const ACF: ICalculateArray = {
      value: [],

      power: 'MLN',
      currency: 'RUB',
      measure: '',

      collection: [],

      matrixNPET: SAM?.map(SAR => SAR.map(() => [])),
      matrixPC: SAM?.map(SAR => SAR.map(() => [])),
    }
    ST?.forEach(n => {
      if (n === 0) {
        ACF?.value?.push(FCFF?.value?.[n] || 0)
      }

      if (n > 0) {
        ACF?.value?.push((FCFF?.value?.[n] || 0) + ACF?.value?.[n - 1])
      }
    })
    SAM.forEach((SAR, indexSAM) => {
      SAR.forEach((_, indexSAR) => {
        ST?.forEach(n => {
          if (n === 0) {
            ACF?.matrixNPET?.[indexSAM]?.[indexSAR]?.push(
              FCFF?.matrixNPET?.[indexSAM]?.[indexSAR]?.[n] || 0
            )
          }

          if (n > 0) {
            ACF?.matrixNPET?.[indexSAM]?.[indexSAR]?.push(
              (FCFF?.matrixNPET?.[indexSAM]?.[indexSAR]?.[n] || 0) +
                ACF?.matrixNPET?.[indexSAM]?.[indexSAR]?.[n - 1]
            )
          }
        })
      })
    })
    SAM.forEach((SAR, indexSAM) => {
      SAR.forEach((_, indexSAR) => {
        ST?.forEach(n => {
          if (n === 0) {
            ACF?.matrixPC?.[indexSAM]?.[indexSAR]?.push(
              FCFF?.matrixPC?.[indexSAM]?.[indexSAR]?.[n] || 0
            )
          }

          if (n > 0) {
            ACF?.matrixPC?.[indexSAM]?.[indexSAR]?.push(
              (FCFF?.matrixPC?.[indexSAM]?.[indexSAR]?.[n] || 0) +
                ACF?.matrixPC?.[indexSAM]?.[indexSAR]?.[n - 1]
            )
          }
        })
      })
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
    const ADCF: ICalculateArray = {
      value: [],

      power: 'MLN',
      currency: 'RUB',
      measure: '',

      collection: [],

      matrixNPET: SAM?.map(SAR => SAR.map(() => [])),
      matrixPC: SAM?.map(SAR => SAR.map(() => [])),
    }
    ST?.forEach(n => {
      if (n === 0) {
        ADCF?.value?.push(PVFCFF?.value?.[n] || 0)
      }

      if (n > 0) {
        ADCF?.value?.push((PVFCFF?.value?.[n] || 0) + ADCF?.value?.[n - 1])
      }
    })
    SAM.forEach((SAR, indexSAM) => {
      SAR.forEach((_, indexSAR) => {
        ST?.forEach(n => {
          if (n === 0) {
            ADCF?.matrixNPET?.[indexSAM]?.[indexSAR]?.push(
              PVFCFF?.matrixNPET?.[indexSAM]?.[indexSAR]?.[n] || 0
            )
          }

          if (n > 0) {
            ADCF?.matrixNPET?.[indexSAM]?.[indexSAR]?.push(
              (PVFCFF?.matrixNPET?.[indexSAM]?.[indexSAR]?.[n] || 0) +
                ADCF?.matrixNPET?.[indexSAM]?.[indexSAR]?.[n - 1]
            )
          }
        })
      })
    })
    SAM.forEach((SAR, indexSAM) => {
      SAR.forEach((_, indexSAR) => {
        ST?.forEach(n => {
          if (n === 0) {
            ADCF?.matrixPC?.[indexSAM]?.[indexSAR]?.push(
              PVFCFF?.matrixPC?.[indexSAM]?.[indexSAR]?.[n] || 0
            )
          }

          if (n > 0) {
            ADCF?.matrixPC?.[indexSAM]?.[indexSAR]?.push(
              (PVFCFF?.matrixPC?.[indexSAM]?.[indexSAR]?.[n] || 0) +
                ADCF?.matrixPC?.[indexSAM]?.[indexSAR]?.[n - 1]
            )
          }
        })
      })
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
    const TV: ICalculateSingle = {
      value: TV_enabled
        ? (((FCFF?.value?.[ST?.length - 1] || 0) * (1 + formatPercent(GRT || 0)) -
            (DPR?.value?.[ST?.length - 1] || 0)) /
            (formatPercent(WACC || 0) - formatPercent(GRT || 0))) *
          DCFCR?.[ST?.length - 1]
        : 0,

      power: 'MLN',
      currency: 'RUB',
      measure: '',

      collection: 0,

      matrixNPET: SAM.map((SAR, indexSAM) => {
        return SAR.map((_, indexSAR) => {
          return TV_enabled
            ? (((FCFF?.matrixNPET?.[indexSAM]?.[indexSAR]?.[ST?.length - 1] || 0) *
                (1 + formatPercent(GRT || 0)) -
                (DPR?.matrixNPET?.[indexSAM]?.[indexSAR]?.[ST?.length - 1] || 0)) /
                (formatPercent(WACC || 0) - formatPercent(GRT || 0))) *
                DCFCR?.[ST?.length - 1]
            : 0
        })
      }),
      matrixPC: SAM.map((SAR, indexSAM) => {
        return SAR.map((_, indexSAR) => {
          return TV_enabled
            ? (((FCFF?.matrixPC?.[indexSAM]?.[indexSAR]?.[ST?.length - 1] || 0) *
                (1 + formatPercent(GRT || 0)) -
                (DPR?.matrixPC?.[indexSAM]?.[indexSAR]?.[ST?.length - 1] || 0)) /
                (formatPercent(WACC || 0) - formatPercent(GRT || 0))) *
                DCFCR?.[ST?.length - 1]
            : 0
        })
      }),
    }
    const TVmeasure = `${PowersString?.[TV?.power || 'MLN']} ${
      CurrenciesString?.[TV?.currency || 'RUB']
    }`
    const TVcollection =
      (TV?.value || 0) / Powers[TV?.power || 'MLN'] / Currencies[TV?.currency || 'RUB']

    // Чистый денежный поток с TV (NCFTV)
    const NCFTV: ICalculateArray = {
      value: ST?.map(n => {
        if (n === ST?.length - 1) {
          return (FCFF?.value?.[n] || 0) + (TV?.value || 0) / (PVFCFF?.value?.[n] || 0)
        }

        return FCFF?.value?.[n] || 0
      }),

      power: 'MLN',
      currency: 'RUB',
      measure: '',

      collection: [],

      matrixNPET: SAM.map((SAR, indexSAM) => {
        return SAR.map((_, indexSAR) => {
          return ST?.map(n => {
            if (n === ST?.length - 1) {
              return (
                (FCFF?.matrixNPET?.[indexSAM]?.[indexSAR]?.[n] || 0) +
                (TV?.matrixNPET?.[indexSAM]?.[indexSAR] || 0) /
                  (PVFCFF?.matrixNPET?.[indexSAM]?.[indexSAR]?.[n] || 0)
              )
            }

            return FCFF?.matrixNPET?.[indexSAM]?.[indexSAR]?.[n] || 0
          })
        })
      }),
      matrixPC: SAM.map((SAR, indexSAM) => {
        return SAR.map((_, indexSAR) => {
          return ST?.map(n => {
            if (n === ST?.length - 1) {
              return (
                (FCFF?.matrixPC?.[indexSAM]?.[indexSAR]?.[n] || 0) +
                (TV?.matrixPC?.[indexSAM]?.[indexSAR] || 0) /
                  (PVFCFF?.matrixPC?.[indexSAM]?.[indexSAR]?.[n] || 0)
              )
            }

            return FCFF?.matrixPC?.[indexSAM]?.[indexSAR]?.[n] || 0
          })
        })
      }),
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

    // Cуммарный приведенный денежный поток (SDFCFF)
    const SDFCFF: ICalculateSingle = {
      value: PVFCFF?.value?.reduce((a, b) => a + b, 0),

      power: 'MLN',
      currency: 'RUB',
      measure: '',

      collection: 0,
    }
    const SDFCFFmeasure = `${PowersString?.[SDFCFF?.power || 'MLN']} ${
      CurrenciesString?.[SDFCFF?.currency || 'RUB']
    }`
    const SDFCFFcollection =
      (SDFCFF?.value || 0) / Powers[SDFCFF?.power || 'MLN'] / Currencies[SDFCFF?.currency || 'RUB']

    // Чистая приведённая стоимость (NPV)
    const NPV: ICalculateSingle = {
      value: (SDFCFF?.value || 0) + (TV?.value || 0),

      power: 'MLN',
      currency: 'RUB',
      measure: '',

      collection: 0,
    }
    const NPVmeasure = `${PowersString?.[NPV?.power || 'MLN']} ${
      CurrenciesString?.[NPV?.currency || 'RUB']
    }`
    const NPVcollection =
      (NPV?.value || 0) / Powers[NPV?.power || 'MLN'] / Currencies[NPV?.currency || 'RUB']

    // Внутренняя норма рентабельности (IRR)
    const IRR = (values = NCFTV?.value, guess = 0.01) => {
      // Calculates the resulting amount
      const irrResult = (values: number[], dates: number[], rate: number) => {
        const r = rate + 1
        let result = values?.[0]

        for (let i = 1; i < values?.length; i++) {
          result += values?.[i] / Math.pow(r, (dates?.[i] - dates?.[0]) / 365)
        }

        return result
      }

      // Calculates the first derivation
      const irrResultDeriv = (values: number[], dates: number[], rate: number) => {
        const r = rate + 1
        let result = 0

        for (let i = 1; i < values?.length; i++) {
          const frac = (dates?.[i] - dates?.[0]) / 365
          result -= (frac * values?.[i]) / Math.pow(r, frac + 1)
        }

        return result
      }

      // Initialize dates and check that values contains at least one positive value and one negative value
      const dates: number[] = []
      let positive = false
      let negative = false

      for (let i = 0; i < (values?.length || 0); i++) {
        dates[i] = i === 0 ? 0 : dates?.[i - 1] + 365
        if ((values?.[i] || 0) > 0) positive = true
        if ((values?.[i] || 0) < 0) negative = true
      }

      // Return error if values does not contain at least one positive value and one negative value
      if (!positive || !negative) return 0

      // Initialize guess and resultRate
      let resultRate = guess

      // Set maximum epsilon for end of iteration
      const epsMax = 1e-10

      // Set maximum number of iterations
      const iterMax = 50

      // Implement Newton's method
      let newRate, epsRate, resultValue
      let iteration = 0
      let contLoop = true

      do {
        resultValue = irrResult(values || [], dates, resultRate)
        newRate = resultRate - resultValue / irrResultDeriv(values || [], dates, resultRate)
        epsRate = Math.abs(newRate - resultRate)
        resultRate = newRate
        contLoop = epsRate > epsMax && Math.abs(resultValue) > epsMax
      } while (contLoop && ++iteration < iterMax)

      if (contLoop) return 0

      // Return internal rate of return
      return resultRate * 100
    }
    const IRRmatrixNPET = SAM.map((SAR, indexSAM) => {
      return SAR?.map((_, indexSAR) => {
        return IRR(NCFTV?.matrixNPET?.[indexSAM]?.[indexSAR])
      })
    })
    const IRRmatrixPC = SAM.map((SAR, indexSAM) => {
      return SAR?.map((_, indexSAR) => {
        return IRR(NCFTV?.matrixPC?.[indexSAM]?.[indexSAR])
      })
    })

    // Простой срок окупаемости с даты начала реализации (PP)
    const PP = () => {
      let value = 0

      ST?.forEach(n => {
        if ((value === 0 && (ACF?.value?.[n] || 0)) > 0) {
          value = n + Math.abs((ACF?.value?.[n - 1] || 0) / (FCFF?.value?.[n] || 0))
        }
      })

      return value
    }

    // Дисконтированный срок окупаемости с даты начала реализации (DPP)
    const DPP = () => {
      let value = 0

      ST?.forEach(n => {
        if ((value === 0 && (ADCF?.value?.[n] || 0)) > 0) {
          value = n + Math.abs((ADCF?.value?.[n - 1] || 0) / (FCFF?.value?.[n] || 0))
        }
      })

      return value
    }

    createDCFR(DCFR)
    createRV({
      ...RV,
      measure: RVmeasure,
      collection: RVcollection,
      stack: RVstack,
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
    createTV({
      ...TV,
      measure: TVmeasure,
      collection: TVcollection,
    })
    createNCFTV({
      ...NCFTV,
      measure: NCFTVmeasure,
      collection: NCFTVcollection,
    })

    createSDFCFF({
      ...SDFCFF,
      measure: SDFCFFmeasure,
      collection: SDFCFFcollection,
    })
    createNPV({
      ...NPV,
      measure: NPVmeasure,
      collection: NPVcollection,
    })
    createIRR({
      value: IRR(),
      matrixNPET: IRRmatrixNPET,
      matrixPC: IRRmatrixPC,
    })
    createPP(PP())
    createDPP(DPP())
  }, [])

  return { calculate, deleteCalculate }
}
