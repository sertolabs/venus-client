import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Box, Heading, Text, Button, Input, Flex } from 'rimble-ui'
import { AuthContext } from '../providers/AuthProvider'
import { AppContext } from '../providers/AppProvider'
import Credential from '../components/Credential'
// import StubCredential from '../stubs/credential.json'

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
    <Box display={'flex'} flex={1} flexDirection={'column'} paddingBottom={20}>
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
        {credentials?.map((vc: any) => {
          return <Credential vc={vc}></Credential>
        })}
      </Box>
    </Box>
  )
}

export default Credentials
