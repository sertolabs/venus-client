/* global chrome */

const src = chrome.runtime.getURL('page-api.js')

injectScript(src)

function injectScript(content) {
  try {
    const container = document.head || document.documentElement
    const scriptTag = document.createElement('script')
    scriptTag.setAttribute('async', 'true')
    scriptTag.src = content
    container.insertBefore(scriptTag, container.children[0])
  } catch (e) {
    console.error('Script injection failed.', e)
  }
}

window.addEventListener('message', function (event) {
  if (event.source !== window || event.data.source !== 'TRUST_AGENT_ID_WALLET')
    return
  var message = event.data

  if (message.type === 'CONNECT_REQUEST') {
    console.log('> sending CONNECT_REQUEST message to background', message)
    chrome.runtime.sendMessage(message)
  }

  if (message.type === 'AUTH_REQUEST') {
    console.log('> sending AUTH_REQUEST message to background', message)
    chrome.runtime.sendMessage(message)
  }
})

chrome.runtime.onMessage.addListener((message) => {
  console.log('> message content', message)

  if (message.type === 'CONNECT_RESPONSE') {
    window.postMessage({
      source: 'TRUST_AGENT_ID_WALLET',
      type: 'CONNECT_RESPONSE',
      payload: message.payload,
    })
  }

  if (message.type === 'AUTH_RESPONSE') {
    window.postMessage({
      source: 'TRUST_AGENT_ID_WALLET',
      type: 'AUTH_RESPONSE',
      payload: message.payload,
    })
  }
})
