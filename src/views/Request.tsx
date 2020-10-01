import React, { useContext, useEffect, useState } from 'react'
import { Box, Heading, Text, Button } from 'rimble-ui'
import { RequestContext } from '../providers/RequestProvider'
import { AppContext } from '../providers/AppProvider'

const Request: React.FC<{}> = () => {
  const { request, respond } = useContext(RequestContext)
  const { defaultIdentity: identity, handleMessage } = useContext(AppContext)
  const [sdr, setSdr] = useState<any>()
  const approve = () => {
    respond({
      did: identity.did,
      action: 'APPROVE',
    })
  }

  const reject = () => {
    respond({ action: 'REJECT' })
  }

  const connectRequest = () => {
    return (
      <Box padding={15}>
        <Box>
          <Text>Request type: {request?.message?.type}</Text>
          <Text>Requested: {requestedItems()} </Text>
        </Box>
        <Box>
          <Text as={'p'}>You are sharing your identifier with bluuurup</Text>
          {identity && (
            <Text as={'p'} className={'break-word'}>
              {identity.did}
            </Text>
          )}
        </Box>
      </Box>
    )
  }

  const sdRequest = () => {
    return (
      <Box padding={15}>
        <Box>
          <Text>Request type: {request?.message?.type}</Text>
          <Text className={'break-word'}>
            <b>{sdr?.from}</b> has requested you share credentials
          </Text>
        </Box>
        <Box>
          <Text as={'p'}>Show requested credentials...</Text>
        </Box>
      </Box>
    )
  }

  const getSdRequest = async () => {
    console.log('> request show payload with jwt', request)
    const sdr = await handleMessage(request?.message.payload.jwt)

    setSdr(sdr)
  }

  const requestedItems = () => {
    return (
      <ul>
        {request?.message?.payload?.request?.map((item: string) => {
          return <li>{item}</li>
        })}
      </ul>
    )
  }

  useEffect(() => {
    if (request?.message.type === 'SD_REQUEST') {
      getSdRequest()
    }
  }, [request])

  return (
    <Box
      display={'flex'}
      flex={1}
      flexDirection={'column'}
      alignItems={'center'}
      paddingBottom={20}
    >
      <Box height={40}></Box>
      <Heading as="h1">
        <b>Request!</b>
      </Heading>

      {request?.message.type === 'CONNECT_REQUEST' && connectRequest()}

      {sdr && sdRequest()}

      {request?.message && (
        <Box
          marginTop={30}
          alignItems={'center'}
          display={'flex'}
          flexDirection={'column'}
        >
          <Button
            width={250}
            marginBottom={'10'}
            onClick={sdRequest}
            disabled={!identity}
          >
            SHARE
          </Button>
          <Button warn width={250} onClick={reject} disabled={!identity}>
            REJECT
          </Button>
        </Box>
      )}
    </Box>
  )
}

export default Request
