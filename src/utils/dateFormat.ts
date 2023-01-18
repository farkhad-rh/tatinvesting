import * as dayjs from 'dayjs'
import isLeapYear from 'dayjs/plugin/isLeapYear'

export const addDate = (date: string, count: number, type: 'day' | 'month' | 'year') =>
  dayjs(date)?.add(count, type)?.format('YYYY-MM-DD')

export const diffDate = (dateA: string, dateB: string, type: 'day' | 'month' | 'year') =>
  dayjs(dateA)?.diff(dateB, type)

export const getYear = (date: string) => dayjs(date)?.year()

export const getEndOfYear = (date: string) => dayjs(date)?.endOf('year')?.format('YYYY-MM-DD')

export const formatDate = (date: string) => dayjs(date)?.format('DD.MM.YYYY')

export const leapYear = (date: string) => {
  dayjs.extend(isLeapYear)

  return dayjs(date)?.isLeapYear()
}
