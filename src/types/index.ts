export interface AuthProviderProps {}

export interface Auth0Session {
  access_token: string
  expires_in: number
  id_token: string
  scope: string
  token_type: string
}

export interface AppState {
  sendCode: (email: string) => any
  verifyCode: (email: string, code: string) => any
}

export interface AuthState {
  token: Auth0Session | undefined
  tenantId: string | undefined
  email: string | undefined
  setEmail: (email: string) => void
  setToken: (token: Auth0Session) => void
  setTenantId: (id: string) => void
}
