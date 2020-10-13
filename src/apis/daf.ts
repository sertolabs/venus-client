import request from '../utils/request'

const identityManagerGetIdentities = async (endpoint: string, auth?: any) => {
  return await request(endpoint + '/identityManagerGetIdentities', {
    method: 'POST',
    headers: {
      ...auth,
    },
  })
}

const identityManagerGetOrCreateIdentity = async (
  endpoint: string,
  auth?: any,
) => {
  return await request(endpoint, {
    method: 'POST',
    headers: {
      ...auth,
    },
  })
}

const createVerifiableCredential = async (
  endpoint: string,
  createCredential: {
    issuer: { id: string }
    subject: string
    claims: any
  },
  auth?: any,
) => {
  const credential = {
    credential: {
      '@context': ['https://www.w3.org/2018/credentials/v1'],
      type: ['VerifiableCredential'],
      issuer: createCredential.issuer,
      issuanceDate: new Date().toISOString(),
      credentialSubject: {
        id: createCredential.subject,
        ...createCredential.claims,
      },
    },
    save: true,
  }

  return await request(endpoint + '/createVerifiableCredential', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...auth,
    },
    body: JSON.stringify(credential),
  })
}

const dataStoreORMGetVerifiableCredentials = async (
  endpoint: string,
  query: any,
  auth?: any,
) => {
  return await request(endpoint + '/dataStoreORMGetVerifiableCredentials', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...auth,
    },
    body: JSON.stringify(query),
  })
}

const handleMessage = async (endpoint: string, raw: string, auth?: any) => {
  return await request(endpoint + '/handleMessage', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...auth,
    },
    body: JSON.stringify({ raw, save: true }),
  })
}

const dataStoreORMGetMessages = async (
  endpoint: string,
  query: any,
  auth?: any,
) => {
  return await request(endpoint + '/dataStoreORMGetMessages', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...auth,
    },
    body: JSON.stringify(query),
  })
}

const getVerifiableCredentialsForSdr = async (
  endpoint: string,
  sdr: any,
  auth?: any,
) => {
  return await request(endpoint + '/getVerifiableCredentialsForSdr', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...auth,
    },
    body: JSON.stringify({ sdr }),
  })
}

const createVerifiablePresentation = async (
  endpoint: string,
  verifiablePresentation: {
    issuer: { did: string }
    audience: string[]
    credentials: any[]
  },
  auth?: any,
) => {
  const presentation = {
    presentation: {
      '@context': ['https://www.w3.org/2018/credentials/v1'],
      type: ['VerifiablePresentation'],
      holder: verifiablePresentation.issuer.did,
      audience: verifiablePresentation.audience,
      issuanceDate: new Date().toISOString(),
      verifiableCredential: verifiablePresentation.credentials,
    },
    save: true,
  }

  return await request(endpoint + '/createVerifiablePresentation', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...auth,
    },
    body: JSON.stringify(presentation),
  })
}

export {
  handleMessage,
  identityManagerGetIdentities,
  identityManagerGetOrCreateIdentity,
  createVerifiableCredential,
  dataStoreORMGetVerifiableCredentials,
  dataStoreORMGetMessages,
  getVerifiableCredentialsForSdr,
  createVerifiablePresentation,
}
