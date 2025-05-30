import { Input } from '@material-tailwind/react'

import { useChecklistController } from '@services'

import styles from './Project.module.scss'

const Project = () => {
  const { register, checklist } = useChecklistController()

  const { CT, DCE, HRMS, BPESF, HFAMS, HRD, SEESF, LET, PDE, company, project } = checklist

  return (
    <div className={styles.wrapper}>
      <div className={styles.row}>
        <Input
          type='text'
          label='Главный технолог'
          variant='standard'
          size='lg'
          color='blue'
          defaultValue={CT?.fullname}
          containerProps={{
            className: styles.input,
          }}
          {...register('CT.fullname')}
        />

        <Input
          type='text'
          label='ЗГИ по производству'
          variant='standard'
          size='lg'
          color='blue'
          defaultValue={DCE?.fullname}
          containerProps={{
            className: styles.input,
          }}
          {...register('DCE.fullname')}
        />

        <Input
          type='text'
          label='Руководитель СУН'
          variant='standard'
          size='lg'
          color='blue'
          defaultValue={HRMS?.fullname}
          containerProps={{
            className: styles.input,
          }}
          {...register('HRMS.fullname')}
        />

        <Input
          type='text'
          label='Бизнес партнер ФЭС'
          variant='standard'
          size='lg'
          color='blue'
          defaultValue={BPESF?.fullname}
          containerProps={{
            className: styles.input,
          }}
          {...register('BPESF.fullname')}
        />

        <Input
          type='text'
          label='Руководитель СУОФ'
          variant='standard'
          size='lg'
          color='blue'
          defaultValue={HFAMS?.fullname}
          containerProps={{
            className: styles.input,
          }}
          {...register('HFAMS.fullname')}
        />

        <Input
          type='text'
          label='Директор по персоналу'
          variant='standard'
          size='lg'
          color='blue'
          defaultValue={HRD?.fullname}
          containerProps={{
            className: styles.input,
          }}
          {...register('HRD.fullname')}
        />

        <Input
          type='text'
          label='Главный эксперт ФЭС'
          variant='standard'
          size='lg'
          color='blue'
          defaultValue={SEESF?.fullname}
          containerProps={{
            className: styles.input,
          }}
          {...register('SEESF.fullname')}
        />
      </div>

      <div className={styles.row}>
        <Input
          type='text'
          label='Предприятие'
          variant='standard'
          size='lg'
          color='blue'
          defaultValue={company}
          containerProps={{
            className: styles.inputHalf,
          }}
          {...register('company')}
        />

        <Input
          type='text'
          label='ФИО ответственного за проработку:'
          variant='standard'
          size='lg'
          color='blue'
          defaultValue={LET?.fullname}
          containerProps={{
            className: styles.inputHalf,
          }}
          {...register('LET.fullname')}
        />

        <Input
          type='text'
          label='Наименование проекта'
          variant='standard'
          size='lg'
          color='blue'
          defaultValue={project}
          containerProps={{
            className: styles.inputHalf,
          }}
          {...register('project')}
        />

        <Input
          type='text'
          label='ФИО эксперта пред.проектной проработки:'
          variant='standard'
          size='lg'
          color='blue'
          defaultValue={PDE?.fullname}
          containerProps={{
            className: styles.inputHalf,
          }}
          {...register('PDE.fullname')}
        />
      </div>
    </div>
  )
}

export default Project
