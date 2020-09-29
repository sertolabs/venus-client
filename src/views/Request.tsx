import React, { useContext } from 'react'
import { Box, Heading, Text, Button } from 'rimble-ui'
import { RequestContext } from '../providers/RequestProvider'

const Request: React.FC<{}> = () => {
  const { request, approveRequest } = useContext(RequestContext)
  const approve = () => {
    approveRequest({ did: '12345678993363e7e7eueruerudue8' })
  }

  return (
    <Box
      display={'flex'}
      flex={1}
      flexDirection={'column'}
      alignItems={'center'}
      paddingBottom={20}
    >
      <Box height={110}></Box>
      <Heading as="h1">
        <b>Request!</b>
      </Heading>
      <Box padding={15}>
        <Text as={'p'}>Request type: {request?.message?.type}</Text>
        <Text as={'p'}>Requested:</Text>
        {request &&
          request?.message?.payload?.request?.map((item: string) => {
            return <Text as={'p'}>{item}</Text>
          })}
      </Box>

      {request?.message && (
        <Box marginTop={30}>
          <Button width={250} onClick={approve}>
            SHARE DID
          </Button>
        </Box>
      )}
    </Box>
  )
}

export default Request
