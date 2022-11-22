import { Fragment, useEffect } from 'react'
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
} from '@material-tailwind/react'

import styles from './Config.module.scss'
import { useState } from 'react'

const Config = () => {
  const { register, control, watch, reset, resetField } = useForm({
    mode: 'onChange',
  })

  const watchPID = watch('PID')
  const watchPH = watch('PH')
  const watchPE = watch('PE')
  const watchDEF = watch('DEF')?.replace('%', '')
  const watchCAPEX = watch('CAPEX')
  const watchFP = watch('FP') || {}

  const [count, setCount] = useState(1)

  useEffect(() => {
    const subscription = watch(value => {
      console.log(value)
    })

    return () => subscription.unsubscribe()
  }, [watch])

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
              min={new Date().toISOString().slice(0, 10)}
              label='Дата реализации проекта'
              size='lg'
              {...register('PID')}
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
        <CardBody className='flex flex-col gap-4'>
          {[...Array(Number(count)).keys()].map((_, mainIndex) => (
            <Fragment key={mainIndex}>
              <div className='flex flex-wrap gap-4'>
                <div className='w-[24%]'>
                  <Input
                    type='text'
                    label='Наименование продукции'
                    size='lg'
                    {...register(`PE.NPE${mainIndex + 1}.NP`)}
                  />
                </div>

                <div className='w-[24%]'>
                  <Input
                    type='number'
                    label='Объем производства'
                    size='lg'
                    min={0}
                    {...register(`PE.NPE${mainIndex + 1}.NPET`)}
                  />
                </div>

                <div className='w-[24%]'>
                  <Input
                    type='number'
                    label='Стоимость продукций'
                    size='lg'
                    min={0}
                    {...register(`PE.NPE${mainIndex + 1}.PC`)}
                  />
                </div>

                <div className='w-[24%]'>
                  {' '}
                  <Input
                    type='number'
                    label='Расходы – процессинг производства'
                    size='lg'
                    min={0}
                    {...register(`PE.NPE${mainIndex + 1}.EPP`)}
                  />
                </div>
              </div>

              <div className='flex flex-col gap-4'>
                {watchPID &&
                  watchPE?.NPE1?.NP &&
                  [...Array(Number(watchPH)).keys()].map((_, index) => (
                    <div
                      key={index}
                      className='flex gap-4'
                    >
                      <div className='w-[24%]'>
                        {new Date(String(watchPID)).getFullYear() + index}
                      </div>

                      <div className='w-[24%]'>{watchPE[`NPE${mainIndex + 1}`]?.NPET || 0}</div>

                      <div className='w-[24%]'>
                        {index === 0
                          ? watchPE[`NPE${mainIndex + 1}`]?.PC || 0
                          : (Number(watchPE[`NPE${mainIndex + 1}`]?.PC) * Number(watchDEF)) / 100 ||
                            0}
                      </div>

                      <div className='w-[24%]'>
                        {index === 0
                          ? watchPE[`NPE${mainIndex + 1}`]?.EPP || 0
                          : (Number(watchPE[`NPE${mainIndex + 1}`]?.EPP) * Number(watchDEF)) /
                              100 || 0}
                      </div>
                    </div>
                  ))}
              </div>
            </Fragment>
          ))}

          <div className='flex gap-4'>
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

            <Button
              type='submit'
              variant='gradient'
              color='green'
              onClick={() => setCount(count + 1)}
            >
              Добавить
            </Button>
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
              label='Бюджет по освоению'
              size='lg'
              min={0}
              {...register('CAPEX')}
            />
          </div>

          <div className='flex justify-between gap-4 overflow-x-auto'>
            {watchPID &&
              watchCAPEX &&
              [...Array(Number(watchPH)).keys()].map((_, index) => (
                <div
                  key={index}
                  className='flex flex-col gap-4'
                >
                  {new Date(String(watchPID)).getFullYear() + index}

                  <Input
                    type='number'
                    label='Коэффициент'
                    size='lg'
                    min={0}
                    {...register(`FP.KP${index + 1}`)}
                  />

                  {Number(watchCAPEX) * Number(watchFP[`KP${index + 1}`] || 0) > Number(watchCAPEX)
                    ? 0
                    : Number(watchCAPEX) * (Number(watchFP[`KP${index + 1}`]) || 0)}
                </div>
              ))}
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
            Params
          </Typography>
        </CardHeader>
        <CardBody className='flex flex-col gap-4'>
          <div className='flex gap-4'>
            <Input
              type='text'
              label='Дефлятор'
              size='lg'
              defaultValue='4%'
              {...register('DEF')}
            />
            <Input
              type='text'
              label='Средневзвешенная стоимость капитала'
              size='lg'
              {...register('WACC')}
            />
            <Input
              type='text'
              label='Налог на прибыль'
              size='lg'
              defaultValue='20%'
              {...register('ITXD')}
            />
          </div>

          <div className='flex gap-4'>
            <Input
              type='text'
              label='Рабочий капитал'
              size='lg'
              defaultValue='23%'
              {...register('WCD')}
            />
            <Input
              type='text'
              label='Затраты на ремонт и ТО'
              size='lg'
              defaultValue='20%'
              {...register('RMCD')}
            />
            <Input
              type='text'
              label='Налог на недвижимое имущество'
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
