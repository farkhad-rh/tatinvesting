import { FormEventHandler, forwardRef, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import Calendar from 'react-calendar'

import { Input, InputProps } from '@material-tailwind/react'

import 'react-calendar/dist/Calendar.css'
import styles from './DatePicker.module.scss'

interface DatePickerProps extends InputProps {
  onInput: FormEventHandler<HTMLInputElement>
}

const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  ({ label, size, value, onInput, onChange }, ref) => {
    const { control, watch } = useForm({ mode: 'onChange' })

    useEffect(() => {
      const subscription = watch(value => {
        onInput(value?.calendar)
      })

      return () => subscription.unsubscribe()
    }, [watch, onInput])

    return (
      <div className={styles.wrapper}>
        <Input
          ref={ref}
          type='date'
          label={label}
          size={size}
          value={value}
          onChange={onChange}
        />

        <Controller
          name='calendar'
          control={control}
          render={({ field: { value, onChange, ref } }) => (
            <Calendar
              inputRef={ref}
              minDate={new Date()}
              value={value}
              onChange={onChange}
            />
          )}
        />
      </div>
    )
  }
)

DatePicker.displayName = 'DatePicker'

export default DatePicker
