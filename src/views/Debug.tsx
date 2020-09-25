import React from 'react'
import { Box, Heading, Text, Button } from 'rimble-ui'
import storage from '../utils/storage'

const Debug: React.FC<{}> = () => {
  const saveItem = () => {
    storage.saveItem('session', { name: 'Jack', id: '030939' })
  }

  const getItem = async () => {
    const store = await storage.getItem('session')
    console.log('Store', store)
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
        <b>Debug</b>
      </Heading>
      <Box padding={15}>
        <Text as={'p'}>
          Enter your email address to get a one time passcode
        </Text>
      </Box>

      <Box marginTop={30}>
        <Button width={250} onClick={saveItem}>
          SAVE ITEM
        </Button>
      </Box>
      <Box marginTop={30}>
        <Button width={250} onClick={getItem}>
          GET ITEM
        </Button>
      </Box>
    </Box>
  )
}

export default Debug
