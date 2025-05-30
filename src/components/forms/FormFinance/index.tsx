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

  console.log(SY)

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
          color='blue'
          defaultValue={CAPEX?.value || ''}
          {...register('CAPEX.value', { valueAsNumber: true })}
        />

        <Controller
          name={'CAPEX.power'}
          control={control}
          defaultValue={CAPEX?.power}
          render={({ field: { value, onChange, ref } }) => (
            <Select
              className={styles.select}
              ref={ref}
              label='Разрядность'
              size='lg'
              color='blue'
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
              className={styles.select}
              ref={ref}
              label='Валюта'
              size='lg'
              color='blue'
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
          color='blue'
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
              className={styles.input}
              type='number'
              min={0}
              max={KR?.limit === 0 ? KR?.value?.[n] || 0 : 1}
              step={0.1}
              label='Коэффициент'
              size='lg'
              color='blue'
              defaultValue={KR?.value?.[n] || 0}
              containerProps={{
                className: `${styles.coeff}`,
              }}
              readOnly={(KR?.value?.[n] || 0) === 0 && KR?.limit === 0}
              {...register(`KR.value.${n}`, { valueAsNumber: true })}
            />

            <div className={clsx(styles.cell, styles.result)}>
              {formatNumber(FP?.collection?.[n] || 0)}
            </div>
          </div>
        ))}
      </div>
    </FormConfig>
  )
}

export default FormFinance
