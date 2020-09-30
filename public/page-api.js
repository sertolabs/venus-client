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
    window.postMessage({
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
}
