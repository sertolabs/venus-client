import React from 'react'
import { Box } from 'rimble-ui'

const Header: React.FC<{}> = () => {
  return (
    <Box height={65} id={'header'} backgroundColor={'whitesmoke'}>
      <Box paddingTop={10} paddingLeft={15}>
        <Box
          width={45}
          height={45}
          borderRadius={25}
          backgroundColor={'lightgrey'}
        ></Box>
      </Box>
    </Box>
  )
}

export default Header
