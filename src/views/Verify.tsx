import React, { useContext, useState } from 'react'
import { Box, Heading, Text, Button, Input } from 'rimble-ui'
import { AppContext } from '../providers/AppProvider'
import { AuthContext } from '../providers/AuthProvider'
import { useHistory } from 'react-router-dom'

const Verify: React.FC<{}> = () => {
  const [code, setCode] = useState<string>('')
  const { email } = useContext(AuthContext)
  const { verifyCode, getUser } = useContext(AppContext)
  const history = useHistory()

  const verifyEmailCode = async () => {
    if (email && code.length === 6) {
      const _session = await verifyCode(email, code)

      if (_session) {
        const user = await getUser(_session.id_token)

        if (user) {
          history.push('/dashboard')
        }
      }
    }
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
        <b>Almost there!</b>
      </Heading>
      <Box padding={15}>
        <Text as={'p'}>Check your email for a code and enter it here</Text>
      </Box>

      <Input
        width={300}
        type="text"
        required={true}
        placeholder="Enter Code"
        onChange={(ev: any) => setCode(ev.target.value)}
      />

      <Box marginTop={30}>
        <Button width={250} onClick={() => verifyEmailCode()}>
          VERIFY CODE
        </Button>
      </Box>
    </Box>
  )
}

export default Verify
