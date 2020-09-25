/* global chrome */

chrome.browserAction.onClicked.addListener(function (tab) {
  chrome.tabs.sendMessage(tab.id, { message: 'load' })
})

chrome.runtime.onMessage.addListener(function (request, sender, response) {
  const { tenantId, session } = request
  chrome.storage.local.set({ tenantId, session })

  response('AUTH_DATA_SAVED')
})
