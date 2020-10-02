import React from 'react'
import { Box, Text } from 'rimble-ui'

interface CredentialProps {
  vc: any
  onClick?: () => void
}

const Credential: React.FC<CredentialProps> = ({ vc, onClick }) => {
  return (
    <Box
      onClick={onClick}
      borderRadius={5}
      padding={10}
      backgroundColor={'whitesmoke'}
      paddingTop={20}
      marginBottom={10}
    >
      {Object.keys(vc?.credentialSubject).map(
        (claim: string, index: number) => {
          return (
            claim !== 'id' && (
              <Box key={index}>
                <Box
                  marginBottom={10}
                  display={'flex'}
                  flexDirection={'row'}
                  alignItems={'center'}
                >
                  <Text
                    width={50}
                    fontSize={12}
                    fontWeight={'bold'}
                    color={'darkgrey'}
                    marginRight={10}
                  >
                    {claim.toUpperCase()}
                  </Text>
                  <Text fontSize={16}>{vc?.credentialSubject[claim]}</Text>
                </Box>
              </Box>
            )
          )
        },
      )}
    </Box>
  )
}

export default Credential
