/**
 * This is how a relying party and TrustAgency authenticate the extension
 */
async function auth() {
  const session = {
    id_token: '<AUTH_JWT>',
  }
  const tenantId = '<TENANT_ID>'

  if (window.idWallet) {
    try {
      document.getElementById('content').textContent =
        'Authenticating Extension with provided credentials. Open the extension to continue...'
      const authMessage = await idWallet.authenticate(session, tenantId)

      if (authMessage) {
        console.log(authMessage)
        document.getElementById('content').textContent =
          authMessage.payload.message
      }

      console.log(authMessage)
    } catch (err) {
      console.log(err)
      document.getElementById('content').textContent = err.payload.message
    }
  }
}

async function connectToWallet() {
  if (window.idWallet) {
    try {
      document.getElementById('content').textContent = 'Waiting for DID...'
      const identity = await idWallet.connect()
      if (identity) {
        console.info('Identity shared from extension', identity)
        document.getElementById('content').textContent = identity.payload.did
      }
    } catch (err) {
      document.getElementById('content').textContent =
        'Request to view DID was rejected'
    }
  }
}
