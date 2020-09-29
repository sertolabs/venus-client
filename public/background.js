/* global chrome */

chrome.browserAction.onClicked.addListener(function (tab) {
  chrome.tabs.sendMessage(tab.id, { message: 'load' })
})

chrome.runtime.onMessage.addListener((message, sender, response) => {
  if (message.type === 'CONNECT_REQUEST') {
    chrome.storage.local.set({ message, sender })
    chrome.windows.create(
      {
        url: 'index.html',
        type: 'popup',
        width: 380,
        height: 600,
      },
      (newWindow) => {
        chrome.storage.local.set({ requestWindow: newWindow })
      },
    )
  }

  if (message.type === 'AUTH_REQUEST') {
    const { session, tenantId } = message.payload

    chrome.storage.local.set({ session, tenantId })
  }
})
