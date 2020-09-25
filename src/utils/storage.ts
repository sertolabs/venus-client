import isChromeRuntime from './isChrome'

const storage = {
  saveItem: (key: string, item: any) => {
    const stringifiedItem = JSON.stringify(item)
    if (isChromeRuntime()) {
      chrome.storage.local.set({ [key]: item })
    } else {
      localStorage.setItem(key, stringifiedItem)
    }
  },
  getItem: async (key: string) => {
    return new Promise((resolve, reject) => {
      try {
        if (isChromeRuntime()) {
          chrome.storage.local.get(key, (value) => {
            resolve(value[key])
          })
        } else {
          const item = localStorage.getItem(key)
          if (item) {
            resolve(JSON.parse(item))
          }
        }
      } catch (error) {
        reject(error)
      }
    })
  },
}

export default storage
