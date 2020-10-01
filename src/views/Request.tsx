import React, { useContext, useEffect, useState } from 'react'
import { Box, Heading, Text, Button } from 'rimble-ui'
import { RequestContext } from '../providers/RequestProvider'
import { AppContext } from '../providers/AppProvider'
import Credential from '../components/Credential'

const Request: React.FC<{}> = () => {
  const { request, respond } = useContext(RequestContext)
  const [sdrCredentials, setSdrCredentials] = useState<any[]>()
  const {
    defaultIdentity: identity,
    handleMessage,
    getRequestedCredentials,
  } = useContext(AppContext)
  const [sdr, setSdr] = useState<any>()

  const approve = () => {
    if (request?.message.type === 'CONNECT_REQUEST') {
      respond({
        action: 'APPROVE',
        did: identity.did,
      })
    } else if (request?.message.type === 'SD_REQUEST') {
      respond({
        action: 'APPROVE',
        verifiablePresentation: {
          hello: 'World',
        },
      })
    }
  }

  const reject = () => {
    respond({ action: 'REJECT' })
  }

  const getCredentials = async () => {
    const _sdrCredentials = await getRequestedCredentials({
      // Quick hack to remove issuers until fix is merged
      claims: sdr.data.claims.map((c: any) => {
        return {
          claimType: c.claimType,
          essential: c.essential,
          reason: c.reason,
          ...(c.issuers.length > 0 ? { issuers: c.issuers } : {}),
        }
      }),
    })

    if (_sdrCredentials) {
      setSdrCredentials(_sdrCredentials)
    }
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
        <Box display={'flex'} alignItems={'center'} flexDirection={'column'}>
          <Text>Request type: {request?.message?.type}</Text>
          <Text className={'break-word'}>
            <b>{sdr?.from}</b> has requested you share credentials
          </Text>
        </Box>
        <Box>
          {sdrCredentials?.map((sdr: any) => {
            return (
              <Box>
                <Box>
                  <Text>
                    <b>{sdr.claimType}</b>
                  </Text>
                </Box>
                <Box>
                  {sdr.credentials.map((vc: any) => {
                    return <Credential vc={vc} />
                  })}
                </Box>
              </Box>
            )
          })}
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

  useEffect(() => {
    if (sdr) {
      getCredentials()
    }
  }, [sdr])

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
