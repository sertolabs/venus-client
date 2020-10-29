export interface AuthProviderProps {}

export interface AppState {
  user: any
  loadingUser: boolean
  defaultIdentity: any
  messages: any[]
  messagesLoading: boolean
  ssiMode: boolean
  setSSIMode: (enable: boolean) => void
  logout: () => void
  getUser: (id_token: string) => Promise<any>
  createCredential: (name: string) => Promise<any>
  getCredentials: () => Promise<any>
  handleMessage: (raw: string) => Promise<any>
  getRequestedCredentials: (sdr: any) => Promise<any>
  createVerifiablePresentation: (vp: any) => Promise<any>
}

export interface AuthState {
  token: string | null | undefined
  tenantId: string | null | undefined
  ssiConfig: ProviderConfigs
  trustAgentConfig: ProviderConfigs
  setToken: (token: string) => void
  setTenantId: (id: string) => void
  clearSession: () => void
  setSSIConfig: (config: ProviderConfigs) => void
  setTrustAgentConfig: (config: ProviderConfigs) => void
}

export interface RequestState {
  request: ExtensionRequest | null
  clearRequest: () => void
  respond: (payload: any) => void
}

export interface ProviderConfigs {
  root: string
  agent: string
  enabled: boolean
  apiKey: string | null
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
    | 'VC_SAVE_REQUEST'
    | 'VC_SAVE_RESPONSE'
  payload: MessagePayload
}
