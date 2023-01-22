import { Controller } from 'react-hook-form'

import { Input, Select, Option } from '@material-tailwind/react'
import dayjs from 'dayjs'

import { TimeUnits } from '@constants'

import { usePeriodController } from '@services'

import { FormConfig } from '@components/forms'

import styles from './FormPeriod.module.scss'

const FormPeriod = () => {
  const { register, control, period } = usePeriodController()

  const { PH, PID, PIDDC, DCE } = period

  return (
    <FormConfig
      title='Date planning'
      classes='z-[4]'
    >
      <div className={styles.row}>
        <div className={styles.date}>
          <Input
            type='date'
            min={dayjs().format('YYYY-MM-DD')}
            label='Дата реализации проекта'
            size='lg'
            defaultValue={PID}
            className={styles.input}
            {...register('PID')}
          />
        </div>

        <div className={styles.unit}>
          <Input
            type='number'
            min={0}
            label='Период реализации проекта'
            size='lg'
            defaultValue={DCE?.value || ''}
            {...register('DCE.value', { valueAsNumber: true })}
          />

          <Controller
            name='DCE.unit'
            control={control}
            defaultValue={DCE?.unit}
            render={({ field: { value, onChange, ref } }) => (
              <Select
                ref={ref}
                label='Ед. измерения'
                size='lg'
                value={value}
                onChange={onChange}
              >
                {TimeUnits?.map(({ key, value }) => (
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
        </div>
      </div>

      <div className={styles.row}>
        <Input
          type='date'
          label='Дата получения эффекта проекта'
          size='lg'
          value={PIDDC}
          readOnly
        />

        <Controller
          name='PH'
          control={control}
          defaultValue={PH}
          render={({ field: { value, onChange, ref } }) => (
            <Select
              ref={ref}
              label='Горизонт планирования'
              size='lg'
              value={value}
              onChange={onChange}
            >
              <Option value='15'>15 лет</Option>
              <Option value='16'>16 лет</Option>
              <Option value='17'>17 лет</Option>
              <Option value='18'>18 лет</Option>
              <Option value='19'>19 лет</Option>
              <Option value='20'>20 лет</Option>
            </Select>
          )}
        />
      </div>
    </FormConfig>
  )
}

export default FormPeriod
