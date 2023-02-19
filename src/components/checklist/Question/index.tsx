import { FC } from 'react'
import { Controller } from 'react-hook-form'

import { Input, Option, Select, Typography } from '@material-tailwind/react'
import clsx from 'clsx'

import { IChecklistQuestions, TQuestions, useChecklistController } from '@services'

import styles from './Question.module.scss'

interface QuestionProps extends IChecklistQuestions {
  index: number
  questions: TQuestions
}

const Question: FC<QuestionProps> = ({ index, questions, question, filling, coordinating }) => {
  const { register, control, checklist } = useChecklistController()

  return (
    <div className={styles.wrapper}>
      <Typography
        variant='h6'
        color='blue-gray'
      >
        {`${index + 1}. ${question}`}
      </Typography>

      <div className={styles.row}>
        <Controller
          name={`${questions}.${index}.answer`}
          control={control}
          defaultValue={checklist?.[questions]?.[index]?.answer}
          render={({ field: { value, onChange, ref } }) => (
            <Select
              className={clsx(
                value === 'YES'
                  ? styles.isSuccess
                  : value === 'NO'
                  ? styles.isDanger
                  : value === 'CHECKED'
                  ? styles.isAverage
                  : ''
              )}
              ref={ref}
              label='Ответ заполняющего'
              size='lg'
              value={value}
              onChange={onChange}
            >
              <Option value='YES'>Да</Option>
              <Option value='NO'>Нет</Option>
              <Option value='CHECKED'>Проверено, не требуется</Option>
            </Select>
          )}
        />

        <Input
          type='text'
          label='Обосновыващий комментарий заполняющего'
          size='lg'
          defaultValue={checklist?.[questions]?.[index]?.comment}
          {...register(`${questions}.${index}.comment`)}
        />

        <Controller
          name={`${questions}.${index}.confirm`}
          control={control}
          defaultValue={checklist?.[questions]?.[index]?.confirm}
          render={({ field: { value, onChange, ref } }) => (
            <Select
              className={clsx(
                value === 'YES'
                  ? styles.isSuccess
                  : value === 'NO'
                  ? styles.isDanger
                  : value === 'CHECKED'
                  ? styles.isAverage
                  : ''
              )}
              ref={ref}
              label='Подтверждение согласующего'
              size='lg'
              value={value}
              onChange={onChange}
            >
              <Option value='YES'>Да</Option>
              <Option value='NO'>Нет</Option>
              <Option value='CHECKED'>Проверено, не требуется</Option>
            </Select>
          )}
        />
      </div>

      <div className={styles.row}>
        <div className={styles.info}>
          <Typography
            variant='h6'
            color='blue'
            textGradient
          >
            Заполняющий
          </Typography>

          {filling?.map(fill => (
            <Input
              key={fill}
              type='text'
              label={checklist?.[fill]?.position}
              variant='standard'
              size='lg'
              value={checklist?.[fill]?.fullname || ''}
              readOnly
            />
          ))}
        </div>

        <div className={styles.info}>
          <Typography
            variant='h6'
            color='blue'
            textGradient
          >
            Подтверждающий при согласовании
          </Typography>

          {coordinating?.map(coordinat => (
            <Input
              key={coordinat}
              type='text'
              label={checklist?.[coordinat]?.position}
              variant='standard'
              size='lg'
              value={checklist?.[coordinat]?.fullname || ''}
              readOnly
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Question
