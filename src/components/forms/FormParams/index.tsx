import { Input, Checkbox } from '@material-tailwind/react'

import { useParamsController } from '@services'

import { FormConfig } from '@components/forms'

import styles from './FormParams.module.scss'

const FormParams = () => {
  const { register, params } = useParamsController()

  const { DEF, GRT, ITXD, RETD, RMCD, WACC, WCD, TV_enabled } = params

  return (
    <FormConfig
      title='Params'
      classes='z-[1]'
    >
      <div className={styles.row}>
        <Input
          type='number'
          min={0}
          label='Инфляция в РФ, %'
          size='lg'
          defaultValue={DEF || ''}
          {...register('DEF', { valueAsNumber: true })}
        />

        <Input
          type='number'
          min={0}
          label='Инфляция в США, %'
          size='lg'
          defaultValue={GRT || ''}
          readOnly
          {...register('GRT', { valueAsNumber: true })}
        />

        <div className={styles.checkbox}>
          <Checkbox
            label='Учитывать терминальную стоимость?'
            defaultChecked={TV_enabled}
            {...register('TV_enabled')}
          />
        </div>
      </div>

      <div className={styles.row}>
        <Input
          type='number'
          min={0}
          label='Средневзвешенная стоимость капитала, %'
          size='lg'
          defaultValue={WACC || ''}
          {...register('WACC', { valueAsNumber: true })}
        />

        <Input
          type='number'
          min={0}
          label='Рабочий капитал, %'
          size='lg'
          defaultValue={WCD || ''}
          {...register('WCD', { valueAsNumber: true })}
        />

        <Input
          type='number'
          min={0}
          label='Затраты на ремонт и ТО, %'
          size='lg'
          defaultValue={RMCD || ''}
          {...register('RMCD', { valueAsNumber: true })}
        />
      </div>

      <div className={styles.row}>
        <Input
          type='number'
          min={0}
          label='Налог на прибыль, %'
          size='lg'
          defaultValue={ITXD || ''}
          {...register('ITXD', { valueAsNumber: true })}
        />

        <Input
          type='number'
          min={0}
          label='Налог на недвижимое имущество, %'
          size='lg'
          defaultValue={RETD || ''}
          {...register('RETD', { valueAsNumber: true })}
        />
      </div>
    </FormConfig>
  )
}

export default FormParams
