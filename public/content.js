/* global chrome */

chrome.runtime.onMessage.addListener(function (request, sender, callback) {
  // Do stuff
})

window.addEventListener('message', function (event) {
  if (event.source !== window) return
  // onDidReceiveMessage(event)
  var message = event.data

  if (message.type === 'AUTH') {
    chrome.runtime.sendMessage(message, (respone) => {
      console.log('RESP', respone)
    })
  }
})

async function onDidReceiveMessage(event) {
  if (event.data.type && event.data.type === 'GET_EXTENSION_ID') {
    window.postMessage(
      { type: 'EXTENSION_ID_RESULT', extensionId: chrome.runtime.id },
      '*',
    )
  }
}
