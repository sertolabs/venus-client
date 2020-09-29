import React, { createContext, useContext, useEffect, useState } from 'react'
import { Auth, Agency as sdk } from '../apis'
import { AuthContext } from './AuthProvider'
import { AppState } from '../types'
import { ENDPOINTS } from '../env'

/**
 * Global app state context
 */
export const AppContext = createContext({} as AppState)

const AppProvider: React.FC<{}> = ({ children }) => {
  const { session, tenantId, setSession, setTenantId } = useContext(AuthContext)
  const [user, setUser] = useState(false)
  const [loading, setLoading] = useState(false)
  const [defaultIdentity, setDefaultIdentity] = useState()

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
      setTenantId(user.tenants[0].Tenant_id)
      setLoading(false)
      return user
    } catch (error) {
      if (error.status === 500) {
        setLoading(true)
        const newUser = await createUser()
        setUser(newUser)
        setTenantId(newUser.tenants[0].Tenant_id)
        setLoading(false)
        return newUser
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

  return (
    <AppContext.Provider
      value={{
        user,
        loadingUser: loading,
        defaultIdentity,
        sendCode,
        verifyCode,
        getUser,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
