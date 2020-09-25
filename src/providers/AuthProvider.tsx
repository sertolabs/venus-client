import React, { useState, createContext, useEffect } from 'react'
import { AuthProviderProps, AuthState } from '../types'
import { Auth0Session } from '../types'
import storage from '../utils/storage'

export const AuthContext = createContext({} as AuthState)

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [email, setEmail] = useState<string>('jason.healy+test1@consensys.net')
  const [session, saveSession] = useState<Auth0Session | undefined>()
  const [tenantId, saveTenantId] = useState<string>()

  const setSession = (session: Auth0Session) => {
    storage.saveItem('@session', session)
    saveSession(session)
  }

  const setTenantId = (tenantId: string) => {
    storage.saveItem('@tenantId', tenantId)
    saveTenantId(tenantId)
  }

  // const getSessionFromStorage = () => {}
  // const getTenantIdFromStorage = () => {}

  useEffect(() => {}, [])

  return (
    <AuthContext.Provider
      value={{ session, tenantId, email, setEmail, setSession, setTenantId }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
