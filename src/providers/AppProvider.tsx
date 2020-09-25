import React, { createContext, useContext } from 'react'
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
      const user = idToken && (await sdk.getUser(ep, idToken))
      setTenantId(user.tenants[0].Tenant_id)
      return user
    } catch (error) {
      if (error.status === 500) {
        const newUser = await createUser()
        setTenantId(newUser.tenants[0].Tenant_id)
        return newUser
      }
    }
  }

  return (
    <AppContext.Provider value={{ sendCode, verifyCode, getUser }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
