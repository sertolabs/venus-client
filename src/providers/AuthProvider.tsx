import React, { useState, createContext, useEffect } from 'react'
import { AuthProviderProps, AuthState } from '../types'
import { Auth0Session } from '../types'
import storage from '../utils/storage'

export const AuthContext = createContext({} as AuthState)

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [email, setEmail] = useState<string>()
  const [session, saveSession] = useState<Auth0Session | undefined>()
  const [tenantId, saveTenantId] = useState<string>()

  const setSession = (session: Auth0Session) => {
    storage.saveItem('session', session)
    saveSession(session)
  }

  const setTenantId = (tenantId: string) => {
    storage.saveItem('tenantId', tenantId)
    saveTenantId(tenantId)
  }

  const getSessionFromStorage = async () => {
    const session: any = await storage.getItem('session')
    if (session) {
      setSession(session)
    }
  }

  const getTenantIdFromStorage = async () => {
    const tenantId: any = await storage.getItem('tenantId')
    if (tenantId) {
      setTenantId(tenantId)
    }
  }

  const clearStorage = () => {
    storage.clear()
  }

  useEffect(() => {
    getSessionFromStorage()
    getTenantIdFromStorage()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        session,
        tenantId,
        email,
        setEmail,
        setSession,
        setTenantId,
        clearSession: clearStorage,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
