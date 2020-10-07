window.idWallet = {
  _meta: {
    version: '1.0.0',
    name: 'Trust Agency',
  },
  authenticate: async (session, tenantId) => {
    window.postMessage({
      source: 'TRUST_AGENT_ID_WALLET',
      type: 'AUTH_REQUEST',
      payload: { session, tenantId },
    })
    return new Promise((resolve, reject) => {
      window.addEventListener('message', (event) => {
        if (event.data.type === 'AUTH_RESPONSE') {
          if (event.data.payload.status === 'SUCCESS') {
            resolve(event.data)
          } else {
            reject(event.data)
          }
        }
      })
    })
  },
  connect: async () => {
    const requestId = window.idWallet.utils._generateRandomString(22)
    window.postMessage({
      requestId,
      source: 'TRUST_AGENT_ID_WALLET',
      type: 'CONNECT_REQUEST',
      payload: { request: ['identifier'] },
    })
    return new Promise((resolve, reject) => {
      window.addEventListener('message', (event) => {
        if (event.data.type === 'CONNECT_RESPONSE') {
          if (event.data.payload.action === 'APPROVE') {
            resolve(event.data)
          } else {
            reject(event.data)
          }
        }
      })
    })
  },
  save: async (vc, autosave) => {
    const requestId = window.idWallet.utils._generateRandomString(24)
    window.postMessage({
      requestId,
      source: 'TRUST_AGENT_ID_WALLET',
      type: 'VC_SAVE_REQUEST',
      payload: { verifiableCredential: vc, autosave },
    })
    return new Promise((resolve, reject) => {
      window.addEventListener('message', (event) => {
        if (event.data.type === 'VC_SAVE_RESPONSE') {
          if (event.data.payload.action === 'CREDENTIAL_ACCEPTED') {
            resolve(event.data)
          } else {
            reject(event.data)
          }
        }
      })
    })
  },
  request: async (jwt) => {
    const requestId = window.idWallet.utils._generateRandomString(22)
    window.postMessage({
      requestId,
      source: 'TRUST_AGENT_ID_WALLET',
      type: 'SD_REQUEST',
      payload: { jwt },
    })
    return new Promise((resolve, reject) => {
      window.addEventListener('message', (event) => {
        if (event.data.type === 'SD_RESPONSE') {
          if (event.data.payload.action === 'APPROVE') {
            resolve(event.data)
          } else {
            reject(event.data)
          }
        }
      })
    })
  },
  utils: {
    _generateRandomString(length) {
      var result = ''
      var characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      var charactersLength = characters.length
      for (var i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength),
        )
      }
      return result
    },
  },
}
