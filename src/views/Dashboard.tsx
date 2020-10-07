import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Box, Heading, Text, Button } from 'rimble-ui'
import { AuthContext } from '../providers/AuthProvider'
import { AppContext } from '../providers/AppProvider'

const Dashboard: React.FC<{}> = () => {
  const history = useHistory()
  const { clearSession } = useContext(AuthContext)
  const { user, defaultIdentity: identity, messages } = useContext(AppContext)

  const logOut = () => {
    clearSession()
    history.replace('/')
  }

  console.log(messages)

  return (
    <Box
      display={'flex'}
      flex={1}
      flexDirection={'column'}
      alignItems={'center'}
      paddingBottom={20}
    >
      <Heading as="h1">
        <b>Activity</b>
      </Heading>
      <Box padding={15}>
        <Text textAlign={'center'}>{user?.email}</Text>
        <Text textAlign={'center'} className={'break-word'}>
          <b>{identity?.did}</b>
        </Text>
      </Box>

      <Box padding={15}>
        {messages?.map((message) => {
          return <Text>{message.createdAt}</Text>
        })}
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
