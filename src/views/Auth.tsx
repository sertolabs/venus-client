import React, { useContext, useEffect, useState } from 'react'
import { Box, Heading, Text, Button, Input } from 'rimble-ui'
import { AppContext } from '../providers/AppProvider'
import { AuthContext } from '../providers/AuthProvider'
import { useHistory } from 'react-router-dom'

const Auth: React.FC<{}> = () => {
  const { email, setEmail } = useContext(AuthContext)
  const { sendCode, loadingUser } = useContext(AppContext)
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
      {loadingUser ? (
        <Box>
          <Box className={'spinner'}>
            <Box className={'bounce1'}></Box>
            <Box className={'bounce2'}></Box>
            <Box className={'bounce3'}></Box>
          </Box>
        </Box>
      ) : (
        <Box
          display={'flex'}
          flex={1}
          flexDirection={'column'}
          alignItems={'center'}
          paddingBottom={20}
        >
          <Heading as="h1">
            <b>Welcome!</b>
          </Heading>
          <Box padding={15}>
            <Text as={'p'} textAlign={'center'}>
              Enter your email address to get a one time passcode or visit trust
              agency and login.
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
      )}
    </Box>
  )
}

export default Auth
