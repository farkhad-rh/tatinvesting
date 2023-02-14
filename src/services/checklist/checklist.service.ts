import { useRecoilState, useRecoilValue } from 'recoil'

import { initialChecklistState, checklistState } from '@store'

import { IChecklist, IChecklistActions } from './checklist.interface'

export const useChecklistService = (): [IChecklist, IChecklistActions] => {
  const [checklist, setChecklist] = useRecoilState(checklistState)
  const checklistValue = useRecoilValue(checklistState)

  const createChecklist: IChecklistActions['createChecklist'] = payload =>
    setChecklist(prev => {
      return { ...prev, ...payload }
    })

  const createCT: IChecklistActions['createCT'] = payload =>
    setChecklist(prev => {
      return { ...prev, CT: { ...prev?.CT, ...payload } }
    })

  const createDCE: IChecklistActions['createDCE'] = payload =>
    setChecklist(prev => {
      return { ...prev, DCE: { ...prev?.DCE, ...payload } }
    })

  const createHRMS: IChecklistActions['createHRMS'] = payload =>
    setChecklist(prev => {
      return { ...prev, HRMS: { ...prev?.HRMS, ...payload } }
    })

  const createBPESF: IChecklistActions['createBPESF'] = payload =>
    setChecklist(prev => {
      return { ...prev, BPESF: { ...prev?.BPESF, ...payload } }
    })

  const createHFAMS: IChecklistActions['createHFAMS'] = payload =>
    setChecklist(prev => {
      return { ...prev, HFAMS: { ...prev?.HFAMS, ...payload } }
    })

  const createHRD: IChecklistActions['createHRD'] = payload =>
    setChecklist(prev => {
      return { ...prev, HRD: { ...prev?.HRD, ...payload } }
    })

  const createSEESF: IChecklistActions['createSEESF'] = payload =>
    setChecklist(prev => {
      return { ...prev, SEESF: { ...prev?.SEESF, ...payload } }
    })

  const createLET: IChecklistActions['createLET'] = payload =>
    setChecklist(prev => {
      return { ...prev, LET: { ...prev?.LET, ...payload } }
    })

  const createPDE: IChecklistActions['createPDE'] = payload =>
    setChecklist(prev => {
      return { ...prev, PDE: { ...prev?.PDE, ...payload } }
    })

  const createCompany: IChecklistActions['createCompany'] = payload =>
    setChecklist(prev => {
      return { ...prev, company: payload }
    })

  const createProject: IChecklistActions['createProject'] = payload =>
    setChecklist(prev => {
      return { ...prev, project: payload }
    })

  const createSSQ: IChecklistActions['createSSQ'] = (payload, index) =>
    setChecklist(prev => {
      return { ...prev, SSQ: { ...prev?.SSQ, [index]: { ...prev?.SSQ?.[index], ...payload } } }
    })

  const createECQ: IChecklistActions['createECQ'] = (payload, index) =>
    setChecklist(prev => {
      return { ...prev, ECQ: { ...prev?.ECQ, [index]: { ...prev?.ECQ?.[index], ...payload } } }
    })

  const createCCQ: IChecklistActions['createCCQ'] = (payload, index) =>
    setChecklist(prev => {
      return { ...prev, CCQ: { ...prev?.CCQ, [index]: { ...prev?.CCQ?.[index], ...payload } } }
    })

  const createISQ: IChecklistActions['createISQ'] = (payload, index) =>
    setChecklist(prev => {
      return { ...prev, ISQ: { ...prev?.ISQ, [index]: { ...prev?.ISQ?.[index], ...payload } } }
    })

  const createCOEEQ: IChecklistActions['createCOEEQ'] = (payload, index) =>
    setChecklist(prev => {
      return {
        ...prev,
        COEEQ: { ...prev?.COEEQ, [index]: { ...prev?.COEEQ?.[index], ...payload } },
      }
    })

  const createGQ: IChecklistActions['createGQ'] = (payload, index) =>
    setChecklist(prev => {
      return { ...prev, GQ: { ...prev?.GQ, [index]: { ...prev?.GQ?.[index], ...payload } } }
    })

  const deleteChecklist: IChecklistActions['deleteChecklist'] = () =>
    setChecklist(initialChecklistState)

  return [
    checklist ?? checklistValue,
    {
      createChecklist,
      createCT,
      createDCE,
      createHRMS,
      createBPESF,
      createHFAMS,
      createHRD,
      createSEESF,
      createLET,
      createPDE,
      createCompany,
      createProject,
      createSSQ,
      createECQ,
      createCCQ,
      createISQ,
      createCOEEQ,
      createGQ,
      deleteChecklist,
    },
  ]
}
