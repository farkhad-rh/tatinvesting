import { Fragment, useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Input,
  Select,
  Option,
  Button,
  Checkbox,
} from '@material-tailwind/react'

import styles from './Config.module.scss'
import { Time, TimeUnits } from '@constants/units.constants'

const Config = () => {
  const { register, control, watch, reset, resetField, setValue } = useForm({
    mode: 'onChange',
  })

  const watchPID = watch('PID')
  const watchPIDDC = watch('PIDDC')
  const watchDCE = watch('DCE')
  const watchPH = watch('PH')
  const watchPE = watch('PE')
  const watchDEFRU = watch('DEFRU')?.replace('%', '')
  const watchCAPEX = watch('CAPEX')
  const watchFP = watch('FP') || {}

  const [count, setCount] = useState(1)

  const ST = [...Array(Number(watchPH) || 15).keys()].map(n => n + 1)

  const SH = [...Array(Number(watchPH) + 1 || 16).keys()].map((_, index) =>
    new Date(
      new Date(watchPID).getFullYear() + index || new Date().getFullYear() + index,
      11,
      31
    ).toLocaleDateString('en-CA')
  )

  const SHRR = [...Array(Number(watchPH) + 1 || 16).keys()].map((_, index) => {
    if (
      (new Date(watchPID).getFullYear() + index || new Date().getFullYear() + index) <
      new Date(watchPIDDC).getFullYear()
    ) {
      return 0
    }

    if (
      (new Date(watchPID).getFullYear() + index || new Date().getFullYear() + index) >
      new Date(watchPIDDC).getFullYear()
    ) {
      return 1
    }

    if (
      (new Date(watchPID).getFullYear() + index || new Date().getFullYear() + index) ===
      new Date(watchPIDDC).getFullYear()
    ) {
      return (
        Math.round(
          (new Date(SH[index]).getTime() - new Date(watchPIDDC).getTime()) /
            (Time.MILLISECONDS * Time.MINUTE * Time.HOUR * Time.DAY)
        ) / Time.COMMON_YEAR
      )
    }
  })

  const calcFnDEF = (value: number, index: number) => {
    const result = Math.round(value * Math.pow(1 + Number(watchDEFRU) / 100, index) * 100) / 100

    return result || 0
  }

  const calcFnFP = (value: number, index: number) => {
    if (Object.values(watchFP)?.reduce<Record<number, number>>((a, b) => a + b, 0) > 1) return 0

    const result = value * watchFP[`KP${index}`]

    return result || 0
  }

  useEffect(() => {
    const subscription = watch(value => {
      console.log(value)
    })

    return () => subscription.unsubscribe()
  }, [watch])

  useEffect(() => {
    if (watchPID && watchDCE?.value && watchDCE?.unit) {
      const PIDDC = new Date(
        new Date(watchPID).setFullYear(
          new Date(watchPID).getFullYear() + ((watchDCE?.unit === 'YEAR' && watchDCE?.value) || 0),
          new Date(watchPID).getMonth() + ((watchDCE?.unit === 'MONTH' && watchDCE?.value) || 0),
          new Date(watchPID).getDate() + ((watchDCE?.unit === 'DAY' && watchDCE?.value) || 0)
        )
      ).toLocaleDateString('en-CA')

      setValue('PIDDC', PIDDC)

      return
    }

    setValue('PIDDC', '')
  }, [watchPID, watchDCE?.value, watchDCE?.unit, setValue])

  return (
    <>
      <Typography
        className='text-center'
        variant='h1'
        color='blue'
        textGradient
      >
        Экспресс оценка инвестиционных проектов
      </Typography>

      <Card>
        <CardHeader
          variant='gradient'
          color='blue'
          className='py-2 px-4'
        >
          <Typography
            variant='h6'
            color='white'
          >
            Date planning
          </Typography>
        </CardHeader>
        <CardBody className='flex flex-col gap-4'>
          <div className='flex gap-4'>
            <Input
              type='date'
              min={new Date().toLocaleDateString('en-CA')}
              label='Дата реализации проекта'
              size='lg'
              containerProps={{
                className: 'w-1/2',
              }}
              {...register('PID')}
            />

            <div className='flex w-1/2 gap-2'>
              <Input
                type='number'
                label='Период реализации проекта'
                size='lg'
                {...register('DCE.value', { valueAsNumber: true })}
              />

              <Controller
                name='DCE.unit'
                control={control}
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

          <div className='flex gap-4'>
            <Input
              type='date'
              label='Дата получения эффекта проекта'
              size='lg'
              readOnly
              {...register('PIDDC')}
            />

            <Controller
              name='PH'
              control={control}
              defaultValue='15'
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
        </CardBody>
      </Card>

      <Card>
        <CardHeader
          variant='gradient'
          color='blue'
          className='py-2 px-4'
        >
          <Typography
            variant='h6'
            color='white'
          >
            Project Effect
          </Typography>
        </CardHeader>
        <CardBody className='flex flex-col gap-2'>
          {[...Array(Number(count)).keys()].map((_, mainIndex) => (
            <div
              key={mainIndex}
              className='flex gap-2'
            >
              <div className='flex w-72 flex-col gap-2'>
                <div className='w-[100%]'>
                  <Input
                    type='text'
                    label='Наименование продукции'
                    size='lg'
                    {...register(`PE.NPE${mainIndex + 1}.NP`)}
                  />
                </div>

                <div className='w-[100%]'>
                  <Input
                    type='number'
                    label='Объем производства'
                    size='lg'
                    min={0}
                    {...register(`PE.NPE${mainIndex + 1}.NPET`, { valueAsNumber: true })}
                  />
                </div>

                <div className='w-[100%]'>
                  <Input
                    type='number'
                    label='Стоимость продукций'
                    size='lg'
                    min={0}
                    {...register(`PE.NPE${mainIndex + 1}.PC`, { valueAsNumber: true })}
                  />
                </div>

                <div className='w-[100%]'>
                  {' '}
                  <Input
                    type='number'
                    label='Процессинг'
                    size='lg'
                    min={0}
                    {...register(`PE.NPE${mainIndex + 1}.EPP`, { valueAsNumber: true })}
                  />
                </div>
              </div>

              <div className='flex w-[100%] gap-2 overflow-x-auto pb-2'>
                {[...Array(Number(watchPH) + 1 || 16).keys()].map((_, index) => (
                  <div
                    key={index}
                    className='flex w-32 flex-shrink-0 flex-col gap-2'
                  >
                    <div className='flex h-11 items-center justify-center rounded-md bg-gradient-to-tr from-blue-gray-400 to-blue-gray-200 font-bold text-white'>
                      {new Date(watchPID).getFullYear() + index || index}
                    </div>

                    <div className='flex h-11 items-center justify-center rounded-md border border-blue-gray-200'>
                      {(watchPE && watchPE[`NPE${mainIndex + 1}`]?.NPET) || 0}
                    </div>

                    <div className='flex h-11 items-center justify-center rounded-md border border-blue-gray-200'>
                      {index === 0
                        ? (watchPE && watchPE[`NPE${mainIndex + 1}`]?.PC) || 0
                        : calcFnDEF(watchPE && watchPE[`NPE${mainIndex + 1}`]?.PC, index)}
                    </div>

                    <div className='flex h-11 items-center justify-center rounded-md border border-blue-gray-200'>
                      {index === 0
                        ? (watchPE && watchPE[`NPE${mainIndex + 1}`]?.EPP) || 0
                        : calcFnDEF(watchPE && watchPE[`NPE${mainIndex + 1}`]?.EPP, index)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className='flex gap-2'>
            <Button
              type='submit'
              variant='gradient'
              color='green'
              onClick={() => setCount(count + 1)}
            >
              Добавить
            </Button>

            {count > 1 && (
              <Button
                type='submit'
                variant='gradient'
                color='red'
                onClick={() => {
                  resetField(`PE.NPE${count}`)
                  setCount(count - 1)
                }}
              >
                Удалить
              </Button>
            )}
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader
          variant='gradient'
          color='blue'
          className='py-2 px-4'
        >
          <Typography
            variant='h6'
            color='white'
          >
            Finance
          </Typography>
        </CardHeader>
        <CardBody className='flex flex-col gap-4'>
          <div className='flex gap-4'>
            <Input
              type='number'
              label='CAPEX'
              size='lg'
              min={0}
              {...register('CAPEX', { valueAsNumber: true })}
            />
          </div>

          {watchCAPEX ? (
            <div className='flex justify-between gap-4 overflow-x-auto pb-2'>
              {[...Array(Number(watchPH) + 1 || 16).keys()].map((_, index) => (
                <div
                  key={index}
                  className='flex flex-col gap-2'
                >
                  <div className='flex h-11 items-center justify-center rounded-md bg-gradient-to-tr from-blue-gray-400 to-blue-gray-200 px-3 font-bold text-white'>
                    {new Date(watchPID).getFullYear() + index || index}
                  </div>

                  <Input
                    type='number'
                    label='Коэффициент'
                    size='lg'
                    min={0}
                    max={1}
                    defaultValue={0}
                    className='text-center'
                    containerProps={{
                      className: 'min-w-[128px]',
                    }}
                    {...register(`FP.KP${index}`, { valueAsNumber: true })}
                  />

                  <div className='flex h-11 items-center justify-center rounded-md border border-blue-gray-200 px-3'>
                    {calcFnFP(watchCAPEX, index)}
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </CardBody>
      </Card>

      <Card>
        <CardHeader
          variant='gradient'
          color='blue'
          className='py-2 px-4'
        >
          <Typography
            variant='h6'
            color='white'
          >
            Params
          </Typography>
        </CardHeader>
        <CardBody className='flex flex-col gap-4'>
          <div className='flex gap-4'>
            <Input
              type='text'
              label='Инфляция в РФ, %'
              size='lg'
              defaultValue='4%'
              {...register('DEFRU')}
            />
            <Input
              type='text'
              label='Инфляция в США, %'
              size='lg'
              defaultValue='2%'
              readOnly
              {...register('DEFUS')}
            />
            <div className='w-full min-w-[200px]'>
              <Checkbox
                label='Учитывать терминальную стоимость?'
                {...register('TVTrigger')}
              />
            </div>
          </div>

          <div className='flex gap-4'>
            <Input
              type='text'
              label='Средневзвешенная стоимость капитала, %'
              size='lg'
              {...register('WACC')}
            />
            <Input
              type='text'
              label='Рабочий капитал, %'
              size='lg'
              defaultValue='23%'
              {...register('WCD')}
            />
            <Input
              type='text'
              label='Затраты на ремонт и ТО, %'
              size='lg'
              defaultValue='20%'
              {...register('RMCD')}
            />
          </div>

          <div className='flex gap-4'>
            <Input
              type='text'
              label='Налог на прибыль, %'
              size='lg'
              defaultValue='20%'
              {...register('ITXD')}
            />
            <Input
              type='text'
              label='Налог на недвижимое имущество, %'
              size='lg'
              {...register('RETD')}
            />
          </div>
        </CardBody>
      </Card>
    </>
  )
}

export default Config
