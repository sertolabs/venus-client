import React, { useContext, useState } from 'react'
import { Box, Heading, Text, Button, Flex, Input, Checkbox } from 'rimble-ui'
import { AuthContext } from '../providers/AuthProvider'

const Settings: React.FC<{}> = () => {
  const { trustAgentConfig, ssiConfig, setSSIConfig } = useContext(AuthContext)

  const [ssiURL, setSSIUrl] = useState(ssiConfig.root)
  const [ssiEnabled, setSSIEnabled] = useState(ssiConfig.enabled)
  const [ssiAgentUrl] = useState(ssiConfig.agent)

  const [trustAgentURL] = useState(trustAgentConfig.root)
  const [trustAgentEnabled] = useState(trustAgentConfig.enabled)

  const saveSettings = () => {
    setSSIConfig({ root: ssiURL, agent: ssiAgentUrl, enabled: ssiEnabled })
  }

  return (
    <Box
      display={'flex'}
      flex={1}
      flexDirection={'column'}
      justifyContent={'space-between'}
      paddingBottom={20}
      paddingLeft={20}
      paddingRight={20}
    >
      <Heading as="h1">
        <b>Settings</b>
      </Heading>
      <Box flex={1}>
        <Heading as="h4">
          <b>Trust Agency</b>
        </Heading>
        <Flex marginBottom={10}>
          <Input type={'text'} disabled width={280} value={trustAgentURL} />
        </Flex>
        <Checkbox label="Active" checked={trustAgentEnabled} disabled />
        <Heading as="h4">
          <b>SSI</b>
        </Heading>
        <Text></Text>
        <Flex marginBottom={10}>
          <Input
            type={'text'}
            value={ssiURL}
            width={280}
            onChange={(ev: any) => setSSIUrl(ev.target.value)}
          />
        </Flex>
        <Checkbox
          label="Active"
          checked={ssiEnabled}
          onClick={() => setSSIEnabled(!ssiEnabled)}
        />
      </Box>
      <Box>
        <Button icon="Save" onClick={saveSettings}>
          Save
        </Button>
      </Box>
    </Box>
  )
}

export default Settings
