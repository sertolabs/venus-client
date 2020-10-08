import React, { useContext, useEffect, useState } from 'react'
import { Box, Heading, Text, Button } from 'rimble-ui'
import { RequestContext } from '../../providers/RequestProvider'
import { AppContext } from '../../providers/AppProvider'

const Request: React.FC<{}> = () => {
  const { request, respond } = useContext(RequestContext)

  const { defaultIdentity: identity } = useContext(AppContext)

  const approve = async () => {
    respond({
      action: 'APPROVE',
      did: identity.did,
    })
  }

  const reject = () => {
    respond({ action: 'REJECT' })
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

      {request?.message && (
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
      )}

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
            onClick={approve}
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
