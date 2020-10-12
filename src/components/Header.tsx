import React from 'react'
import { Box, Button } from 'rimble-ui'

interface HeaderProps {
  logout?: () => void
}

const Header: React.FC<HeaderProps> = ({ logout }) => {
  return (
    <Box height={65} id={'header'} backgroundColor={'whitesmoke'}>
      <Box
        paddingTop={10}
        paddingLeft={15}
        paddingRight={15}
        flexDirection={'row'}
        display={'flex'}
        style={{ justifyContent: 'space-between' }}
      >
        <Box
          width={45}
          height={45}
          borderRadius={25}
          backgroundColor={'lightgrey'}
        ></Box>
        {logout && (
          <Button
            className={'animate__animated animate__fadeIn'}
            icononly
            icon={'NavigateNext'}
            onClick={logout}
            mainColor="#adadad"
          />
        )}
      </Box>
    </Box>
  )
}

export default Header
