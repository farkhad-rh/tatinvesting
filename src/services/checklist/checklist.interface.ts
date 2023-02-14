export type TPersons = 'CT' | 'DCE' | 'HRMS' | 'BPESF' | 'HFAMS' | 'HRD' | 'SEESF' | 'LET' | 'PDE'
export type TQuestions = 'SSQ' | 'ECQ' | 'CCQ' | 'ISQ' | 'COEEQ' | 'GQ'

export interface IChecklistPerson {
  fullname?: string
  position?: string
}

export interface IChecklistQuestions {
  question: string
  filling: TPersons[]
  coordinating: TPersons[]
}

export interface IChecklistQuestion {
  answer?: string
  comment?: string
  confirm?: string
}

export interface IChecklist {
  CT: IChecklistPerson
  DCE: IChecklistPerson
  HRMS: IChecklistPerson
  BPESF: IChecklistPerson
  HFAMS: IChecklistPerson
  HRD: IChecklistPerson
  SEESF: IChecklistPerson
  LET: IChecklistPerson
  PDE: IChecklistPerson

  company: string
  project: string

  SSQ?: {
    [key: string]: IChecklistQuestion | undefined
  }
  ECQ?: {
    [key: string]: IChecklistQuestion | undefined
  }
  CCQ?: {
    [key: string]: IChecklistQuestion | undefined
  }
  ISQ?: {
    [key: string]: IChecklistQuestion | undefined
  }
  COEEQ?: {
    [key: string]: IChecklistQuestion | undefined
  }
  GQ?: {
    [key: string]: IChecklistQuestion | undefined
  }
}

export interface IChecklistActions {
  createChecklist: (payload: IChecklist) => void

  createCT: (payload: IChecklist['CT']) => void
  createDCE: (payload: IChecklist['DCE']) => void
  createHRMS: (payload: IChecklist['HRMS']) => void
  createBPESF: (payload: IChecklist['BPESF']) => void
  createHFAMS: (payload: IChecklist['HFAMS']) => void
  createHRD: (payload: IChecklist['HRD']) => void
  createSEESF: (payload: IChecklist['SEESF']) => void
  createLET: (payload: IChecklist['LET']) => void
  createPDE: (payload: IChecklist['PDE']) => void

  createCompany: (payload: IChecklist['company']) => void
  createProject: (payload: IChecklist['project']) => void

  createSSQ: (payload: IChecklistQuestion | undefined, index: string) => void
  createECQ: (payload: IChecklistQuestion | undefined, index: string) => void
  createCCQ: (payload: IChecklistQuestion | undefined, index: string) => void
  createISQ: (payload: IChecklistQuestion | undefined, index: string) => void
  createCOEEQ: (payload: IChecklistQuestion | undefined, index: string) => void
  createGQ: (payload: IChecklistQuestion | undefined, index: string) => void

  deleteChecklist: () => void
}
