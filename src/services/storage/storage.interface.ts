export type TStorage = 'local' | 'session'

export interface IStorageActions {
  getItem: (key: string) => string | null
  setItem: (key: string, value: string) => void
  clear: (key: string) => void
}
