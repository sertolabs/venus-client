import request from '../utils/request'
import * as Daf from './daf'

const createAuthHeaders = (token: string, tenantId: string) => {
  return {
    authorization: `Bearer ${token}`,
    tenantId,
  }
}

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
  return await Daf.identityManagerGetIdentities(
    endpoint,
    createAuthHeaders(token, tenantId),
  )
}

const identityManagerGetOrCreateIdentity = async (
  endpoint: string,
  token: string,
  tenantId: string,
) => {
  return await Daf.identityManagerGetOrCreateIdentity(
    endpoint,
    createAuthHeaders(token, tenantId),
  )
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
  return await Daf.createVerifiableCredential(
    endpoint,
    createCredential,
    createAuthHeaders(token, tenantId),
  )
}

const dataStoreORMGetVerifiableCredentials = async (
  endpoint: string,
  query: any,
  token: string,
  tenantId: string,
) => {
  return await Daf.dataStoreORMGetVerifiableCredentials(
    endpoint,
    query,
    createAuthHeaders(token, tenantId),
  )
}

const handleMessage = async (
  endpoint: string,
  raw: string,
  token: string,
  tenantId: string,
) => {
  return await Daf.handleMessage(
    endpoint,
    raw,
    createAuthHeaders(token, tenantId),
  )
}

const dataStoreORMGetMessages = async (
  endpoint: string,
  query: any,
  token: string,
  tenantId: string,
) => {
  return await Daf.dataStoreORMGetMessages(
    endpoint,
    query,
    createAuthHeaders(token, tenantId),
  )
}

const getVerifiableCredentialsForSdr = async (
  endpoint: string,
  sdr: any,
  token: string,
  tenantId: string,
) => {
  return await Daf.getVerifiableCredentialsForSdr(
    endpoint,
    sdr,
    createAuthHeaders(token, tenantId),
  )
}

const createVerifiablePresentation = async (
  endpoint: string,
  verifiablePresentation: {
    issuer: { did: string }
    audience: string[]
    credentials: any[]
  },
  token: string,
  tenantId: string,
) => {
  return await Daf.createVerifiablePresentation(
    endpoint,
    verifiablePresentation,
    createAuthHeaders(token, tenantId),
  )
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
  createVerifiablePresentation,
}
