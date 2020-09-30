import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Box, Heading, Text, Button, Input, Flex } from 'rimble-ui'
import { AuthContext } from '../providers/AuthProvider'
import { AppContext } from '../providers/AppProvider'

const Credentials: React.FC<{}> = () => {
  const { createCredential, getCredentials } = useContext(AppContext)
  const [name, setName] = useState()
  const [credential, setCredential] = useState()
  const [credentials, setCredentials] = useState<any[]>()

  const issueCredential = async () => {
    const _credential = await createCredential()
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
      alignItems={'center'}
      paddingBottom={20}
    >
      <Heading as="h1">
        <b>Credentials</b>
      </Heading>
      <Flex>
        <Input
          width={280}
          type="text"
          required={true}
          defaultValue={name}
          placeholder="Name"
          onChange={(ev: any) => setName(ev.target.value)}
        />
        <Button
          icon="Send"
          icononly
          marginLeft={'10px'}
          onClick={issueCredential}
        />
      </Flex>
      <Box marginTop={30}></Box>
      {credentials?.map((vc: any) => {
        return <Text>{vc.issuanceDate}</Text>
      })}
    </Box>
  )
}

export default Credentials
