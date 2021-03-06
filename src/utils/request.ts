import fetch from 'unfetch'

/**
 *
 * @param endpoint Endpoint for request
 * @param args Arguments for request
 */
const request = async (endpoint: string, args: any): Promise<any> => {
  const res = await fetch(endpoint, args)

  if (res.ok) {
    try {
      return await res.json()
    } catch (err) {
      return res
    }
  } else {
    console.log(`Error response status: ${res.status} url: ${res.url}`)
    throw { status: res.status }
  }
}

export default request
