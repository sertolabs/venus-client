import request from '../utils/request'

const createUser = async (endpoint: string, token: string) => {
  return await request(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userToken: token }),
  })
}

const getUser = async (endpoint: string, token: string) => {
  return await request(endpoint, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export { getUser, createUser }
