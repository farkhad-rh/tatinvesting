import { useRecoilState, useRecoilValue } from 'recoil'

import { initialCalculateState, calculateState } from '@store'

import { ICalculate, ICalculateActions, ICalculateParams } from './calculate.interface'

export const useCalculateService = (): [ICalculate, ICalculateActions] => {
  const [calculate, setCalculate] = useRecoilState(calculateState)
  const calculateValue = useRecoilValue(calculateState)

  const createCalculate = (payload: ICalculate) =>
    setCalculate(prev => {
      return { ...prev, ...payload }
    })

  const createDCFR = (payload: ICalculate['DCFR']) =>
    setCalculate(prev => {
      return { ...prev, DCFR: payload }
    })

  const createRV = (payload: ICalculateParams) =>
    setCalculate(prev => {
      return { ...prev, RV: { ...prev?.RV, ...payload } }
    })

  const createDPR = (payload: ICalculateParams) =>
    setCalculate(prev => {
      return { ...prev, DPR: { ...prev?.DPR, ...payload } }
    })

  const createRVATB = (payload: ICalculateParams) =>
    setCalculate(prev => {
      return { ...prev, RVATB: { ...prev?.RVATB, ...payload } }
    })

  const createRVATP = (payload: ICalculateParams) =>
    setCalculate(prev => {
      return { ...prev, RVATP: { ...prev?.RVATP, ...payload } }
    })

  const createRETR = (payload: ICalculateParams) =>
    setCalculate(prev => {
      return { ...prev, RETR: { ...prev?.RETR, ...payload } }
    })

  const createRMCR = (payload: ICalculateParams) =>
    setCalculate(prev => {
      return { ...prev, RMCR: { ...prev?.RMCR, ...payload } }
    })

  const createRACH = (payload: ICalculateParams) =>
    setCalculate(prev => {
      return { ...prev, RACH: { ...prev?.RACH, ...payload } }
    })

  const createEBITDA = (payload: ICalculateParams) =>
    setCalculate(prev => {
      return { ...prev, EBITDA: { ...prev?.EBITDA, ...payload } }
    })

  const createEBIT = (payload: ICalculateParams) =>
    setCalculate(prev => {
      return { ...prev, EBIT: { ...prev?.EBIT, ...payload } }
    })

  const createITXR = (payload: ICalculateParams) =>
    setCalculate(prev => {
      return { ...prev, ITXR: { ...prev?.ITXR, ...payload } }
    })

  const createENP = (payload: ICalculateParams) =>
    setCalculate(prev => {
      return { ...prev, ENP: { ...prev?.ENP, ...payload } }
    })

  const createFCFF = (payload: ICalculateParams) =>
    setCalculate(prev => {
      return { ...prev, FCFF: { ...prev?.FCFF, ...payload } }
    })

  const createDPRD = (payload: ICalculate['DPRD']) =>
    setCalculate(prev => {
      return { ...prev, DPRD: payload }
    })

  const createDCFCR = (payload: ICalculate['DCFCR']) =>
    setCalculate(prev => {
      return { ...prev, DCFCR: payload }
    })

  const createPVFCFF = (payload: ICalculateParams) =>
    setCalculate(prev => {
      return { ...prev, PVFCFF: { ...prev?.PVFCFF, ...payload } }
    })

  const createACF = (payload: ICalculateParams) =>
    setCalculate(prev => {
      return { ...prev, ACF: { ...prev?.ACF, ...payload } }
    })

  const createADCF = (payload: ICalculateParams) =>
    setCalculate(prev => {
      return { ...prev, ADCF: { ...prev?.ADCF, ...payload } }
    })

  const createTV = (payload: ICalculate['TV']) =>
    setCalculate(prev => {
      return { ...prev, TV: payload }
    })

  const createNCFTV = (payload: ICalculateParams) =>
    setCalculate(prev => {
      return { ...prev, NCFTV: { ...prev?.NCFTV, ...payload } }
    })

  const deleteCalculate = () => setCalculate(initialCalculateState)

  return [
    calculate ?? calculateValue,
    {
      createCalculate,
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
  ]
}
