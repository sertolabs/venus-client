import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Box, Heading, Text, Button, Flex } from 'rimble-ui'
import { AuthContext } from '../providers/AuthProvider'
import { AppContext } from '../providers/AppProvider'
import Loader from '../components/Loader'

const Dashboard: React.FC<{}> = () => {
  const history = useHistory()
  const { trustAgentConfig, ssiConfig } = useContext(AuthContext)

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
        <b>Settings</b>
      </Heading>

      <Box paddingBottom={10}>
        <Text>Trust Agent</Text>
        <Text>{trustAgentConfig.root}</Text>
        <Text>{trustAgentConfig.enabled}</Text>

        <Text>SSI Config</Text>
        <Text>{ssiConfig.root || 'NONE PROVIDED'}</Text>
        <Text>{ssiConfig.enabled}</Text>
      </Box>
      <Box>
        <Button icon="Launch">Deploy to Heroku</Button>
      </Box>
    </Box>
  )
}

export default Dashboard
