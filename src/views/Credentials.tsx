import React, { useContext, useEffect, useState } from 'react'
import { Box, Heading, Button, Input, Flex, Loader as Spinner } from 'rimble-ui'
import { AppContext } from '../providers/AppProvider'
import Credential from '../components/Credential'
import Loader from '../components/Loader'

const Credentials: React.FC<{}> = () => {
  const { createCredential, getCredentials } = useContext(AppContext)
  const [name, setName] = useState<string>()
  const [credential, setCredential] = useState()
  const [credentials, setCredentials] = useState<any[]>()
  const [credentialsLoading, setCredentialsLoading] = useState(false)
  const [createCredentialLoading, setCreateCredentialLoading] = useState(false)

  const issueCredential = async () => {
    setCreateCredentialLoading(true)
    const _credential = name && (await createCredential(name))
    setName('')
    setCreateCredentialLoading(false)
    setCredentials((c) => [_credential].concat(c))
  }

  const getMyCredentials = async () => {
    setCredentialsLoading(true)
    const _credentials = await getCredentials()
    setCredentials(_credentials)
    setCredentialsLoading(false)
  }

  useEffect(() => {
    getMyCredentials()
  }, [])

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
          disabled={createCredentialLoading}
          width={280}
          type="text"
          required={true}
          value={name}
          placeholder="Enter your name"
          onChange={(ev: any) => setName(ev.target.value)}
        />
        {createCredentialLoading ? (
          <Button disabled icononly marginLeft={10}>
            <Spinner color={'white'} />
          </Button>
        ) : (
          <Button
            disabled={!name}
            icon="Send"
            icononly
            marginLeft={10}
            onClick={issueCredential}
          />
        )}
      </Flex>
      <Box marginTop={30}></Box>
      <Box paddingBottom={10}>
        {credentialsLoading && <Loader />}
        {credentials && !credentialsLoading && (
          <Box className={'animate__animated animate__fadeIn'}>
            {credentials?.map((vc: any, i: number) => {
              return <Credential vc={vc} key={i}></Credential>
            })}
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default Credentials
