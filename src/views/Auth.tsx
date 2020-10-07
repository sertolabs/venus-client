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
              Visit trust agency and login to autenticate
            </Text>
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default Auth
