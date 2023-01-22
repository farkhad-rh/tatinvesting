import { Controller } from 'react-hook-form'

import { Input, Select, Option, Button } from '@material-tailwind/react'
import clsx from 'clsx'

import { Currencies, Powers, WeightUnits } from '@constants'

import { formatNumber, getYear } from '@utils'

import { useEffectController, usePeriodController } from '@services'

import { FormConfig } from '@components/forms'

import styles from './FormEffect.module.scss'

const FormEffect = () => {
  const { period } = usePeriodController()
  const { register, control, handleAdd, handleRemove, effect } = useEffectController()

  const { ST, SY } = period
  const { PE, count } = effect

  return (
    <FormConfig
      title='Project Effect'
      classes='z-[3]'
    >
      {count?.map(n => {
        const NPE = PE?.[`NPE${n}`]
        const { NP, NPET, PC, EPP } = NPE || {}

        return (
          <div
            key={n}
            className={styles.row}
          >
            <div className={styles.form}>
              <div className={styles.name}>
                <Input
                  type='text'
                  label='Наименование продукции'
                  size='lg'
                  defaultValue={NP}
                  {...register(`PE.NPE${n}.NP`)}
                />
              </div>

              <div className={styles.params}>
                <Input
                  type='number'
                  min={0}
                  label='Объем производства'
                  size='lg'
                  defaultValue={NPET?.value || ''}
                  {...register(`PE.NPE${n}.NPET.value`, { valueAsNumber: true })}
                />

                <Controller
                  name={`PE.NPE${n}.NPET.power`}
                  control={control}
                  defaultValue={NPET?.power}
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
                  name={`PE.NPE${n}.NPET.unit`}
                  control={control}
                  defaultValue={NPET?.unit || 'TONNE'}
                  render={({ field: { value, onChange, ref } }) => (
                    <Select
                      ref={ref}
                      label='Ед. измерения'
                      size='lg'
                      value={value}
                      onChange={onChange}
                    >
                      {WeightUnits?.map(({ key, value }) => (
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

              <div className={styles.params}>
                <Input
                  type='number'
                  min={0}
                  label='Стоимость продукций'
                  size='lg'
                  defaultValue={PC?.value || ''}
                  {...register(`PE.NPE${n}.PC.value`, { valueAsNumber: true })}
                />

                <Controller
                  name={`PE.NPE${n}.PC.power`}
                  control={control}
                  defaultValue={PC?.power}
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
                  name={`PE.NPE${n}.PC.currency`}
                  control={control}
                  defaultValue={PC?.currency || 'RUB'}
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
              </div>

              <div className={styles.params}>
                <Input
                  type='number'
                  min={0}
                  label='Процессинг'
                  size='lg'
                  defaultValue={EPP?.value || ''}
                  {...register(`PE.NPE${n}.EPP.value`, { valueAsNumber: true })}
                />

                <Controller
                  name={`PE.NPE${n}.EPP.power`}
                  control={control}
                  defaultValue={EPP?.power}
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
                  name={`PE.NPE${n}.EPP.currency`}
                  control={control}
                  defaultValue={EPP?.currency || 'RUB'}
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
              </div>
            </div>

            <div className={styles.table}>
              {ST?.map(indexST => (
                <div
                  key={indexST}
                  className={styles.col}
                >
                  <div className={clsx(styles.cell, styles.year)}>
                    {getYear(SY[indexST]) || indexST}
                  </div>

                  <div className={clsx(styles.cell, styles.result)}>
                    {formatNumber(NPET?.collection?.[indexST] || 0)}
                  </div>

                  <div className={clsx(styles.cell, styles.result)}>
                    {formatNumber(PC?.collection?.[indexST] || 0)}
                  </div>

                  <div className={clsx(styles.cell, styles.result)}>
                    {formatNumber(EPP?.collection?.[indexST] || 0)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      })}

      <div className={styles.buttons}>
        <Button
          variant='gradient'
          color='green'
          onClick={handleAdd}
        >
          Добавить
        </Button>

        {count?.length > 1 && (
          <Button
            variant='gradient'
            color='red'
            onClick={handleRemove}
          >
            Удалить
          </Button>
        )}
      </div>
    </FormConfig>
  )
}

export default FormEffect
