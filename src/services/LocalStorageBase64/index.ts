import { encode, decode } from 'js-base64'

import type { IStorage } from './LocalStorageBase64.interface'

export const LocalStorageBase64 = (): IStorage => {
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
