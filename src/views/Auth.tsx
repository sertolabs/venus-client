import React, { useContext, useEffect, useState } from 'react'
import { Box, Heading, Text, Button, Input } from 'rimble-ui'
import { AppContext } from '../providers/AppProvider'
import { AuthContext } from '../providers/AuthProvider'
import { useHistory } from 'react-router-dom'

const Auth: React.FC<{}> = () => {
  const { email, setEmail } = useContext(AuthContext)
  const { sendCode } = useContext(AppContext)
  const history = useHistory()

  const sendEmailCode = async (email: string) => {
    const code = await sendCode(email)

    if (code) {
      console.log('OTP Code', code)
      history.push(`/verify`)
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
        <b>Welcome!</b>
      </Heading>
      <Box padding={15}>
        <Text as={'p'}>
          Enter your email address to get a one time passcode
        </Text>
      </Box>

      <Input
        width={300}
        type="text"
        required={true}
        defaultValue={email}
        placeholder="Email Address"
        onChange={(ev: any) => setEmail(ev.target.value)}
      />

      <Box marginTop={30}>
        <Button width={250} onClick={() => email && sendEmailCode(email)}>
          LOGIN
        </Button>
      </Box>
    </Box>
  )
}

export default Auth
