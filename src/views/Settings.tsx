import React, { useContext, useState, useEffect } from 'react'
import { Box, Heading, Text, Button, Flex, Input, Checkbox } from 'rimble-ui'
import { AuthContext } from '../providers/AuthProvider'
import request from '../utils/request'
import Loader from '../components/Loader'

const Settings: React.FC<{}> = () => {
  const { trustAgentConfig, ssiConfig, setSSIConfig } = useContext(AuthContext)

  const [ssiURL, setSSIUrl] = useState(ssiConfig.root)
  const [ssiEnabled, setSSIEnabled] = useState(ssiConfig.enabled)
  const [ssiAgentUrl] = useState(ssiConfig.agent)
  const [trustAgentURL] = useState(trustAgentConfig.root)
  const [trustAgentEnabled] = useState(trustAgentConfig.enabled)
  const [SSIUrlValid, setSSIUrlValid] = useState(ssiConfig.enabled)
  const [checkingURL, setCheckingURL] = useState()
  const [taVisible, setTaVisible] = useState(false)
  const [apiKey, setApiKey] = useState(ssiConfig.apiKey)

  const saveSettings = () => {
    if (!checkingURL && SSIUrlValid) {
      setSSIConfig({
        root: ssiURL,
        agent: ssiAgentUrl,
        enabled: ssiEnabled,
        apiKey,
      })
    }
  }

  const validateSSIUrl = async (url: string) => {
    setCheckingURL(true)
    try {
      const response = await request('https:' + url, {})
      if (response) {
        setSSIUrlValid(response.ok)
        setCheckingURL(false)
      }
    } catch (err) {
      setSSIUrlValid(false)
      setCheckingURL(false)
    }
  }

  useEffect(() => {
    if (ssiURL) {
      validateSSIUrl(ssiURL)
    }
  }, [ssiURL])

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
        <Heading as="h4" onClick={() => setTaVisible((v) => !v)}>
          <b>Trust Agency</b>
        </Heading>
        {taVisible && (
          <>
            <Flex marginBottom={10}>
              <Input type={'text'} disabled width={280} value={trustAgentURL} />
            </Flex>
            <Checkbox label="Active" checked={trustAgentEnabled} disabled />
          </>
        )}
        <Heading as="h4">
          <b>SSI</b>
        </Heading>
        <Flex marginBottom={10}>
          <Input
            className={SSIUrlValid ? 'validated valid' : 'validated invalid'}
            placeholder={'Enter agent URL'}
            type={'text'}
            value={ssiURL}
            width={280}
            onChange={(ev: any) => setSSIUrl(ev.target.value)}
          />
        </Flex>
        <Flex marginBottom={10}>
          <Input
            type={'password'}
            placeholder={'Enter agent API key'}
            value={apiKey}
            width={280}
            onChange={(ev: any) => setApiKey(ev.target.value)}
          />
        </Flex>

        <Flex
          flexDirection={'row'}
          justifyContent={'space-between'}
          width={280}
        >
          <Checkbox
            disabled={!SSIUrlValid || checkingURL}
            label="Active"
            checked={ssiEnabled}
            onClick={() => SSIUrlValid && setSSIEnabled(!ssiEnabled)}
          />
          {checkingURL && <Loader size={'small'} />}
        </Flex>
      </Box>

      <Box>
        <Button
          icon="Save"
          onClick={saveSettings}
          disabled={checkingURL || !SSIUrlValid}
        >
          Save
        </Button>
      </Box>
    </Box>
  )
}

export default Settings
