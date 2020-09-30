import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Box, Heading, Text, Button } from 'rimble-ui'
import { AuthContext } from '../providers/AuthProvider'
import { AppContext } from '../providers/AppProvider'

const Dashboard: React.FC<{}> = () => {
  const history = useHistory()
  const { clearSession } = useContext(AuthContext)
  const { user, defaultIdentity: identity } = useContext(AppContext)

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
      <Box height={40}></Box>
      <Heading as="h1">
        <b>Looking good!</b>
      </Heading>

      <Box padding={15}>
        <Text textAlign={'center'} as={'p'}>
          You have logged in as {user.email}
        </Text>
        {identity && (
          <Text textAlign={'center'} as={'p'} className={'break-word'}>
            Your default identifier is {identity.did}
          </Text>
        )}
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
