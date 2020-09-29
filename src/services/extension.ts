const sendTabsMessage = async (message: any) => {
  return new Promise((resolve) => {
    chrome.tabs.sendMessage(message.tabId, message, () => {
      return resolve()
    })
  })
}

const closeCurrentWindow = () => {
  return chrome.windows.getCurrent((windowDetails) => {
    return chrome.windows.remove(windowDetails.id)
  })
}

const closeWindow = (id: number) => {
  return chrome.windows.remove(id)
}

export { sendTabsMessage, closeCurrentWindow, closeWindow }
