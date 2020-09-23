import React, { useContext, useState } from 'react'
import { Box, Heading, Text, Button, Input } from 'rimble-ui'
import { AppContext } from '../providers/AppProvider'
import { AuthContext } from '../providers/AuthProvider'
import { useHistory } from 'react-router-dom'

const Verify: React.FC<{}> = () => {
  const [code, setCode] = useState<string>('jason.healy+test1@consensys.net')
  const { verifyCode } = useContext(AppContext)
  const { token, email } = useContext(AuthContext)

  const verifyEmailCode = async () => {
    if (email && code.length === 6) {
      const user = await verifyCode(email, code)

      console.log(user)
    }
  }

  return (
    <Box
      display={'flex'}
      flex={1}
      flexDirection={'column'}
      alignItems={'center'}
    >
      <Heading as="h1">{token ? 'Logged in!' : 'Verify Code'}</Heading>
      <Text>
        {token ? 'Authenticated with access token:' : 'Enter code from email'}
      </Text>

      {token && (
        <Box width={400}>
          <Text>User data:</Text>
          <Text>
            <b>access_token:</b> {token.access_token}
          </Text>
        </Box>
      )}

      {!token && (
        <Box flexDirection={'column'} display={'flex'} alignItems={'center'}>
          <Input
            type="text"
            required={true}
            placeholder="OTP Code"
            onChange={(ev: any) => setCode(ev.target.value)}
          />
          <Box marginTop={10} alignItems={'center'}>
            <Button onClick={() => verifyEmailCode()}>verifyEmailCode</Button>
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default Verify
