import React, { createContext, useContext, useEffect, useState } from 'react'
import { Auth, Agency as sdk } from '../apis'
import { AuthContext } from './AuthProvider'
import { AppState } from '../types'
import { ENDPOINTS } from '../env'
import { sendAuthResponse } from '../services/extension'

/**
 * Global app state context
 */
export const AppContext = createContext({} as AppState)

const AppProvider: React.FC<{}> = ({ children }) => {
  const { session, tenantId, setSession, clearSession } = useContext(
    AuthContext,
  )
  const [user, setUser] = useState(false)
  const [loading, setLoading] = useState(false)
  const [defaultIdentity, setDefaultIdentity] = useState<any>()
  const [messages, setMessages] = useState<any[]>([])
  const [messagesLoading, setMessagesLoading] = useState(false)

  const sendCode = async (email: string) => {
    const ep = `https://dev-mdazdke4.us.auth0.com/passwordless/start`
    return await Auth.sendCode(ep, email)
  }

  const verifyCode = async (email: string, code: string) => {
    const ep = 'https://dev-mdazdke4.us.auth0.com/oauth/token'
    const newSession = await Auth.verifyCode(ep, email, code)
    setSession(newSession)
    return newSession
  }

  const createUser = async () => {
    const ep = `${ENDPOINTS.VERSION}/users/signup`
    return session && (await sdk.createUser(ep, session.id_token))
  }

  const getUser = async (idToken: string) => {
    const ep = `${ENDPOINTS.VERSION}/users/currentUser`
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
      if (error.status === 500) {
        setLoading(true)
        const newUser = await createUser()
        setUser(newUser)
        // setTenantId(newUser.tenants[0].Tenant_id)
        setLoading(false)
        return newUser
      }

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
    if (session && tenantId) {
      try {
        const identities = await sdk.identityManagerGetIdentities(
          ENDPOINTS.AGENT,
          session.id_token,
          tenantId,
        )

        setDefaultIdentity(identities[0])
      } catch (err) {}
    }
  }

  const createCredential = async (name: string) => {
    if (session && tenantId && defaultIdentity) {
      return await sdk.createVerifiableCredential(
        ENDPOINTS.AGENT,
        {
          issuer: { id: defaultIdentity.did },
          subject: defaultIdentity.did,
          claims: { name },
        },
        session.id_token,
        tenantId,
      )
    }
  }

  const getCredentials = async () => {
    if (session && tenantId && defaultIdentity) {
      return await sdk.dataStoreORMGetVerifiableCredentials(
        ENDPOINTS.AGENT,
        {
          where: [
            {
              column: 'subject',
              value: [defaultIdentity.did],
            },
          ],
          order: [{ column: 'issuanceDate', direction: 'DESC' }],
        },
        session.id_token,
        tenantId,
      )
    }
  }

  const handleMessage = async (jwt: string) => {
    if (session && tenantId) {
      return await sdk.handleMessage(
        ENDPOINTS.AGENT,
        jwt,
        session.id_token,
        tenantId,
      )
    }
  }

  const getMessages = async () => {
    if (session && tenantId && defaultIdentity) {
      setMessagesLoading(true)
      const messages = await sdk.dataStoreORMGetMessages(
        ENDPOINTS.AGENT,
        {
          // where: [
          //   {
          //     column: 'to',
          //     value: [defaultIdentity.did],
          //   },
          // ],
          // order: [{ column: 'issuanceDate', direction: 'DESC' }],
        },
        session.id_token,
        tenantId,
      )
      if (messages) {
        setMessagesLoading(false)
        setMessages(messages)
      }
    }
  }

  const getRequestedCredentials = async (sdr: any) => {
    if (session && tenantId && defaultIdentity) {
      return await sdk.getVerifiableCredentialsForSdr(
        ENDPOINTS.AGENT,
        sdr,
        session.id_token,
        tenantId,
      )
    }
  }

  const createVerifiablePresentation = async (verifiablePresentation: any) => {
    if (session && tenantId && defaultIdentity) {
      return sdk.createVerifiablePresentation(
        ENDPOINTS.AGENT,
        verifiablePresentation,
        session.id_token,
        tenantId,
      )
    }
  }

  const logout = () => {
    clearSession()
    setUser(false)
  }

  useEffect(() => {
    if (session) {
      getUser(session.id_token)
    }
  }, [session])

  useEffect(() => {
    if (session) {
      getDefaultIdentity()
    }
  }, [user])

  useEffect(() => {
    if (session) {
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
        sendCode,
        verifyCode,
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
