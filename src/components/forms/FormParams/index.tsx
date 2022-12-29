import { Input, Checkbox } from '@material-tailwind/react'

import { formatPercent } from '@utils'

import { useParamsController } from '@services'

import { FormConfig } from '@components/forms'

import styles from './FormParams.module.scss'

const FormParams = () => {
  const { register, params } = useParamsController()

  const { DEF, GRT, ITXD, RETD, RMCD, WACC, WCD, TV_enabled } = params

  return (
    <FormConfig title='Params'>
      <div className={styles.row}>
        <Input
          type='number'
          min={0}
          label='Инфляция в РФ, %'
          size='lg'
          defaultValue={formatPercent(DEF, false) || ''}
          {...register('DEF', { valueAsNumber: true })}
        />
        <Input
          type='number'
          min={0}
          label='Инфляция в США, %'
          size='lg'
          defaultValue={formatPercent(GRT, false) || ''}
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
          defaultValue={formatPercent(WACC, false) || ''}
          {...register('WACC', { valueAsNumber: true })}
        />
        <Input
          type='number'
          min={0}
          label='Рабочий капитал, %'
          size='lg'
          defaultValue={formatPercent(WCD, false) || ''}
          {...register('WCD', { valueAsNumber: true })}
        />
        <Input
          type='number'
          min={0}
          label='Затраты на ремонт и ТО, %'
          size='lg'
          defaultValue={formatPercent(RMCD, false) || ''}
          {...register('RMCD', { valueAsNumber: true })}
        />
      </div>

      <div className={styles.row}>
        <Input
          type='number'
          min={0}
          label='Налог на прибыль, %'
          size='lg'
          defaultValue={formatPercent(ITXD, false) || ''}
          {...register('ITXD', { valueAsNumber: true })}
        />
        <Input
          type='number'
          min={0}
          label='Налог на недвижимое имущество, %'
          size='lg'
          defaultValue={formatPercent(RETD, false) || ''}
          {...register('RETD', { valueAsNumber: true })}
        />
      </div>
    </FormConfig>
  )
}

export default FormParams
