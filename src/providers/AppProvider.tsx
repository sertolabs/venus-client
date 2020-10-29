import React, { createContext, useContext, useEffect, useState } from 'react'
import { Agency as sdk, Daf } from '../apis'
import { AuthContext } from './AuthProvider'
import { AppState } from '../types'
import { ENDPOINTS } from '../env'
import { sendAuthResponse } from '../services/extension'

/**
 * Global app state context
 */
export const AppContext = createContext({} as AppState)

const AppProvider: React.FC<{}> = ({ children }) => {
  const {
    token,
    tenantId,
    ssiConfig,
    trustAgentConfig,
    clearSession,
  } = useContext(AuthContext)
  const [user, setUser] = useState(false)
  const [loading, setLoading] = useState(false)
  const [defaultIdentity, setDefaultIdentity] = useState<any>()
  const [messages, setMessages] = useState<any[]>([])
  const [messagesLoading, setMessagesLoading] = useState(false)
  const [ssiMode, setSSIMode] = useState(ssiConfig.enabled)

  /**
   * Get user is a Trust Agent specific endpoint
   */
  const getUser = async (idToken: string) => {
    const ep = `${ENDPOINTS(trustAgentConfig).VERSION}/users/currentUser`
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
    try {
      if (!ssiMode && token && tenantId) {
        const identities = await sdk.identityManagerGetIdentities(
          ENDPOINTS(trustAgentConfig).AGENT,
          token,
          tenantId,
        )

        if (identities.length > 0) {
          setDefaultIdentity(identities[0])
        }
      }

      if (ssiMode) {
        const identities = await Daf.identityManagerGetIdentities(
          ENDPOINTS(ssiConfig).BASE_AGENT,
          { authorization: `Bearer ${ssiConfig.apiKey}` },
        )

        if (identities.length > 0) {
          setDefaultIdentity(identities[0])
        }
      }
    } catch (err) {}
  }

  const createCredential = async (name: string) => {
    if (!ssiMode && token && tenantId && defaultIdentity) {
      return await sdk.createVerifiableCredential(
        ENDPOINTS(trustAgentConfig).AGENT,
        {
          issuer: { id: defaultIdentity.did },
          subject: defaultIdentity.did,
          claims: { name },
        },
        token,
        tenantId,
      )
    }

    if (ssiMode) {
      return await Daf.createVerifiableCredential(
        ENDPOINTS(ssiConfig).BASE_AGENT,
        {
          issuer: { id: defaultIdentity.did },
          subject: defaultIdentity.did,
          claims: { name },
        },
        { authorization: `Bearer ${ssiConfig.apiKey}` },
      )
    }
  }

  const getCredentials = async () => {
    if (!ssiMode && token && tenantId && defaultIdentity) {
      return await sdk.dataStoreORMGetVerifiableCredentials(
        ENDPOINTS(trustAgentConfig).AGENT,
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

    if (ssiMode) {
      return await Daf.dataStoreORMGetVerifiableCredentials(
        ENDPOINTS(ssiConfig).BASE_AGENT,
        {
          order: [{ column: 'issuanceDate', direction: 'DESC' }],
        },
        { authorization: `Bearer ${ssiConfig.apiKey}` },
      )
    }
  }

  const handleMessage = async (jwt: string) => {
    if (!ssiMode && token && tenantId) {
      return await sdk.handleMessage(
        ENDPOINTS(trustAgentConfig).AGENT,
        jwt,
        token,
        tenantId,
      )
    }

    if (ssiMode) {
      return await Daf.handleMessage(ENDPOINTS(ssiConfig).BASE_AGENT, jwt, {
        token: ssiConfig.apiKey,
      })
    }
  }

  const getMessages = async () => {
    if (!ssiMode && token && tenantId && defaultIdentity) {
      setMessagesLoading(true)
      const messages = await sdk.dataStoreORMGetMessages(
        ENDPOINTS(trustAgentConfig).AGENT,
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

    if (ssiMode) {
      setMessagesLoading(true)
      const messages = await Daf.dataStoreORMGetMessages(
        ENDPOINTS(ssiConfig).BASE_AGENT,
        {
          // where: [{}]
        },
        { authorization: `Bearer ${ssiConfig.apiKey}` },
      )
      if (messages) {
        setMessagesLoading(false)
        setMessages(messages)
      }
    }
  }

  const getRequestedCredentials = async (sdr: any) => {
    if (!ssiMode && token && tenantId && defaultIdentity) {
      return await sdk.getVerifiableCredentialsForSdr(
        ENDPOINTS(trustAgentConfig).AGENT,
        sdr,
        token,
        tenantId,
      )
    }

    if (ssiMode) {
      return await Daf.getVerifiableCredentialsForSdr(
        ENDPOINTS(ssiConfig).BASE_AGENT,
        sdr,
        { authorization: `Bearer ${ssiConfig.apiKey}` },
      )
    }
  }

  const createVerifiablePresentation = async (verifiablePresentation: any) => {
    if (!ssiMode && token && tenantId && defaultIdentity) {
      return sdk.createVerifiablePresentation(
        ENDPOINTS(trustAgentConfig).AGENT,
        verifiablePresentation,
        token,
        tenantId,
      )
    }

    if (ssiMode) {
      return Daf.createVerifiablePresentation(
        ENDPOINTS(ssiConfig).BASE_AGENT,
        verifiablePresentation,
        { authorization: `Bearer ${ssiConfig.apiKey}` },
      )
    }
  }

  const logout = () => {
    clearSession()
    setUser(false)
    setDefaultIdentity(null)
  }

  useEffect(() => {
    if (token) {
      getUser(token)
    }
  }, [token])

  useEffect(() => {
    if (token || ssiMode) {
      getDefaultIdentity()
    }
  }, [user, ssiMode])

  useEffect(() => {
    if (token) {
      getMessages()
    }
  }, [defaultIdentity, ssiMode])

  useEffect(() => {
    setSSIMode(ssiConfig.enabled)
  }, [ssiConfig])

  return (
    <AppContext.Provider
      value={{
        user,
        loadingUser: loading,
        defaultIdentity,
        messages,
        messagesLoading,
        ssiMode,
        logout,
        setSSIMode,
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
