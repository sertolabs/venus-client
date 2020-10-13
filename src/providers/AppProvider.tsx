import React, { createContext, useContext, useEffect, useState } from 'react'
import { Agency as sdk } from '../apis'
import { AuthContext } from './AuthProvider'
import { AppState } from '../types'
import { ENDPOINTS } from '../env'
import { sendAuthResponse } from '../services/extension'

/**
 * Global app state context
 */
export const AppContext = createContext({} as AppState)

const AppProvider: React.FC<{}> = ({ children }) => {
  const { token, tenantId, ssiEnabled, clearSession } = useContext(AuthContext)
  const [user, setUser] = useState(false)
  const [loading, setLoading] = useState(false)
  const [defaultIdentity, setDefaultIdentity] = useState<any>()
  const [messages, setMessages] = useState<any[]>([])
  const [messagesLoading, setMessagesLoading] = useState(false)
  const [envConfig, setEnvConfig] = useState({
    custody: { root: 'alpha.consensysidentity.com' },
    ssi: { root: '' },
  })
  const _envConfig = envConfig[ssiEnabled ? 'ssi' : 'custody']

  const conditions = {
    basicCustody: token && tenantId,
    custodyWithDefaultIentity: token && tenantId && defaultIdentity,
    ssi: ssiEnabled && envConfig.ssi.root,
  }

  const updateEnvironmentConfigs = (url: string, type: 'custody' | 'ssi') => {
    setEnvConfig((e) => {
      return {
        ...e,
        [type]: {
          root: url,
        },
      }
    })
  }

  const getUser = async (idToken: string) => {
    const ep = `${ENDPOINTS(_envConfig).VERSION}/users/currentUser`
    try {
      setLoading(true)
      const user = idToken && (await sdk.getUser(ep, idToken))
      setUser(user)
      // setTenantId(user.tenants[0].Tenant_id)
      setLoading(false)
      sendAuthResponse({
        source: 'TRUST_AGENT_ID_WALLET',
        type: 'AUTH_RESPONSE',
        payload: { status: 'SUCCESS', message: 'Authentication success' },
      })
      return user
    } catch (error) {
      if (error.status === 401) {
        setLoading(false)
        sendAuthResponse({
          source: 'TRUST_AGENT_ID_WALLET',
          type: 'AUTH_RESPONSE',
          payload: { status: 'ERROR', message: 'Authentication error' },
        })
      }
    }
  }

  const getDefaultIdentity = async () => {
    if (token && tenantId) {
      try {
        const identities = await sdk.identityManagerGetIdentities(
          ENDPOINTS(_envConfig).AGENT,
          token,
          tenantId,
        )

        setDefaultIdentity(identities[0])
      } catch (err) {}
    }
  }

  const createCredential = async (name: string) => {
    if (token && tenantId && defaultIdentity) {
      return await sdk.createVerifiableCredential(
        ENDPOINTS(_envConfig).AGENT,
        {
          issuer: { id: defaultIdentity.did },
          subject: defaultIdentity.did,
          claims: { name },
        },
        token,
        tenantId,
      )
    }
  }

  const getCredentials = async () => {
    if (token && tenantId && defaultIdentity) {
      return await sdk.dataStoreORMGetVerifiableCredentials(
        ENDPOINTS(_envConfig).AGENT,
        {
          where: [
            {
              column: 'subject',
              value: [defaultIdentity.did],
            },
          ],
          order: [{ column: 'issuanceDate', direction: 'DESC' }],
        },
        token,
        tenantId,
      )
    }
  }

  const handleMessage = async (jwt: string) => {
    if (token && tenantId) {
      return await sdk.handleMessage(
        ENDPOINTS(_envConfig).AGENT,
        jwt,
        token,
        tenantId,
      )
    }
  }

  const getMessages = async () => {
    if (token && tenantId && defaultIdentity) {
      setMessagesLoading(true)
      const messages = await sdk.dataStoreORMGetMessages(
        ENDPOINTS(_envConfig).AGENT,
        {
          // where: [{}]
        },
        token,
        tenantId,
      )
      if (messages) {
        setMessagesLoading(false)
        setMessages(messages)
      }
    }
  }

  const getRequestedCredentials = async (sdr: any) => {
    if (token && tenantId && defaultIdentity) {
      return await sdk.getVerifiableCredentialsForSdr(
        ENDPOINTS(_envConfig).AGENT,
        sdr,
        token,
        tenantId,
      )
    }
  }

  const createVerifiablePresentation = async (verifiablePresentation: any) => {
    if (token && tenantId && defaultIdentity) {
      return sdk.createVerifiablePresentation(
        ENDPOINTS(_envConfig).AGENT,
        verifiablePresentation,
        token,
        tenantId,
      )
    }
  }

  const logout = () => {
    clearSession()
    setUser(false)
  }

  useEffect(() => {
    if (token) {
      getUser(token)
    }
  }, [token])

  useEffect(() => {
    if (token) {
      getDefaultIdentity()
    }
  }, [user])

  useEffect(() => {
    if (token) {
      getMessages()
    }
  }, [defaultIdentity])

  return (
    <AppContext.Provider
      value={{
        user,
        logout,
        loadingUser: loading,
        defaultIdentity,
        messages,
        messagesLoading,
        getUser,
        createCredential,
        getCredentials,
        handleMessage,
        getRequestedCredentials,
        createVerifiablePresentation,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
