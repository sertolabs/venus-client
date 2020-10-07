import React, { createContext, useContext, useState, useEffect } from 'react'
import storage from '../utils/storage'
import { RequestState, ExtensionRequest } from '../types/index'
import { sendTabsMessage, closeWindow } from '../services/extension'
import { AppContext } from '../providers/AppProvider'

export const RequestContext = createContext({} as RequestState)

const RequestProvider: React.FC<{}> = ({ children }) => {
  // Just storing the entire extension payloads for now. This can be typed better
  const [request, setRequest] = useState<ExtensionRequest | null>(null)
  const { handleMessage } = useContext(AppContext)

  const clearRequest = async () => {
    await storage.removeItem('message')
    await storage.removeItem('sender')
    await storage.removeItem('requestWindow')

    // Should be still in memory to close it
    closeWindow(request?.requestWindow.id)
    setRequest(null)
  }

  const getRequest = async () => {
    const message: any = await storage.getItem('message')
    const sender: any = await storage.getItem('sender')
    const requestWindow: any = await storage.getItem('requestWindow')

    console.log('> stored message', message)

    if (message && !message.payload.autosave) {
      // Set the request state to show UI for accepting / rejecting
      setRequest({ message, sender, requestWindow })
    } else if (message?.payload.autosave) {
      // Save the credential and respond with accepted

      console.log(
        '> saving message',
        message.payload.verifiableCredential.proof.jwt,
      )
      const msg = await handleMessage(
        message.payload.verifiableCredential.proof.jwt,
      )

      console.log('> saved message!', msg)

      respond({ action: 'CREDENTIAL_ACCEPTED' }, { message, sender })
    }
  }

  const getRequestType = (req: any) => {
    switch (req.message.type) {
      case 'CONNECT_REQUEST':
        return 'CONNECT_RESPONSE'
      case 'SD_REQUEST':
        return 'SD_RESPONSE'
      case 'VC_SAVE_REQUEST':
        return 'VC_SAVE_RESPONSE'
      default:
        return 'CONNECT_REQUEST'
    }
  }

  const respond = async (payload: any, req?: any) => {
    console.log('> sending message from extension')

    const _req = req || request

    await sendTabsMessage({
      requestId: _req?.message.requestId,
      source: 'TRUST_AGENT_ID_WALLET',
      tabId: _req?.sender.tab.id,
      type: getRequestType(_req),
      payload,
    })

    clearRequest()
  }

  useEffect(() => {
    getRequest()
  }, [handleMessage])

  return (
    <RequestContext.Provider value={{ request, respond, clearRequest }}>
      {children}
    </RequestContext.Provider>
  )
}

export default RequestProvider
