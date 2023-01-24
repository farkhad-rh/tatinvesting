import { encode, decode } from 'js-base64'

import type { TStorage, IStorageActions } from './storage.interface'

export const StorageService = (type: TStorage): IStorageActions => {
  return {
    getItem: key => {
      const item =
        type === 'local' ? localStorage.getItem(encode(key)) : sessionStorage.getItem(encode(key))

      return decode(item || '') || null
    },
    setItem: (key, value) => {
      type === 'local'
        ? localStorage.setItem(encode(key), encode(value))
        : sessionStorage.setItem(encode(key), encode(value))
    },
    clear: () => {
      type === 'local' ? localStorage.clear() : sessionStorage.clear()
    },
  }
}
