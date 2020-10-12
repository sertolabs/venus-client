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

  return (
    <Box
      display={'flex'}
      flex={1}
      flexDirection={'column'}
      paddingBottom={20}
      paddingLeft={20}
      paddingRight={20}
      justifyContent={'space-between'}
    >
      <Heading as="h1">
        <b>Connect</b>
      </Heading>

      <Box flex={1}>
        <Text>
          <span style={{ color: 'darkcyan' }}>{request?.sender.origin}</span> is
          requesting access to your identifier.
        </Text>

        {identity?.did && (
          <Box
            padding={15}
            marginTop={5}
            backgroundColor={'#333333'}
            borderRadius={10}
            className={'animate__animated animate__fadeIn'}
          >
            <Text color={'white'} className={'break-word'}>
              <code>{identity?.did}</code>
            </Text>
          </Box>
        )}
      </Box>
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
