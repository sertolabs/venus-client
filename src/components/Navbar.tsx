import React from 'react'
import { Box } from 'rimble-ui'
import { Link } from 'react-router-dom'

const Navbar: React.FC<{}> = () => {
  return (
    <Box
      display={'flex'}
      flexDirection={'row'}
      paddingTop={15}
      paddingBottom={15}
      width={'100%'}
      borderBottom={1}
      borderColor={'lightgrey'}
    >
      <Box
        flex={1}
        justifyContent={'center'}
        display={'flex'}
        flexDirection={'row'}
      >
        <Link to={'/dashboard'}>Activity</Link>
      </Box>
      <Box
        flex={1}
        justifyContent={'center'}
        display={'flex'}
        flexDirection={'row'}
      >
        <Link to={'/credentials'}>Credentials</Link>
      </Box>
    </Box>
  )
}

export default Navbar
