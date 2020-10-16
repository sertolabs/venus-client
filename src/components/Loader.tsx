import React from 'react'
import { Box } from 'rimble-ui'

interface LoaderProps {
  size?: string
}

export default ({ size }: LoaderProps) => {
  const s = size || ''
  return (
    <Box>
      <Box className={'spinner ' + s}>
        <Box className={'bounce1'}></Box>
        <Box className={'bounce2'}></Box>
        <Box className={'bounce3'}></Box>
      </Box>
    </Box>
  )
}
