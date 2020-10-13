import React, { useContext } from 'react'
import { Box, Heading, Text } from 'rimble-ui'
import { AppContext } from '../providers/AppProvider'

const Auth: React.FC<{}> = () => {
  const { loadingUser } = useContext(AppContext)

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
