export interface IStorage {
  getItem(key: string): string | null
  setItem(key: string, value: string): void
  clear(key: string): void
}
