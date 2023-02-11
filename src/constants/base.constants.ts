// Авторизация
export const LOGIN = import.meta.env.VITE_LOGIN
export const PASSWORD = import.meta.env.VITE_PASSWORD

// Количество дней в году
export const KDVG = 365
export const KDVGV = 366

// Диапазон анализа чувствительности - Sensitivity Analysis Range
export const SAR = [-50, -40, -30, -20, -10, 0, 10, 20, 30, 40, 50]

// Матрица анализа чувствительности - Sensitivity Analysis Matrix
export const SAM = SAR.map(() => SAR)
