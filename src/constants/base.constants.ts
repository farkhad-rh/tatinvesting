// Авторизация
export const ADMIN = import.meta.env.VITE_ADMIN
export const ADMINPASS = import.meta.env.VITE_ADMINPASS

export const USER = import.meta.env.VITE_USER
export const USERPASS = import.meta.env.VITE_USERPASS

// Количество дней в году
export const KDVG = 365
export const KDVGV = 366

// Диапазон анализа чувствительности - Sensitivity Analysis Range
export const SAR = [-50, -40, -30, -20, -10, 0, 10, 20, 30, 40, 50]

// Матрица анализа чувствительности - Sensitivity Analysis Matrix
export const SAM = SAR.map(() => SAR)
