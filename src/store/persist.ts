import { encode, decode } from 'js-base64'
import { recoilPersist } from 'recoil-persist'

interface IStorage {
  getItem(key: string): string | null
  setItem(key: string, value: string): void
  clear(key: string): void
}

export const localStorageBase64 = (): IStorage => {
  return {
    getItem: key => {
      const item = localStorage.getItem(encode(key))

      return decode(item || '') || null
    },
    setItem: (key, value) => {
      localStorage.setItem(encode(key), encode(value))
    },
    clear: () => {
      localStorage.clear()
    },
  }
}

export const { persistAtom } = recoilPersist({ storage: localStorageBase64() })
