import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Box, Heading, Text, Button, Flex } from 'rimble-ui'
import { AuthContext } from '../providers/AuthProvider'
import { AppContext } from '../providers/AppProvider'
import Loader from '../components/Loader'

const Dashboard: React.FC<{}> = () => {
  const history = useHistory()
  const { clearSession } = useContext(AuthContext)
  const {
    user,
    defaultIdentity: identity,
    messages,
    messagesLoading,
  } = useContext(AppContext)

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
      paddingBottom={20}
      paddingLeft={20}
      paddingRight={20}
    >
      <Heading as="h1">
        <b>Activity</b>
      </Heading>
      {messagesLoading && <Loader />}
      <Box paddingBottom={10}>
        {messages &&
          !messagesLoading &&
          messages?.map((message: any) => {
            return (
              <Box
                className={'animate__animated animate__fadeIn'}
                borderRadius={5}
                padding={10}
                backgroundColor={'whitesmoke'}
                paddingTop={20}
                marginBottom={10}
              >
                <Box>
                  <Box
                    marginBottom={10}
                    display={'flex'}
                    flexDirection={'row'}
                    alignItems={'center'}
                  >
                    <Text
                      width={50}
                      fontSize={12}
                      fontWeight={'bold'}
                      color={'darkgrey'}
                      marginRight={20}
                    >
                      MESSAGE TYPE
                    </Text>
                    <Text fontSize={16}>{message.type}</Text>
                  </Box>
                </Box>
              </Box>
            )
          })}
      </Box>
    </Box>
  )
}

export default Dashboard
