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
  messages: any[]
  sendCode: (email: string) => any
  verifyCode: (email: string, code: string) => any
  getUser: (id_token: string) => Promise<any>
  createCredential: (name: string) => Promise<any>
  getCredentials: () => Promise<any>
  handleMessage: (raw: string) => Promise<any>
  getRequestedCredentials: (sdr: any) => Promise<any>
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

export interface RequestState {
  request: ExtensionRequest | null
  clearRequest: () => void
  respond: (payload: any) => void
}

export interface ExtensionRequest {
  message: any
  sender: any
  requestWindow: any
}

export enum Source {
  TRUST_AGENT_ID_WALLET,
}

export enum MessageType {
  AUTH_REQUEST,
  AUTH_RESPONSE,
  CONNNECT_REQUEST,
  CONNECT_RESPONSE,
  SD_REQUEST,
  SD_RESPONSE,
}

export enum MessageStatus {
  ERROR,
  SUCCESS,
}

export interface MessagePayload {
  status: 'ERROR' | 'SUCCESS'
  message: string
  action?: 'ACCEPT' | 'REJECT'
  data?: any
}

export interface ExtMessage {
  requestId?: string
  tabId?: number
  source: 'TRUST_AGENT_ID_WALLET'
  type:
    | 'AUTH_REQUEST'
    | 'AUTH_RESPONSE'
    | 'CONNECT_REQUEST'
    | 'CONNECT_RESPONSE'
    | 'SD_REQUEST'
    | 'SD_RESPONSE'
  payload: MessagePayload
}
