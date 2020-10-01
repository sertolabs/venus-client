const SDR_JWT =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NkstUiJ9.eyJpYXQiOjE2MDE1MDU0NjQsInR5cGUiOiJzZHIiLCJzdWJqZWN0IjoiZGlkOmV0aHI6cmlua2VieToweDBiMTVlMDVkZDk0YjY3YmJjMWQxNDQ0OTU3ZWZiOTRhMGYwODI0N2QiLCJjbGFpbXMiOlt7Imlzc3VlcnMiOltdLCJlc3NlbnRpYWwiOnRydWUsImNsYWltVHlwZSI6Im5hbWUiLCJyZWFzb24iOiJXZSBuZWVkIHRoaXMgdG8gc2hvdyBvbiB5b3VyIHByb2ZpbGUifV0sImNyZWRlbnRpYWxzIjpbXSwiaXNzIjoiZGlkOmV0aHI6cmlua2VieToweGU3NWNiOGNiNGI0ZTNlMzM0MmZhOTcxNGFkODQ4NzFhNTA1OTAxYTMifQ.8vRsRq4GK3FirtKp3joEsT2mNQ0JfmhK86EDwygq1WTTU35BCyhkgTN5u_rMl-vXZs5prLQxnV3Hm73fCgXUSQE'

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

async function requestNameCredential() {
  if (window.idWallet) {
    try {
      document.getElementById('content').textContent =
        'Requesting a name credential...'
      // Assume we already know the DID and have created and SDR jwt
      const credential = await idWallet.request(SDR_JWT)
      if (credential) {
        console.info('Credential shared from extension', credential)
        document.getElementById('content').textContent = credential.payload.data
      }
    } catch (er) {
      document.getElementById('content').textContent =
        'Request for credential was rejected'
    }
  }
}
