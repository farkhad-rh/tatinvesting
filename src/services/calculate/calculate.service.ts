import { useRecoilState, useRecoilValue } from 'recoil'

import { initialCalculateState, calculateState } from '@store'

import {
  ICalculate,
  ICalculateActions,
  ICalculateArray,
  ICalculateSingle,
} from './calculate.interface'

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

  const createRV = (payload: ICalculateArray) =>
    setCalculate(prev => {
      return { ...prev, RV: { ...prev?.RV, ...payload } }
    })

  const createRACH = (payload: ICalculateArray) =>
    setCalculate(prev => {
      return { ...prev, RACH: { ...prev?.RACH, ...payload } }
    })

  const createDPR = (payload: ICalculateArray) =>
    setCalculate(prev => {
      return { ...prev, DPR: { ...prev?.DPR, ...payload } }
    })

  const createRVATB = (payload: ICalculateArray) =>
    setCalculate(prev => {
      return { ...prev, RVATB: { ...prev?.RVATB, ...payload } }
    })

  const createRVATP = (payload: ICalculateArray) =>
    setCalculate(prev => {
      return { ...prev, RVATP: { ...prev?.RVATP, ...payload } }
    })

  const createRETR = (payload: ICalculateArray) =>
    setCalculate(prev => {
      return { ...prev, RETR: { ...prev?.RETR, ...payload } }
    })

  const createRMCR = (payload: ICalculateArray) =>
    setCalculate(prev => {
      return { ...prev, RMCR: { ...prev?.RMCR, ...payload } }
    })

  const createEBITDA = (payload: ICalculateArray) =>
    setCalculate(prev => {
      return { ...prev, EBITDA: { ...prev?.EBITDA, ...payload } }
    })

  const createEBIT = (payload: ICalculateArray) =>
    setCalculate(prev => {
      return { ...prev, EBIT: { ...prev?.EBIT, ...payload } }
    })

  const createITXR = (payload: ICalculateArray) =>
    setCalculate(prev => {
      return { ...prev, ITXR: { ...prev?.ITXR, ...payload } }
    })

  const createENP = (payload: ICalculateArray) =>
    setCalculate(prev => {
      return { ...prev, ENP: { ...prev?.ENP, ...payload } }
    })

  const createFCFF = (payload: ICalculateArray) =>
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

  const createPVFCFF = (payload: ICalculateArray) =>
    setCalculate(prev => {
      return { ...prev, PVFCFF: { ...prev?.PVFCFF, ...payload } }
    })

  const createACF = (payload: ICalculateArray) =>
    setCalculate(prev => {
      return { ...prev, ACF: { ...prev?.ACF, ...payload } }
    })

  const createADCF = (payload: ICalculateArray) =>
    setCalculate(prev => {
      return { ...prev, ADCF: { ...prev?.ADCF, ...payload } }
    })

  const createTV = (payload: ICalculateSingle) =>
    setCalculate(prev => {
      return { ...prev, TV: { ...prev?.TV, ...payload } }
    })

  const createNCFTV = (payload: ICalculateArray) =>
    setCalculate(prev => {
      return { ...prev, NCFTV: { ...prev?.NCFTV, ...payload } }
    })

  const createSDFCFF = (payload: ICalculateSingle) =>
    setCalculate(prev => {
      return { ...prev, SDFCFF: { ...prev?.SDFCFF, ...payload } }
    })

  const createNPV = (payload: ICalculateSingle) =>
    setCalculate(prev => {
      return { ...prev, NPV: { ...prev?.NPV, ...payload } }
    })

  const createIRR = (payload: ICalculate['IRR']) =>
    setCalculate(prev => {
      return { ...prev, IRR: { ...prev?.IRR, ...payload } }
    })

  const createPP = (payload: ICalculate['PP']) =>
    setCalculate(prev => {
      return { ...prev, PP: payload }
    })

  const createDPP = (payload: ICalculate['DPP']) =>
    setCalculate(prev => {
      return { ...prev, DPP: payload }
    })

  const deleteCalculate = () => setCalculate(initialCalculateState)

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
