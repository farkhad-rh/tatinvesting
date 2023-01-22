import { Controller } from 'react-hook-form'

import { Input, Select, Option } from '@material-tailwind/react'
import clsx from 'clsx'

import { Currencies, Powers } from '@constants'

import { formatNumber, getYear } from '@utils'

import { useFinanceController, usePeriodController } from '@services'

import { FormConfig } from '@components/forms'

import styles from './FormFinance.module.scss'

const FormFinance = () => {
  const { period } = usePeriodController()
  const { register, control, finance } = useFinanceController()

  const { ST, SY } = period
  const { CAPEX, KR, FP } = finance

  return (
    <FormConfig
      title='Finance'
      classes='z-[2]'
    >
      <div className={styles.row}>
        <Input
          type='number'
          min={0}
          label='CAPEX'
          size='lg'
          defaultValue={CAPEX?.value || ''}
          {...register('CAPEX.value', { valueAsNumber: true })}
        />

        <Controller
          name={'CAPEX.power'}
          control={control}
          defaultValue={CAPEX?.power}
          render={({ field: { value, onChange, ref } }) => (
            <Select
              ref={ref}
              label='Разрядность'
              size='lg'
              value={value}
              onChange={onChange}
            >
              {Powers?.map(({ key, value }) => (
                <Option
                  key={key}
                  value={value}
                >
                  {key}
                </Option>
              ))}
            </Select>
          )}
        />

        <Controller
          name={'CAPEX.currency'}
          control={control}
          defaultValue={CAPEX?.currency || 'RUB'}
          render={({ field: { value, onChange, ref } }) => (
            <Select
              ref={ref}
              label='Валюта'
              size='lg'
              value={value}
              onChange={onChange}
            >
              {Currencies?.map(({ key, value }) => (
                <Option
                  key={key}
                  value={value}
                >
                  {key}
                </Option>
              ))}
            </Select>
          )}
        />

        <Input
          type='number'
          label='Лимит коэффициента распределения'
          size='lg'
          value={KR?.limit}
          readOnly
        />
      </div>

      <div className={styles.table}>
        {ST?.map(n => (
          <div
            key={n}
            className={styles.col}
          >
            <div className={clsx(styles.cell, styles.year)}>{getYear(SY[n]) || n}</div>

            <Input
              className={styles.coeff}
              type='number'
              min={0}
              max={KR?.limit === 0 ? KR?.value?.[n] || 0 : 1}
              step={0.1}
              label='Коэффициент'
              size='lg'
              defaultValue={KR?.value?.[n] || 0}
              containerProps={{
                className: `${styles.input}`,
              }}
              readOnly={(KR?.value?.[n] || 0) === 0 && KR?.limit === 0}
              {...register(`KR.value.${n}`, { valueAsNumber: true })}
            />

            <div className={clsx(styles.cell, styles.result)}>{formatNumber(FP?.[n] || 0)}</div>
          </div>
        ))}
      </div>
    </FormConfig>
  )
}

export default FormFinance
