import React from 'react'
import { Box } from 'rimble-ui'
import { Link } from 'react-router-dom'

const Navbar: React.FC<{}> = () => {
  return (
    <Box display={'flex'} flexDirection={'row'}>
      <Link to={'/dashboard'}>Dashboard</Link>
      <Link to={'/credentials'}>Credentials</Link>
    </Box>
  )
}

export default Navbar
