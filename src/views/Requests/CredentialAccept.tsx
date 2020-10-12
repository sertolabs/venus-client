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
      paddingBottom={20}
      paddingLeft={20}
      paddingRight={20}
      justifyContent={'space-between'}
    >
      <Heading as="h1">
        <b>Save Credential</b>
      </Heading>

      <Box flex={1}>
        <Text className={'break-word'}>
          <span style={{ color: 'darkcyan' }}>{request?.sender.origin} </span>
          has issued you a credential. Would you like to save it?
        </Text>

        {!saving && request?.message && (
          <Box marginTop={20}>
            <Credential vc={request?.message?.payload.verifiableCredential} />
          </Box>
        )}

        {saving && <Loader />}
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
