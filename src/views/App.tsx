import React from 'react'
import { Box, Button, Heading, Text } from 'rimble-ui'

function App() {
  return (
    <Box
      display={'flex'}
      flex={1}
      flexDirection={'column'}
      alignItems={'center'}
    >
      <Heading as="H1">Welcome</Heading>
      <Text>SSI Wallet for Trust Agency</Text>
    </Box>
  )
}

export default App
