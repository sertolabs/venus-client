import React, { createContext, useState, useEffect } from 'react'
import storage from '../utils/storage'
import { RequestState, ExtensionRequest } from '../types/index'
import { sendTabsMessage, closeWindow } from '../services/extension'

export const RequestContext = createContext({} as RequestState)

const RequestProvider: React.FC<{}> = ({ children }) => {
  // Just storing the entire extension payloads for now. This can be typed better
  const [request, setRequest] = useState<ExtensionRequest | null>(null)

  const clearRequest = async () => {
    await storage.removeItem('message')
    await storage.removeItem('sender')
    await storage.removeItem('requestWindow')

    // Should be still in memory to close it
    closeWindow(request?.requestWindow.id)
    setRequest(null)
  }

  const getRequest = async () => {
    const message = await storage.getItem('message')
    const sender = await storage.getItem('sender')
    const requestWindow = await storage.getItem('requestWindow')

    if (message) {
      setRequest({ message, sender, requestWindow })
    }
  }

  const approveRequest = async (payload: any) => {
    console.log('> sending message from extension')

    await sendTabsMessage({
      tabId: request?.sender.tab.id,
      type: 'REQUEST_APPROVAL',
      payload,
    })

    clearRequest()
  }

  useEffect(() => {
    getRequest()
  }, [])

  return (
    <RequestContext.Provider value={{ request, approveRequest, clearRequest }}>
      {children}
    </RequestContext.Provider>
  )
}

export default RequestProvider
