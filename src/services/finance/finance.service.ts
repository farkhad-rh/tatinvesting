import { useRecoilState, useRecoilValue } from 'recoil'

import { initialFinanceState, financeState } from '@store'

import { IFinance, IFinanceActions } from './finance.interface'

export const useFinanceService = (): [IFinance, IFinanceActions] => {
  const [finance, setFinance] = useRecoilState(financeState)
  const financeValue = useRecoilValue(financeState)

  const createFinance = (payload: IFinance) =>
    setFinance(prev => {
      return { ...prev, ...payload }
    })

  const createCAPEX = (payload: IFinance['CAPEX']) =>
    setFinance(prev => {
      return { ...prev, CAPEX: { ...prev?.CAPEX, ...payload } }
    })

  const createKR = (payload: IFinance['KR']) =>
    setFinance(prev => {
      return { ...prev, KR: payload }
    })

  const createFP = (payload: IFinance['FP']) =>
    setFinance(prev => {
      return { ...prev, FP: payload }
    })

  const deleteFinance = () => setFinance(initialFinanceState)

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
