import { Agent } from 'http'

const ENV = {
  BASE: 'https://alpha.consensysidentity.com',
  VERSION: '/v1',
  TENANT: '/tenant',
  FEEDS: '/feeds',
  SCHEMAS: '/schemas',
  AGENT: '/agent',
}

// const ENDPOINTS = {
//   BASE: ENV.BASE,
//   VERSION: ENV.BASE + ENV.VERSION,
//   TENANT: ENV.BASE + ENV.VERSION + ENV.TENANT,
//   AGENT: ENV.BASE + ENV.VERSION + ENV.TENANT + ENV.AGENT,
//   FEEDS: ENV.BASE + ENV.VERSION + ENV.FEEDS,
//   SCHEMAS: ENV.BASE + ENV.VERSION + ENV.FEEDS + ENV.SCHEMAS,
// }

// const MESSAGE_TYPES = {
//   AUTH_REQUEST: 'AUTH_REQUEST',
//   CONNECT_REQUEST: 'CONNECT_REQUEST',
//   CONNECT_RESPONSE: 'CONNECT_RESPONSE',
//   DISCLOSURE_REQUEST: 'DISCLOSURE_REQUEST',
//   DISCLOSURE_RESPONSE: 'DISCLOSURE_RESPONSE',
// }

const SOURCE_TYPE = 'TRUST_AGENT_ID_WALLET'

const ENDPOINTS = (config: { root: string; agent: string }) => {
  const PROTOCOL =
    config.root && config.root.startsWith('localhost') ? 'http' : 'https'
  const ENV = {
    BASE: `${PROTOCOL}://${config.root}`,
    VERSION: '/v1',
    TENANT: '/tenant',
    FEEDS: '/feeds',
    SCHEMAS: '/schemas',
    AGENT: config.agent,
  }
  return {
    BASE: ENV.BASE,
    BASE_AGENT: ENV.BASE + ENV.AGENT,
    VERSION: ENV.BASE + ENV.VERSION,
    TENANT: ENV.BASE + ENV.VERSION + ENV.TENANT,
    AGENT: ENV.BASE + ENV.VERSION + ENV.TENANT + ENV.AGENT,
    FEEDS: ENV.BASE + ENV.VERSION + ENV.FEEDS,
    SCHEMAS: ENV.BASE + ENV.VERSION + ENV.FEEDS + ENV.SCHEMAS,
  }
}

export { ENDPOINTS, SOURCE_TYPE }
