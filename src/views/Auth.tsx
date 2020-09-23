import React, { useContext, useState } from 'react'
import { Box, Heading, Text, Button } from 'rimble-ui'
import { AppContext } from '../providers/AppProvider'
import { AuthContext } from '../providers/AuthProvider'
import { useHistory } from 'react-router-dom'

const Auth: React.FC<{}> = () => {
  const { email, setEmail } = useContext(AuthContext)
  const { sendCode, verifyCode } = useContext(AppContext)
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
    >
      <Heading as="h1">Login</Heading>
      <Text>Enter your email</Text>

      <Button onClick={() => email && sendEmailCode(email)}>
        sendEmailCode
      </Button>
    </Box>
  )
}

export default Auth
