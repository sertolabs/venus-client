import React, { useContext, useEffect, useState } from 'react'
import { Box, Heading, Text, Button } from 'rimble-ui'
import { RequestContext } from '../../providers/RequestProvider'
import { AppContext } from '../../providers/AppProvider'
import Credential from '../../components/Credential'
// import useSelectedCredentials from '../../hooks/useSelectedCredentials'
import useRequest from '../../hooks/useRequest'
import Loader from '../../components/Loader'

const Request: React.FC<{}> = () => {
  const { request, respond } = useContext(RequestContext)
  const [sdrCredentials, setSdrCredentials] = useState<any[]>()
  const [selectedCredentials, setSelectedCredentials] = useState<any[]>([])
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [message, setMessage] = useState<any>()
  const {
    defaultIdentity: identity,
    handleMessage,
    getRequestedCredentials,
    createVerifiablePresentation,
  } = useContext(AppContext)

  //   const {
  //     selected,
  //     onSelect: onSelectItem,
  //     valid: formValid,
  //   } = useSelectedCredentials(sdr.data)

  const approve = async () => {
    if (selectedCredentials?.length > 0) {
      const verifiablePresentation = await createVerifiablePresentation({
        issuer: { did: identity.did },
        audience: [message.from],
        credentials: selectedCredentials,
      })

      respond({
        action: 'APPROVE',
        verifiablePresentation,
      })
    }
  }

  const reject = () => {
    respond({ action: 'REJECT' })
  }

  const selectedCredential = (vc: any, i: number) => {
    setSelectedIndex(i)
    setSelectedCredentials([vc])
  }

  const getCredentials = async () => {
    const _sdrCredentials = await getRequestedCredentials({
      claims: message.data.claims.map((c: any) => {
        return {
          claimType: c.claimType,
          essential: c.essential,
          reason: c.reason,
          ...(c.issuers?.length > 0 ? { issuers: c.issuers } : {}),
        }
      }),
    })

    if (_sdrCredentials) {
      setSdrCredentials(_sdrCredentials)
    }
  }

  const getMessage = async () => {
    const _message = await handleMessage(request?.message.payload.jwt)
    setMessage(_message)
  }

  useEffect(() => {
    if (request) {
      getMessage()
    }
  }, [])

  useEffect(() => {
    if (message) {
      getCredentials()
    }
  }, [message])

  return (
    <Box
      display={'flex'}
      flex={1}
      flexDirection={'column'}
      paddingBottom={20}
      paddingLeft={20}
      paddingRight={20}
    >
      <Heading as="h1">
        <b>Request</b>
      </Heading>

      {message && (
        <Box>
          <Box display={'flex'} alignItems={'center'} flexDirection={'column'}>
            <Text className={'break-word'}>
              <b>{message?.from}</b> has requested you share the following
              credentials.
            </Text>
          </Box>
          <Box>
            {sdrCredentials ? (
              sdrCredentials.map((sdr: any, i: number) => {
                return (
                  <Box>
                    <Box
                      borderBottom={'1px solid #cccccc'}
                      marginBottom={10}
                      marginTop={10}
                      backgroundColor={'ghostwhite'}
                      padding={2}
                    >
                      <Text fontSize={12}>
                        <b>{sdr.claimType.toUpperCase()}</b>
                      </Text>
                      <Text fontSize={14}>{sdr.reason}</Text>
                    </Box>
                    <Box>
                      {sdr.credentials.map((vc: any, i: number) => {
                        return (
                          <Credential
                            selected={selectedIndex === i}
                            vc={vc}
                            onClick={() => selectedCredential(vc, i)}
                          />
                        )
                      })}

                      {sdr.credentials.length === 0 && (
                        <Box>
                          <Text fontSize={14}>
                            You do not have a
                            <b>{sdr.claimType.toUpperCase()}</b>
                            credential
                          </Text>
                        </Box>
                      )}
                    </Box>
                  </Box>
                )
              })
            ) : (
              <Loader />
            )}
          </Box>
        </Box>
      )}

      {message && (
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
            disabled={!identity || selectedIndex === null}
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
