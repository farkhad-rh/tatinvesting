export const formatNumber = (number: number) =>
  new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 6 }).format(number) || 0

export const formatPercent = (number: number) => number / 100 || 0
