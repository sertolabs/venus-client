import React from 'react'
import { Box, Button, Heading, Text } from 'rimble-ui'
import { ProviderConfigs } from '../types'
import shortId from '../utils/shortId'

interface HeaderProps {
  logout?: () => void
  ssiMode: boolean
  trustAgentConfig: ProviderConfigs
  ssiConfig: ProviderConfigs
  defaultIdentity: any
}

const Header: React.FC<HeaderProps> = ({
  logout,
  ssiMode,
  trustAgentConfig,
  ssiConfig,
  defaultIdentity,
}) => {
  return (
    <Box
      height={65}
      id={'header'}
      backgroundColor={ssiMode ? '#333333' : 'whitesmoke'}
    >
      <Box
        paddingTop={10}
        paddingLeft={15}
        paddingRight={15}
        flexDirection={'row'}
        display={'flex'}
      >
        <Box
          width={45}
          height={45}
          borderRadius={25}
          backgroundColor={'lightgrey'}
        ></Box>
        <Box
          marginLeft={15}
          flex={1}
          display={'flex'}
          flexDirection={'column'}
          alignItems={'flex-start'}
        >
          {defaultIdentity && (
            <Box>
              <Text color={ssiMode ? 'white' : '#333333'}>
                <b>{shortId(defaultIdentity.did)}</b>
              </Text>
              <Text color={ssiMode ? 'white' : 'darkgrey'} fontSize={14}>
                {ssiMode ? ssiConfig.root : trustAgentConfig.root}
              </Text>
            </Box>
          )}
        </Box>
        <Box width={45}>
          {!ssiMode && logout && (
            <Button.Text
              className={'animate__animated animate__fadeIn'}
              icononly
              icon={'NavigateNext'}
              onClick={logout}
              mainColor="#adadad"
            />
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default Header
