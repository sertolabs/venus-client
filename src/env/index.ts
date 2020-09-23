const ENV = {
  BASE: 'https://alpha.consensysidentity.com',
  VERSION: 'v1',
  TENANT: 'tenant',
  FEEDS: 'feeds',
  SCHEMAS: 'schemas',
  AGENT: 'agent/',
}

const ENDPOINTS = {
  BASE: ENV.BASE,
  VERSION: ENV.BASE + ENV.VERSION,
  TENANT: ENV.BASE + ENV.VERSION + ENV.TENANT,
  AGENT: ENV.BASE + ENV.VERSION + ENV.TENANT + ENV.AGENT,
  FEEDS: ENV.BASE + ENV.VERSION + ENV.FEEDS,
  SCHEMAS: ENV.BASE + ENV.VERSION + ENV.FEEDS + ENV.SCHEMAS,
}

export { ENDPOINTS }
