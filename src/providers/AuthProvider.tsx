import React, { useState, createContext, useEffect } from 'react'
import { AuthProviderProps, AuthState } from '../types'
import storage from '../utils/storage'

export const AuthContext = createContext({} as AuthState)

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, saveToken] = useState<string | null | undefined>()
  const [tenantId, saveTenantId] = useState<string | null | undefined>()
  const [ssiEnabled, saveSsiEnabled] = useState(false)

  const setSsiEnabled = (enabled: boolean) => {
    storage.saveItem('ssi', enabled)
    saveSsiEnabled(enabled)
  }

  const setToken = (token: string) => {
    storage.saveItem('token', token)
    saveToken(token)
  }

  const setTenantId = (tenantId: string) => {
    storage.saveItem('tenantId', tenantId)
    saveTenantId(tenantId)
  }

  const getTokenFromStorage = async () => {
    const token: any = await storage.getItem('token')
    if (token) {
      saveToken(token)
    }
  }

  const getTenantIdFromStorage = async () => {
    const tenantId: any = await storage.getItem('tenantId')
    if (tenantId) {
      saveTenantId(tenantId)
    }
  }

  const getSsiEnabledFlagFromStorage = async () => {
    const enabled: any = await storage.getItem('ssi')
    if (enabled !== undefined) {
      saveSsiEnabled(enabled)
    }
  }

  const clearSession = () => {
    storage.clear()

    saveToken(null)
    saveTenantId(null)
  }

  useEffect(() => {
    getTokenFromStorage()
    getTenantIdFromStorage()
    getSsiEnabledFlagFromStorage()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        token,
        tenantId,
        ssiEnabled,
        setToken,
        setTenantId,
        clearSession,
        setSsiEnabled,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
