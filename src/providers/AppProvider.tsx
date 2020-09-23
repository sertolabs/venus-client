import React, { createContext, useContext } from 'react'
import { Auth, Agent } from '../apis'
import { AuthContext } from './AuthProvider'
import { AppState } from '../types'

/**
 * Global app state context
 */
export const AppContext = createContext({} as AppState)

const AppProvider: React.FC<{}> = ({ children }) => {
  const { token, tenantId, setToken, setTenantId } = useContext(AuthContext)

  const sendCode = async (email: string) => {
    const ep = `https://dev-mdazdke4.us.auth0.com/passwordless/start`
    return await Auth.sendCode(ep, email)
  }

  const verifyCode = async (email: string, code: string) => {
    const ep = 'https://dev-mdazdke4.us.auth0.com/oauth/token'
    const _token = await Auth.verifyCode(ep, email, code)
    setToken(_token)
    return _token
  }

  return (
    <AppContext.Provider value={{ sendCode, verifyCode }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
