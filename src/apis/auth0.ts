import request from '../utils/request'

const sendCode = async (endpoint: string, email: string) => {
  return await request(endpoint, {
    method: 'Post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: 'sAnzetlNs0HbyokOncaTUZmLRijPazBc',
      client_secret:
        'mU5pzVZZ7zeo4J-ueFh4f-faRQcvuHS_95D-pELJ0p2wsaczsaGMILXZdrwkoxEp', // for web applications
      connection: 'email',
      email,
      send: 'code',
      authParams: {
        scope: 'openid',
      },
    }),
  })
}

const verifyCode = async (endpoint: string, email: string, code: string) => {
  return await request(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: 'sAnzetlNs0HbyokOncaTUZmLRijPazBc',
      client_secret:
        'mU5pzVZZ7zeo4J-ueFh4f-faRQcvuHS_95D-pELJ0p2wsaczsaGMILXZdrwkoxEp',
      realm: 'email',
      grant_type: 'http://auth0.com/oauth/grant-type/passwordless/otp',
      username: email,
      otp: code,
      scope: 'openid profile email',
    }),
  })
}

export { sendCode, verifyCode }
