export const formatNumber = (number: number) => new Intl.NumberFormat('ru-RU').format(number) || 0

export const formatPercent = (number = 0, percent = true): number => {
  if (!percent) {
    return number * 100 || 0
  }

  return number / 100 || 0
}
