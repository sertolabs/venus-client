import React from 'react'
import { Box } from 'rimble-ui'

const Page: React.FC<{}> = ({ children }) => {
  return (
    <Box
      id={'page-content'}
      backgroundColor={'#FFFFFF'}
      alignItems={'center'}
      flex={1}
      display={'flex'}
    >
      {children}
    </Box>
  )
}

export default Page
