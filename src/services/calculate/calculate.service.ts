import { useRecoilState, useRecoilValue } from 'recoil'

import { initialCalculateState, calculateState } from '@store'

import { ICalculate, ICalculateActions } from './calculate.interface'

export const useCalculateService = (): [ICalculate, ICalculateActions] => {
  const [calculate, setCalculate] = useRecoilState(calculateState)
  const calculateValue = useRecoilValue(calculateState)

  const createCalculate: ICalculateActions['createCalculate'] = payload =>
    setCalculate(prev => {
      return { ...prev, ...payload }
    })

  const createDCFR: ICalculateActions['createDCFR'] = payload =>
    setCalculate(prev => {
      return { ...prev, DCFR: payload }
    })

  const createRV: ICalculateActions['createRV'] = payload =>
    setCalculate(prev => {
      return { ...prev, RV: { ...prev?.RV, ...payload } }
    })

  const createRACH: ICalculateActions['createRACH'] = payload =>
    setCalculate(prev => {
      return { ...prev, RACH: { ...prev?.RACH, ...payload } }
    })

  const createDPR: ICalculateActions['createDPR'] = payload =>
    setCalculate(prev => {
      return { ...prev, DPR: { ...prev?.DPR, ...payload } }
    })

  const createRVATB: ICalculateActions['createRVATB'] = payload =>
    setCalculate(prev => {
      return { ...prev, RVATB: { ...prev?.RVATB, ...payload } }
    })

  const createRVATP: ICalculateActions['createRVATP'] = payload =>
    setCalculate(prev => {
      return { ...prev, RVATP: { ...prev?.RVATP, ...payload } }
    })

  const createRETR: ICalculateActions['createRETR'] = payload =>
    setCalculate(prev => {
      return { ...prev, RETR: { ...prev?.RETR, ...payload } }
    })

  const createRMCR: ICalculateActions['createRMCR'] = payload =>
    setCalculate(prev => {
      return { ...prev, RMCR: { ...prev?.RMCR, ...payload } }
    })

  const createEBITDA: ICalculateActions['createEBITDA'] = payload =>
    setCalculate(prev => {
      return { ...prev, EBITDA: { ...prev?.EBITDA, ...payload } }
    })

  const createEBIT: ICalculateActions['createEBIT'] = payload =>
    setCalculate(prev => {
      return { ...prev, EBIT: { ...prev?.EBIT, ...payload } }
    })

  const createITXR: ICalculateActions['createITXR'] = payload =>
    setCalculate(prev => {
      return { ...prev, ITXR: { ...prev?.ITXR, ...payload } }
    })

  const createENP: ICalculateActions['createENP'] = payload =>
    setCalculate(prev => {
      return { ...prev, ENP: { ...prev?.ENP, ...payload } }
    })

  const createFCFF: ICalculateActions['createFCFF'] = payload =>
    setCalculate(prev => {
      return { ...prev, FCFF: { ...prev?.FCFF, ...payload } }
    })

  const createDPRD: ICalculateActions['createDPRD'] = payload =>
    setCalculate(prev => {
      return { ...prev, DPRD: payload }
    })

  const createDCFCR: ICalculateActions['createDCFCR'] = payload =>
    setCalculate(prev => {
      return { ...prev, DCFCR: payload }
    })

  const createPVFCFF: ICalculateActions['createPVFCFF'] = payload =>
    setCalculate(prev => {
      return { ...prev, PVFCFF: { ...prev?.PVFCFF, ...payload } }
    })

  const createACF: ICalculateActions['createACF'] = payload =>
    setCalculate(prev => {
      return { ...prev, ACF: { ...prev?.ACF, ...payload } }
    })

  const createADCF: ICalculateActions['createADCF'] = payload =>
    setCalculate(prev => {
      return { ...prev, ADCF: { ...prev?.ADCF, ...payload } }
    })

  const createTV: ICalculateActions['createTV'] = payload =>
    setCalculate(prev => {
      return { ...prev, TV: { ...prev?.TV, ...payload } }
    })

  const createNCFTV: ICalculateActions['createNCFTV'] = payload =>
    setCalculate(prev => {
      return { ...prev, NCFTV: { ...prev?.NCFTV, ...payload } }
    })

  const createSDFCFF: ICalculateActions['createSDFCFF'] = payload =>
    setCalculate(prev => {
      return { ...prev, SDFCFF: { ...prev?.SDFCFF, ...payload } }
    })

  const createNPV: ICalculateActions['createNPV'] = payload =>
    setCalculate(prev => {
      return { ...prev, NPV: { ...prev?.NPV, ...payload } }
    })

  const createIRR: ICalculateActions['createIRR'] = payload =>
    setCalculate(prev => {
      return { ...prev, IRR: { ...prev?.IRR, ...payload } }
    })

  const createPP: ICalculateActions['createPP'] = payload =>
    setCalculate(prev => {
      return { ...prev, PP: payload }
    })

  const createDPP: ICalculateActions['createDPP'] = payload =>
    setCalculate(prev => {
      return { ...prev, DPP: payload }
    })

  const deleteCalculate: ICalculateActions['deleteCalculate'] = () =>
    setCalculate(initialCalculateState)

  return [
    calculate ?? calculateValue,
    {
      createCalculate,
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
  ]
}
