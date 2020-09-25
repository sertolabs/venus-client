import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Box, Heading, Text, Button, Input } from 'rimble-ui'
import { AuthContext } from '../providers/AuthProvider'

const Dashboard: React.FC<{}> = () => {
  const history = useHistory()
  const { clearSession } = useContext(AuthContext)
  const logOut = () => {
    clearSession()
    history.replace('/')
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
        <Text as={'p'}>Congrats, You have logged in</Text>
      </Box>
      <Box padding={15}>
        <Text as={'p'}>Congrats, You have logged in</Text>
      </Box>
      <Box padding={15}>
        <Text as={'p'}>Congrats, You have logged in</Text>
      </Box>
      <Box padding={15}>
        <Text as={'p'}>Congrats, You have logged in</Text>
      </Box>
      <Box padding={15}>
        <Text as={'p'}>Congrats, You have logged in</Text>
      </Box>
      <Box padding={15}>
        <Text as={'p'}>Congrats, You have logged in</Text>
      </Box>

      <Box marginTop={30}>
        <Button width={250} onClick={logOut}>
          LOG OUT
        </Button>
      </Box>
    </Box>
  )
}

export default Dashboard
