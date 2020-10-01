import request from '../utils/request'

const createUser = async (endpoint: string, token: string) => {
  return await request(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userToken: token }),
  })
}

const getUser = async (endpoint: string, token: string) => {
  return await request(endpoint, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

const identityManagerGetIdentities = async (
  endpoint: string,
  token: string,
  tenantId: string,
) => {
  return await request(endpoint + '/identityManagerGetIdentities', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${token}`,
      tenantId: tenantId,
    },
  })
}

const identityManagerGetOrCreateIdentity = async (
  endpoint: string,
  token: string,
  tenantId: string,
) => {
  return await request(endpoint, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${token}`,
      tenantId: tenantId,
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
  token: string,
  tenantId: string,
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
      authorization: `Bearer ${token}`,
      tenantId: tenantId,
    },
    body: JSON.stringify(credential),
  })
}

const dataStoreORMGetVerifiableCredentials = async (
  endpoint: string,
  query: any,
  token: string,
  tenantId: string,
) => {
  return await request(endpoint + '/dataStoreORMGetVerifiableCredentials', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
      tenantId: tenantId,
    },
    body: JSON.stringify(query),
  })
}

const handleMessage = async (
  endpoint: string,
  raw: string,
  token: string,
  tenantId: string,
) => {
  return await request(endpoint + '/handleMessage', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
      tenantId,
    },
    body: JSON.stringify({ raw, save: true }),
  })
}

const dataStoreORMGetMessages = async (
  endpoint: string,
  query: any,
  token: string,
  tenantId: string,
) => {
  return await request(endpoint + '/dataStoreORMGetMessages', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
      tenantId: tenantId,
    },
    body: JSON.stringify(query),
  })
}

const getVerifiableCredentialsForSdr = async (
  endpoint: string,
  sdr: any,
  token: string,
  tenantId: string,
) => {
  return await request(endpoint + '/getVerifiableCredentialsForSdr', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
      tenantId: tenantId,
    },
    body: JSON.stringify({ sdr }),
  })
}

export {
  getUser,
  createUser,
  handleMessage,
  identityManagerGetIdentities,
  identityManagerGetOrCreateIdentity,
  createVerifiableCredential,
  dataStoreORMGetVerifiableCredentials,
  dataStoreORMGetMessages,
  getVerifiableCredentialsForSdr,
}
