const sendTabsMessage = async (message: any) => {
  return new Promise((resolve) => {
    chrome.tabs.sendMessage(message.tabId, message, () => {
      return resolve()
    })
  })
}

const sendAuthResponse = async (message: any) => {
  return new Promise((resolve) => {
    chrome.tabs.query(
      {
        active: true,
        currentWindow: true,
      },
      (tabs) => {
        tabs &&
          tabs[0] &&
          tabs[0].id &&
          chrome.tabs.sendMessage(tabs[0].id, message)
      },
    )
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

export { sendTabsMessage, closeCurrentWindow, closeWindow, sendAuthResponse }
