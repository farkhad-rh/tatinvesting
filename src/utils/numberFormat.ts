export const formatNumber = (number: number) => new Intl.NumberFormat('ru-RU').format(number) || 0

export const formatPercent = (number: number) => number / 100 || 0
