import React, { useState, createContext, useEffect } from 'react'
import { AuthProviderProps, AuthState } from '../types'
import { Auth0Session } from '../types'

export const AuthContext = createContext({} as AuthState)

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [email, setEmail] = useState<string>('jason.healy+test1@consensys.net')
  const [token, setToken] = useState<Auth0Session | undefined>()
  const [tenantId, setTenantId] = useState<string>()

  return (
    <AuthContext.Provider
      value={{ token, tenantId, email, setEmail, setToken, setTenantId }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
