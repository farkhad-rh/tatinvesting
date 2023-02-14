import { useRecoilState, useRecoilValue } from 'recoil'

import { initialParamsState, paramsState } from '@store'

import { IParams, IParamsActions } from './params.interface'

export const useParamsService = (): [IParams, IParamsActions] => {
  const [params, setParams] = useRecoilState(paramsState)
  const paramsValue = useRecoilValue(paramsState)

  const createParams: IParamsActions['createParams'] = payload =>
    setParams(prev => {
      return { ...prev, ...payload }
    })

  const createDEF: IParamsActions['createDEF'] = payload =>
    setParams(prev => {
      return { ...prev, DEF: payload }
    })

  const createGRT: IParamsActions['createGRT'] = payload =>
    setParams(prev => {
      return { ...prev, GRT: payload }
    })

  const createITXD: IParamsActions['createITXD'] = payload =>
    setParams(prev => {
      return { ...prev, ITXD: payload }
    })

  const createRETD: IParamsActions['createRETD'] = payload =>
    setParams(prev => {
      return { ...prev, RETD: payload }
    })

  const createRMCD: IParamsActions['createRMCD'] = payload =>
    setParams(prev => {
      return { ...prev, RMCD: payload }
    })

  const createWACC: IParamsActions['createWACC'] = payload =>
    setParams(prev => {
      return { ...prev, WACC: payload }
    })

  const createWCD: IParamsActions['createWCD'] = payload =>
    setParams(prev => {
      return { ...prev, WCD: payload }
    })

  const switchTV: IParamsActions['switchTV'] = payload =>
    setParams(prev => {
      return { ...prev, TV_enabled: payload }
    })

  const deleteParams: IParamsActions['deleteParams'] = () => setParams(initialParamsState)

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
