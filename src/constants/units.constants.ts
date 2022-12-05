export const WeightUnits = [
  {
    key: 'грамм',
    value: 0.001,
  },
  {
    key: 'кг',
    value: 1,
  },
  {
    key: 'тонн',
    value: 1000,
  },
]

export enum Time {
  MILLISECONDS = 1000,
  SECOND = 1,
  MINUTE = 60,
  HOUR = 60,
  DAY = 24,
  COMMON_YEAR = 365,
  LEAP_YEAR = 366,
}

export const TimeUnits = [
  {
    key: 'день',
    value: 'DAY',
  },
  {
    key: 'месяц',
    value: 'MONTH',
  },
  {
    key: 'год',
    value: 'YEAR',
  },
]
