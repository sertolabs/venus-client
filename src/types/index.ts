export interface AuthProviderProps {}

export interface Auth0Session {
  access_token: string
  expires_in: number
  id_token: string
  scope: string
  token_type: string
}

export interface AppState {
  user: any
  loadingUser: boolean
  defaultIdentity: any
  sendCode: (email: string) => any
  verifyCode: (email: string, code: string) => any
  getUser: (id_token: string) => Promise<any>
}

export interface AuthState {
  session: Auth0Session | undefined
  tenantId: string | undefined
  email: string | undefined
  setEmail: (email: string) => void
  setSession: (token: Auth0Session) => void
  setTenantId: (id: string) => void
  clearSession: () => void
}

export interface ExtensionRequest {
  message: any
  sender: any
  requestWindow: any
}

export interface RequestState {
  request: ExtensionRequest | null
  clearRequest: () => void
  approveRequest: (payload: any) => void
}
