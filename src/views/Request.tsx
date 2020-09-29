import React, { useContext } from 'react'
import { Box, Heading, Text, Button } from 'rimble-ui'
import { RequestContext } from '../providers/RequestProvider'
import { AppContext } from '../providers/AppProvider'

const Request: React.FC<{}> = () => {
  const { request, approveRequest } = useContext(RequestContext)
  const { defaultIdentity: identity } = useContext(AppContext)
  const approve = () => {
    approveRequest({ did: identity.did })
  }

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
      <Box padding={15}>
        <Text>Request type: {request?.message?.type}</Text>
        <Text>Requested:</Text>
        {request &&
          request?.message?.payload?.request?.map((item: string) => {
            return <Text>{item}</Text>
          })}
      </Box>
      <Box padding={15}>
        <Text as={'p'}>You are sharing your identifier with bluuurup</Text>
        {identity && (
          <Text as={'p'} className={'break-word'}>
            {identity.did}
          </Text>
        )}
      </Box>

      {request?.message && (
        <Box marginTop={30}>
          <Button width={250} onClick={approve} disabled={!identity}>
            SHARE DID
          </Button>
        </Box>
      )}
    </Box>
  )
}

export default Request
