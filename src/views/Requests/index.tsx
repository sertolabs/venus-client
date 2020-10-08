import React, { useContext } from 'react'
import { Box } from 'rimble-ui'
import { RequestContext } from '../../providers/RequestProvider'
import SelectiveDisclosure from './SelectiveDisclosure'
import CredentialAccept from './CredentialAccept'
import Connect from './Connect'

const Request: React.FC<{}> = () => {
  const { request } = useContext(RequestContext)

  const requestType = () => {
    switch (request?.message.type) {
      case 'CONNECT_REQUEST':
        return <Connect />
      case 'SD_REQUEST':
        return <SelectiveDisclosure />
      case 'VC_SAVE_REQUEST':
        return <CredentialAccept />
      default:
        return <Box></Box>
    }
  }

  return requestType()
}

export default Request
