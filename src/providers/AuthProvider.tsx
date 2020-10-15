import React, { useState, createContext, useEffect } from 'react'
import { AuthProviderProps, AuthState } from '../types'
import storage from '../utils/storage'

export const AuthContext = createContext({} as AuthState)

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, saveToken] = useState<string | null | undefined>()
  const [tenantId, saveTenantId] = useState<string | null | undefined>()
  const [ssiConfig, saveSSIConfig] = useState({
    root: 'localhost:3000',
    agent: '/agent',
    enabled: true,
  })

  const [trustAgentConfig, saveTrustAgentConfig] = useState({
    root: 'alpha.consensysidentity.com',
    agent: '/agent',
    enabled: true,
  })

  const setSSIConfig = (ssiConf: any) => {
    saveSSIConfig({ ...ssiConf })
    storage.saveItem('ssi', { ...ssiConf })
  }

  const setTrustAgentConfig = (trustAgentConf: any) => {
    saveTrustAgentConfig({ ...trustAgentConf })
    storage.saveItem('trustAgent', { ...trustAgentConf })
  }

  const getSSIConfigFromStorage = async () => {
    const _ssiConfig: any = await storage.getItem('ssi')
    if (_ssiConfig) {
      saveSSIConfig(_ssiConfig)
    }
  }

  const getTrustAgentConfigFromStorage = async () => {
    const _trustAgentConfig: any = await storage.getItem('ssi')
    if (_trustAgentConfig) {
      saveTrustAgentConfig(_trustAgentConfig)
    }
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

  const clearSession = () => {
    storage.removeItem('token')
    storage.removeItem('tenantId')

    saveToken(null)
    saveTenantId(null)
  }

  useEffect(() => {
    getTokenFromStorage()
    getTenantIdFromStorage()
    getSSIConfigFromStorage()
    getTrustAgentConfigFromStorage()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        token,
        tenantId,
        ssiConfig,
        trustAgentConfig,
        setSSIConfig,
        setTrustAgentConfig,
        setToken,
        setTenantId,
        clearSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
