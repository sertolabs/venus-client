import React, { useContext, useState } from 'react'
import { Box, Heading, Text, Button, Input } from 'rimble-ui'

const Dashboard: React.FC<{}> = () => {
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
      <Box padding={15}>
        <Text as={'p'}>Congrats, You have logged in</Text>
      </Box>
      <Box padding={15}>
        <Text as={'p'}>Congrats, You have logged in</Text>
      </Box>
      <Box padding={15}>
        <Text as={'p'}>Congrats, You have logged in</Text>
      </Box>
    </Box>
  )
}

export default Dashboard
