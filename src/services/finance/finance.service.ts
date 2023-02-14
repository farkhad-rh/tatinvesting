import { useRecoilState, useRecoilValue } from 'recoil'

import { initialFinanceState, financeState } from '@store'

import { IFinance, IFinanceActions } from './finance.interface'

export const useFinanceService = (): [IFinance, IFinanceActions] => {
  const [finance, setFinance] = useRecoilState(financeState)
  const financeValue = useRecoilValue(financeState)

  const createFinance: IFinanceActions['createFinance'] = payload =>
    setFinance(prev => {
      return { ...prev, ...payload }
    })

  const createCAPEX: IFinanceActions['createCAPEX'] = payload =>
    setFinance(prev => {
      return { ...prev, CAPEX: { ...prev?.CAPEX, ...payload } }
    })

  const createKR: IFinanceActions['createKR'] = payload =>
    setFinance(prev => {
      return { ...prev, KR: { ...prev?.KR, ...payload } }
    })

  const createFP: IFinanceActions['createFP'] = payload =>
    setFinance(prev => {
      return { ...prev, FP: { ...prev?.FP, ...payload } }
    })

  const deleteFinance: IFinanceActions['deleteFinance'] = () => setFinance(initialFinanceState)

  return [
    finance ?? financeValue,
    {
      createFinance,
      createCAPEX,
      createKR,
      createFP,
      deleteFinance,
    },
  ]
}
