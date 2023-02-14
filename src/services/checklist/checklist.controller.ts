import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { useChecklistService, IChecklist } from '@services'

export const useChecklistController = () => {
  const { register, control, watch, reset } = useForm<IChecklist>({ mode: 'onChange' })

  const [
    checklist,
    {
      createCT,
      createDCE,
      createHRMS,
      createBPESF,
      createHFAMS,
      createHRD,
      createSEESF,
      createCompany,
      createProject,
      createLET,
      createPDE,
      createSSQ,
      createECQ,
      createCCQ,
      createISQ,
      createCOEEQ,
      createGQ,
      deleteChecklist,
    },
  ] = useChecklistService()

  useEffect(() => {
    const subscription = watch(
      ({
        CT,
        DCE,
        HRMS,
        BPESF,
        HFAMS,
        HRD,
        SEESF,
        company,
        project,
        LET,
        PDE,
        SSQ,
        ECQ,
        CCQ,
        ISQ,
        COEEQ,
        GQ,
      }) => {
        // Главный технолог (CT)
        if (CT) {
          createCT({ position: 'Главный технолог', ...CT })
        }

        // Заместитель главного инженера по производству (DCE)
        if (DCE) {
          createDCE({ position: 'ЗГИ по производству', ...DCE })
        }

        // Руководитель службы управления надежностью (HRMS)
        if (HRMS) {
          createHRMS({ position: 'Руководитель СУН', ...HRMS })
        }

        // Бизнес партнер функции экономической службы (BPESF)
        if (BPESF) {
          createBPESF({ position: 'Бизнес партнер ФЭС', ...BPESF })
        }

        // Руководитель службы управления основными фондами (HFAMS)
        if (HFAMS) {
          createHFAMS({ position: 'Руководитель СУОФ', ...HFAMS })
        }

        // Директор по персоналу (HRD)
        if (HRD) {
          createHRD({ position: 'Директор по персоналу', ...HRD })
        }

        // Главный эксперт функции экономической службы (SEESF)
        if (SEESF) {
          createSEESF({ position: 'Главный эксперт ФЭС', ...SEESF })
        }

        // Ведущий инженер технолог (LET)
        if (LET) {
          createLET({ position: 'Ведущий инженер технолог', ...LET })
        }

        // Эксперт по предпроектной проработке (PDE)
        if (PDE) {
          createPDE({ position: 'Эксперт по предпроектной проработке', ...PDE })
        }

        // Предприятие (company)
        if (company !== undefined) {
          createCompany(company)
        }

        // Наименование проекта (project)
        if (project !== undefined) {
          createProject(project)
        }

        // Системность решения (SSQ)
        if (SSQ) {
          for (const key in SSQ) {
            createSSQ(SSQ?.[key], key)
          }
        }

        // Расчет эффекта (ECQ)
        if (ECQ) {
          for (const key in ECQ) {
            createECQ(ECQ?.[key], key)
          }
        }

        // Расчет затрат (CCQ)
        if (CCQ) {
          for (const key in CCQ) {
            createCCQ(CCQ?.[key], key)
          }
        }

        // График реализации (ISQ)
        if (ISQ) {
          for (const key in ISQ) {
            createISQ(ISQ?.[key], key)
          }
        }

        // Расчет экономической эффективности (COEEQ)
        if (COEEQ) {
          for (const key in COEEQ) {
            createCOEEQ(COEEQ?.[key], key)
          }
        }

        // Общее (GQ)
        if (GQ) {
          for (const key in GQ) {
            createGQ(GQ?.[key], key)
          }
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [watch])

  return { register, control, reset, checklist, deleteChecklist }
}
