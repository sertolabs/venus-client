import React, { useContext, useEffect, useState } from 'react'
import { Box, Heading, Button, Input, Flex } from 'rimble-ui'
import { AppContext } from '../providers/AppProvider'
import Credential from '../components/Credential'

const Credentials: React.FC<{}> = () => {
  const { createCredential, getCredentials } = useContext(AppContext)
  const [name, setName] = useState<string>()
  const [credential, setCredential] = useState()
  const [credentials, setCredentials] = useState<any[]>()

  const issueCredential = async () => {
    const _credential = name && (await createCredential(name))
    setName('')
    setCredential(_credential)
  }

  const getMyCredentials = async () => {
    const _credentials = await getCredentials()
    setCredentials(_credentials)
  }

  useEffect(() => {
    getMyCredentials()
  }, [credential])

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
        <b>Credentials {credentials && `(${credentials.length})`}</b>
      </Heading>
      <Flex>
        <Input
          width={280}
          type="text"
          required={true}
          defaultValue={name}
          placeholder="Enter your name"
          onChange={(ev: any) => setName(ev.target.value)}
        />
        <Button
          disabled={!name}
          icon="Send"
          icononly
          marginLeft={10}
          onClick={issueCredential}
        />
      </Flex>
      <Box marginTop={30}></Box>
      <Box paddingBottom={10}>
        {credentials ? (
          credentials?.map((vc: any) => {
            return <Credential vc={vc}></Credential>
          })
        ) : (
          <Box>
            <Box className={'spinner'}>
              <Box className={'bounce1'}></Box>
              <Box className={'bounce2'}></Box>
              <Box className={'bounce3'}></Box>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default Credentials
