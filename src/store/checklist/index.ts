import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

import { StorageService, IChecklist } from '@services'

export const { persistAtom: persistChecklist } = recoilPersist({
  key: 'recoil-persist-checklist',
  storage: StorageService('local'),
})

export const initialChecklistState: IChecklist = {
  CT: {
    fullname: '',
    position: 'Главный технолог',
  },
  DCE: {
    fullname: '',
    position: 'ЗГИ по производству',
  },
  HRMS: {
    fullname: '',
    position: 'Руководитель СУН',
  },
  BPESF: {
    fullname: '',
    position: 'Бизнес партнер ФЭС',
  },
  HFAMS: {
    fullname: '',
    position: 'Руководитель СУОФ',
  },
  HRD: {
    fullname: '',
    position: 'Директор по персоналу',
  },
  SEESF: {
    fullname: '',
    position: 'Главный эксперт ФЭС',
  },
  LET: {
    fullname: '',
    position: 'Ведущий инженер технолог',
  },
  PDE: {
    fullname: '',
    position: 'Эксперт по предпроектной проработке',
  },

  company: '',
  project: '',

  SSQ: {} as IChecklist['SSQ'],
  ECQ: {} as IChecklist['ECQ'],
  CCQ: {} as IChecklist['CCQ'],
  ISQ: {} as IChecklist['ISQ'],
  COEEQ: {} as IChecklist['COEEQ'],
  GQ: {} as IChecklist['GQ'],
}

export const checklistState = atom<IChecklist>({
  key: 'checklist-state',
  default: initialChecklistState,
  effects: [persistChecklist],
})
