import { useRecoilState, useRecoilValue } from 'recoil'

import { initialParamsState, paramsState } from '@store'

import { IParams, IParamsActions } from './params.interface'

export const useParamsService = (): [IParams, IParamsActions] => {
  const [params, setParams] = useRecoilState(paramsState)
  const paramsValue = useRecoilValue(paramsState)

  const createParams = (payload: IParams) =>
    setParams(prev => {
      return { ...prev, ...payload }
    })

  const createDEF = (payload: IParams['DEF']) =>
    setParams(prev => {
      return { ...prev, DEF: payload }
    })

  const createGRT = (payload: IParams['GRT']) =>
    setParams(prev => {
      return { ...prev, GRT: payload }
    })

  const createITXD = (payload: IParams['ITXD']) =>
    setParams(prev => {
      return { ...prev, ITXD: payload }
    })

  const createRETD = (payload: IParams['RETD']) =>
    setParams(prev => {
      return { ...prev, RETD: payload }
    })

  const createRMCD = (payload: IParams['RMCD']) =>
    setParams(prev => {
      return { ...prev, RMCD: payload }
    })

  const createWACC = (payload: IParams['WACC']) =>
    setParams(prev => {
      return { ...prev, WACC: payload }
    })

  const createWCD = (payload: IParams['WCD']) =>
    setParams(prev => {
      return { ...prev, WCD: payload }
    })

  const switchTV = (payload: IParams['TV_enabled']) =>
    setParams(prev => {
      return { ...prev, TV_enabled: payload }
    })

  const deleteParams = () => setParams(initialParamsState)

  return [
    params ?? paramsValue,
    {
      createParams,
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
  ]
}
