import React, { useContext, useState } from 'react'
import { Box, Heading, Text, Button } from 'rimble-ui'
import { RequestContext } from '../../providers/RequestProvider'
import { AppContext } from '../../providers/AppProvider'
import Credential from '../../components/Credential'
import Loader from '../../components/Loader'

const Request: React.FC<{}> = () => {
  const { request, respond } = useContext(RequestContext)
  const { defaultIdentity: identity, handleMessage } = useContext(AppContext)
  const [saving, setSaving] = useState(false)

  const approve = async () => {
    setSaving(true)
    await handleMessage(
      request?.message?.payload.verifiableCredential.proof.jwt,
    )

    respond({
      action: 'CREDENTIAL_ACCEPTED',
    })

    setSaving(false)
  }

  const reject = () => {
    respond({ action: 'REJECT' })
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

      {!saving && request?.message && (
        <Box padding={15}>
          <Box display={'flex'} alignItems={'center'} flexDirection={'column'}>
            <Text>Request type: {request?.message?.type}</Text>
            <Text className={'break-word'}>
              <b>xyz</b> has issued you a credential. Would you like to save it?
            </Text>
          </Box>
          <Box>
            <Box>
              <Credential vc={request?.message?.payload.verifiableCredential} />
            </Box>
          </Box>
        </Box>
      )}

      {saving && <Loader />}

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
            disabled={!identity || saving}
          >
            SAVE
          </Button>
          <Button
            variant="warning"
            width={250}
            onClick={reject}
            disabled={!identity || saving}
          >
            DISCARD
          </Button>
        </Box>
      )}
    </Box>
  )
}

export default Request
