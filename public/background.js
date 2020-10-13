/* global chrome */

chrome.browserAction.onClicked.addListener(function (tab) {
  chrome.tabs.sendMessage(tab.id, { message: 'load' })
})

// @TODO When a window is closed, check if it matches the window in the current request and reject it if matches
// Eventually we could have a request queue
chrome.windows.onRemoved.addListener(() => {
  chrome.runtime.sendMessage({ type: 'WINDOW_CLOSED' })
})

chrome.runtime.onMessage.addListener((message, sender, response) => {
  console.log('> message from background', message.type)

  if (message.type === 'AUTH_REQUEST') {
    const { token, tenantId } = message.payload

    chrome.storage.local.set({ token, tenantId })
  }

  if (
    (message.type === 'CONNECT_REQUEST') |
    (message.type === 'SD_REQUEST') |
    (message.type === 'VC_SAVE_REQUEST')
  ) {
    // Set the message and sender, it will override previous
    console.log('> background saving message', message.type)
    chrome.storage.local.set({ message, sender })

    // No need to show popup for autosave messages
    if (!message.payload.autosave) {
      // Try to reuse the same popup as before
      chrome.storage.local.get('requestWindow', (store) => {
        if (store.requestWindow) {
          chrome.windows.update(store.requestWindow.id)
        } else {
          chrome.windows.create(
            {
              url: 'index.html',
              type: 'popup',
              width: 380,
              height: 625,
            },
            (newWindow) => {
              chrome.storage.local.set({ requestWindow: newWindow })
            },
          )
        }
      })
    }
  }
})
